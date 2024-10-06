import express from 'express';
import { uploadProfilePicture, updateUsername, deleteFavoriteProperties, getProfile } from '../../controllers/users/profileController.js';
import { isAuthorizeMiddleware } from '../../middlewares/authMiddleware.js'; // Middleware to protect routes
import uploadMiddleware from '../../middlewares/uploadMiddleware.js';    // Middleware for image uploads

const router = express.Router();

// Profile routes
router.get('/', isAuthorizeMiddleware, getProfile); // Get user profile
router.put('/update-username', isAuthorizeMiddleware, updateUsername); // Update username
router.put('/upload-avatar', isAuthorizeMiddleware, uploadMiddleware.single('avatar'), uploadProfilePicture); // Upload profile picture
router.delete('/favorite-properties', isAuthorizeMiddleware, deleteFavoriteProperties); // Delete favorite properties

export default router;
