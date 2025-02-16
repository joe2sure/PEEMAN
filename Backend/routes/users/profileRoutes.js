import express from 'express';
import { uploadProfilePicture, updateUsername, deleteFavoriteProperties, getProfile } from '../../controllers/users/profileController.js';
import { isAuthorizeMiddleware } from '../../middlewares/authMiddleware.js';
import {mediaUploadMiddleware} from '../../middlewares/uploadMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.get('/', isAuthorizeMiddleware, getProfile);

/**
 * @swagger
 * /profile/update-username:
 *   put:
 *     summary: Update user username
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated username
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.put('/update-username', isAuthorizeMiddleware, updateUsername);

/**
 * @swagger
 * /profile/upload-avatar:
 *   put:
 *     summary: Upload user avatar (profile picture)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded avatar
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.put('/upload-avatar', isAuthorizeMiddleware, mediaUploadMiddleware.single('avatar'), uploadProfilePicture);

/**
 * @swagger
 * /profile/favorite-properties:
 *   delete:
 *     summary: Delete user's favorite properties
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted favorite properties
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.delete('/favorite-properties', isAuthorizeMiddleware, deleteFavoriteProperties);

export default router;