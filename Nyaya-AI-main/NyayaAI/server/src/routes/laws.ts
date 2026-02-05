import { Router } from 'express';
import {
  getAllLaws,
  searchLaws,
  getLawById,
  explainLaw,
} from '../controllers/lawsController';

const router = Router();

// GET /api/laws - Get all laws (grouped by act)
router.get('/', getAllLaws);

// GET /api/laws/search - Search laws
router.get('/search', searchLaws);

// POST /api/laws/explain - Get AI explanation for a law
router.post('/explain', explainLaw);

// GET /api/laws/:id - Get single law by ID
router.get('/:id', getLawById);

export default router;
