import { Router } from 'express';
import { analyzeCase, getSimilarCases, getAllCases } from '../controllers/caseController';

const router = Router();

// POST /api/case/analyze
router.post('/analyze', analyzeCase);

// GET /api/case/similar?tag=
router.get('/similar', getSimilarCases);

// GET /api/case/all
router.get('/all', getAllCases);

export default router;
