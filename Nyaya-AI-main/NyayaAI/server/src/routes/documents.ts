import { Router } from 'express';
import {
  generateDocument,
  getUserDocuments,
  getDocumentById,
  getDocumentTypes,
} from '../controllers/documentsController';
import { protect, optionalAuth } from '../middleware/auth';

const router = Router();

// Public route - get document types info
router.get('/types', getDocumentTypes);

// Generate document (optional auth - saves to user if logged in)
router.post('/generate', optionalAuth, generateDocument);

// Protected routes - require authentication
router.get('/my-documents', protect, getUserDocuments);
router.get('/:id', optionalAuth, getDocumentById);

export default router;
