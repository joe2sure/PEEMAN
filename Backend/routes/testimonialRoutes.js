import express from 'express';
import {
  getApprovedTestimonials,
  submitTestimonial,
  getMyTestimonial,
  getAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { authMiddleware, isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────────────────────
router.get('/approved', getApprovedTestimonials);

// ─── Authenticated users ──────────────────────────────────────────────────────
router.post('/', authMiddleware, submitTestimonial);
router.get('/my', authMiddleware, getMyTestimonial);

// ─── Admin ────────────────────────────────────────────────────────────────────
router.get('/', isAuthorizeMiddleware, isAdmin, getAllTestimonials);
router.put('/:id/approve', isAuthorizeMiddleware, isAdmin, approveTestimonial);
router.put('/:id/reject', isAuthorizeMiddleware, isAdmin, rejectTestimonial);
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteTestimonial);

export default router;