import { Router } from 'express';
import { logActivity, getActivity, deleteActivity } from '../controllers/activityController';

const router = Router();

// POST /api/activity
router.post('/', logActivity);

// GET /api/activity?userId=&type=&limit=&page=
router.get('/', getActivity);

// DELETE /api/activity/:id
router.delete('/:id', deleteActivity);

export default router;
