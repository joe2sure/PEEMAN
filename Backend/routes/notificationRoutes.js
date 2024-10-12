// notificationRoutes.js
import express from 'express';
import { sendNotification, trackNotification, getAllNotifications, deleteNotification } from '../controllers/notificationController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Send a new notification with image upload
router.post('/send', isAuthorizeMiddleware, isAdmin ,uploadMiddleware.array('image', 1), sendNotification);

// Other routes remain the same
router.get('/track/:id', isAuthorizeMiddleware, isAdmin ,trackNotification);
router.get('/', isAuthorizeMiddleware, isAdmin ,getAllNotifications);
router.delete('/:id', isAuthorizeMiddleware, isAdmin ,deleteNotification);

export default router;