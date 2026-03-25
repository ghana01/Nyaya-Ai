import { Request, Response } from 'express';
import { UserActivity } from '../models/UserActivity';
import { v4 as uuidv4 } from 'uuid';

// POST /api/activity
export const logActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, type, query, response, metadata } = req.body;

    if (!type || !query || !response) {
      res.status(400).json({
        success: false,
        error: 'type, query, and response are required fields',
      });
      return;
    }

    if (!['chat', 'case_search', 'law_read'].includes(type)) {
      res.status(400).json({
        success: false,
        error: 'type must be one of: chat, case_search, law_read',
      });
      return;
    }

    const activity = await UserActivity.create({
      userId: userId || 'anonymous-' + uuidv4().slice(0, 8),
      type,
      query,
      response,
      metadata: metadata || {},
    });

    res.status(201).json({
      success: true,
      data: { id: activity._id, type: activity.type, createdAt: activity.createdAt },
    });
  } catch (error) {
    console.error('Log activity error:', error);
    res.status(500).json({ success: false, error: 'Failed to log activity' });
  }
};

// GET /api/activity?userId=&type=&limit=&page=
export const getActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, type, limit = '20', page = '1' } = req.query;

    if (!userId) {
      res.status(400).json({ success: false, error: 'userId query parameter is required' });
      return;
    }

    const query: Record<string, unknown> = { userId };
    if (type && ['chat', 'case_search', 'law_read'].includes(type as string)) {
      query.type = type;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [activities, total] = await Promise.all([
      UserActivity.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Math.min(Number(limit), 50))
        .select('type query response metadata createdAt'),
      UserActivity.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: {
        activities,
        total,
        page: Number(page),
        limit: Number(limit),
        hasMore: skip + activities.length < total,
      },
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve activity history' });
  }
};

// DELETE /api/activity/:id
export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await UserActivity.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: { message: 'Activity deleted' } });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete activity' });
  }
};
