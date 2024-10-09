// notificationRoutes.js
import express from 'express';
import { sendNotification, trackNotification, getAllNotifications, deleteNotification } from '../controllers/notificationController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';


const router = express.Router();

// Send a new notification with image upload
router.post('/send', uploadMiddleware.array('image', 1), sendNotification);

// Other routes remain the same
router.get('/track/:id', trackNotification);
router.get('/', getAllNotifications);
router.delete('/:id', deleteNotification);

export default router;