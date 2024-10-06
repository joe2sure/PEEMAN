import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../../controllers/users/userController.js';
import { isAuthorizeMiddleware } from '../../middlewares/authMiddleware.js'; 
import { isAdmin } from '../../middlewares/adminMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */
router.get('/', isAuthorizeMiddleware, isAdmin, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', isAuthorizeMiddleware, isAdmin, getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', isAuthorizeMiddleware, isAdmin, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteUser);

export default router;


// testing admin routes

// router.get('/', isAuthorizeMiddleware, getAllUsers);   // Get all users (Admin only)
// router.get('/:id', isAuthorizeMiddleware, getUser);    // Get a single user by ID (Admin only)
// router.put('/:id', isAuthorizeMiddleware, updateUser); // Update a user (Admin only)
// router.delete('/:id', isAuthorizeMiddleware, deleteUser); // Delete a user (Admin only)
