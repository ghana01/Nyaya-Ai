import { Request, Response } from 'express';
import { ChatMessage } from '../models/ChatMessage';
import { UserActivity } from '../models/UserActivity';
import { askNyayaAI } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

// Chat with NyayaAI
export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, sessionId, userId } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string',
      });
      return;
    }

    if (message.trim().length > 2000) {
      res.status(400).json({
        success: false,
        error: 'Message cannot exceed 2000 characters',
      });
      return;
    }

    const chatSessionId = sessionId || uuidv4();
    const chatUserId = userId || 'anonymous-' + uuidv4().slice(0, 8);

    // Save user message
    const userMessage = await ChatMessage.create({
      userId: chatUserId,
      sessionId: chatSessionId,
      message: message.trim(),
      role: 'user',
      timestamp: new Date(),
    });

    // Get structured response from Gemini
    const geminiResponse = await askNyayaAI(message.trim());

    // Save AI response
    const aiMessage = await ChatMessage.create({
      userId: chatUserId,
      sessionId: chatSessionId,
      message: geminiResponse.answer,
      role: 'ai',
      timestamp: new Date(),
      metadata: {
        topic: geminiResponse.lawReferences[0] || 'General',
      },
    });

    // Log to activity history (fire-and-forget)
    UserActivity.create({
      userId: chatUserId,
      type: 'chat',
      query: message.trim(),
      response: geminiResponse.answer,
      metadata: { sessionId: chatSessionId, lawReferences: geminiResponse.lawReferences },
    }).catch((err) => console.error('Activity log error:', err));

    res.status(200).json({
      success: true,
      data: {
        sessionId: chatSessionId,
        userId: chatUserId,
        userMessage: {
          id: userMessage._id,
          message: userMessage.message,
          role: userMessage.role,
          timestamp: userMessage.timestamp,
        },
        aiResponse: {
          id: aiMessage._id,
          message: aiMessage.message,
          role: aiMessage.role,
          timestamp: aiMessage.timestamp,
          lawReferences: geminiResponse.lawReferences,
          steps: geminiResponse.steps,
          suggestedDocument: geminiResponse.suggestedDocument || null,
        },
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat message. Please try again.',
    });
  }
};

// Get chat history
export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { limit = 50, before } = req.query;

    if (!sessionId) {
      res.status(400).json({ success: false, error: 'Session ID is required' });
      return;
    }

    const query: Record<string, unknown> = { sessionId };
    if (before) {
      query.timestamp = { $lt: new Date(before as string) };
    }

    const messages = await ChatMessage.find(query)
      .sort({ timestamp: 1 })
      .limit(Number(limit))
      .select('message role timestamp metadata');

    res.status(200).json({
      success: true,
      data: { sessionId, messages, count: messages.length },
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve chat history' });
  }
};

// Get user's chat sessions
export const getUserSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const sessions = await ChatMessage.aggregate([
      { $match: { userId } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$sessionId',
          lastMessage: { $first: '$message' },
          lastTimestamp: { $first: '$timestamp' },
          messageCount: { $sum: 1 },
        },
      },
      { $sort: { lastTimestamp: -1 } },
      { $limit: 20 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        userId,
        sessions: sessions.map((s) => ({
          sessionId: s._id,
          preview: s.lastMessage.substring(0, 100) + (s.lastMessage.length > 100 ? '...' : ''),
          lastActivity: s.lastTimestamp,
          messageCount: s.messageCount,
        })),
      },
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve user sessions' });
  }
};

// Delete chat session
export const deleteSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const result = await ChatMessage.deleteMany({ sessionId });
    res.status(200).json({
      success: true,
      data: { deletedCount: result.deletedCount },
    });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete session' });
  }
};
