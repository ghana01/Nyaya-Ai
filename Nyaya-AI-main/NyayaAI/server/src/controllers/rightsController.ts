import { Request, Response } from 'express';
import { Right } from '../models/Right';

// Get all rights (with optional category filter)
export const getAllRights = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;

    let query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const rights = await Right.find(query)
      .select('title category description lawReference icon keyPoints')
      .sort({ category: 1, title: 1 });

    // Group by category
    const grouped = rights.reduce((acc: any, right) => {
      const cat = right.category;
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(right);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        rights,
        grouped,
        count: rights.length,
      },
    });
  } catch (error) {
    console.error('Get rights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve rights',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get single right by ID
export const getRightById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const right = await Right.findById(id);

    if (!right) {
      res.status(404).json({
        success: false,
        message: 'Right not found',
      });
      return;
    }

    // Get related rights from same category
    const relatedRights = await Right.find({
      category: right.category,
      _id: { $ne: id },
    })
      .select('title category icon')
      .limit(4);

    res.status(200).json({
      success: true,
      data: {
        right,
        relatedRights,
      },
    });
  } catch (error) {
    console.error('Get right by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve right',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get rights by category
export const getRightsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;

    const rights = await Right.find({ category })
      .select('title category description lawReference icon keyPoints')
      .sort({ title: 1 });

    res.status(200).json({
      success: true,
      data: {
        category,
        rights,
        count: rights.length,
      },
    });
  } catch (error) {
    console.error('Get rights by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve rights by category',
    });
  }
};

// Get categories with counts
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Right.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const categoryInfo: Record<string, { name: string; icon: string; color: string }> = {
      women: { name: 'Women Rights', icon: '👩', color: 'pink' },
      cybercrime: { name: 'Cybercrime', icon: '💻', color: 'indigo' },
      arrest: { name: 'Arrest Rights', icon: '⚖️', color: 'red' },
      consumer: { name: 'Consumer Rights', icon: '🛒', color: 'green' },
      tenant: { name: 'Tenant Rights', icon: '🏠', color: 'amber' },
    };

    const result = categories.map((cat) => ({
      id: cat._id,
      ...categoryInfo[cat._id],
      count: cat.count,
    }));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
    });
  }
};
