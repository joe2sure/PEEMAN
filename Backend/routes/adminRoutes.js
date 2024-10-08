import express from 'express';


import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import { createProperty, deleteProperty, makeAdmin, updateProperty } from '../controllers/adminController.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();


// Promote user to admin
router.put('/make-admin/:id',isAuthorizeMiddleware, makeAdmin);

// Property management routes
router.post('/properties', isAuthorizeMiddleware, isAdmin, uploadMiddleware.array('media', 6), createProperty);
router.put('/properties/:id', isAuthorizeMiddleware, isAdmin, updateProperty);
router.delete('/properties/:id', isAuthorizeMiddleware, isAdmin, deleteProperty);


export default router;


// import { makeAdmin, createProperty, updateProperty, deleteProperty, createBlogPost, deleteBlogPost, sendNotification } from '../controllers/adminController';
// // Blog management routes
// router.post('/blog', auth, adminAuth, createBlogPost);
// router.delete('/blog/:id', auth, adminAuth, deleteBlogPost);

// // Notifications
// router.post('/notifications', auth, adminAuth, sendNotification);