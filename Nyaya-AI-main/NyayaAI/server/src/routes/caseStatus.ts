import { Router } from 'express';
import {
  getCaseStatus,
  getCourts,
  getLocations,
} from '../controllers/caseStatusController';

const router = Router();

// POST /api/case-status - Get case status
router.post('/', getCaseStatus);

// GET /api/case-status/courts - Get courts for a district
router.get('/courts', getCourts);

// GET /api/case-status/locations - Get states and districts
router.get('/locations', getLocations);

export default router;
