import { Router } from 'express';
import {
  chatWithAI,
  getChatHistory,
  getUserSessions,
  deleteSession,
} from '../controllers/chatController';

const router = Router();

// POST /api/ai/chat - Send a message and get AI response
router.post('/chat', chatWithAI);

// GET /api/ai/history/:sessionId - Get chat history for a session
router.get('/history/:sessionId', getChatHistory);

// GET /api/ai/sessions/:userId - Get all chat sessions for a user
router.get('/sessions/:userId', getUserSessions);

// DELETE /api/ai/session/:sessionId - Delete a chat session
router.delete('/session/:sessionId', deleteSession);

export default router;
