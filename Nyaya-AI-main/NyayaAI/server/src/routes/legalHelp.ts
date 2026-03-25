import { Router } from 'express';
import { getLegalHelp, getLegalHelpTypes } from '../controllers/legalHelpController';

const router = Router();

// GET /api/legal-help/types
router.get('/types', getLegalHelpTypes);

// POST /api/legal-help
router.post('/', getLegalHelp);

export default router;
