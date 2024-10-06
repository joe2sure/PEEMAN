import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../../controllers/users/userController.js';
import { isAuthorizeMiddleware } from '../../middlewares/authMiddleware.js'; // Assume you have middleware for authentication and admin check
import { isAdmin } from '../../middlewares/adminMiddleware.js';

const router = express.Router();

// Admin-only routes
// router.get('/', isAuthorizeMiddleware, isAdmin, getAllUsers);   // Get all users (Admin only)
// router.get('/:id', isAuthorizeMiddleware, isAdmin, getUser);    // Get a single user by ID (Admin only)
// router.put('/:id', isAuthorizeMiddleware, isAdmin, updateUser); // Update a user (Admin only)
// router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteUser); // Delete a user (Admin only)


// testing admin routes

router.get('/', isAuthorizeMiddleware, getAllUsers);   // Get all users (Admin only)
router.get('/:id', isAuthorizeMiddleware, getUser);    // Get a single user by ID (Admin only)
router.put('/:id', isAuthorizeMiddleware, updateUser); // Update a user (Admin only)
router.delete('/:id', isAuthorizeMiddleware, deleteUser); // Delete a user (Admin only)


export default router;
