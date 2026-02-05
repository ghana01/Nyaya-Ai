import { Router } from 'express';
import {
  getAllRights,
  getRightById,
  getRightsByCategory,
  getCategories,
} from '../controllers/rightsController';

const router = Router();

// GET /api/rights - Get all rights (with optional category filter)
router.get('/', getAllRights);

// GET /api/rights/categories - Get all categories with counts
router.get('/categories', getCategories);

// GET /api/rights/category/:category - Get rights by category
router.get('/category/:category', getRightsByCategory);

// GET /api/rights/:id - Get single right by ID
router.get('/:id', getRightById);

export default router;
