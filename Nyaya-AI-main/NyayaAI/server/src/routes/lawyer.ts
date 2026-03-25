import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  researchCase,
  generateDraft,
  getDraftTypes,
  saveCase,
  getSavedCases,
  updateSavedCase,
  deleteSavedCase,
  advancedSearch,
} from '../controllers/lawyerController';

const router = Router();

// All lawyer routes require authentication + lawyer role
router.use(protect, authorize('lawyer', 'admin'));

// Case Research
router.post('/research', researchCase);

// Draft Generator
router.get('/draft-types', getDraftTypes);
router.post('/draft', generateDraft);

// Saved Cases
router.post('/save-case', saveCase);
router.get('/saved-cases', getSavedCases);
router.put('/saved-cases/:id', updateSavedCase);
router.delete('/saved-cases/:id', deleteSavedCase);

// Advanced Search
router.get('/search', advancedSearch);

export default router;
