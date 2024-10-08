import express from 'express';
import { getAllPosters, getPosterById, createPoster, updatePoster, deletePoster } from '../controllers/posterController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import { isAuthorizeMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
// import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Get all posters
router.get('/', isAuthorizeMiddleware, isAdmin, getAllPosters);

// Get poster by ID
router.get('/:id', isAuthorizeMiddleware, isAdmin, getPosterById);

// Create a new poster (with image upload)
router.post('/', isAuthorizeMiddleware, isAdmin, uploadMiddleware.single('img'), createPoster);

// Update a poster (with image upload)
router.put('/:id', isAuthorizeMiddleware, isAdmin, uploadMiddleware.single('img'), updatePoster);

// Delete a poster
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deletePoster);

export default router;
