// notificationRoutes.js
import express from 'express';
import { sendNotification, trackNotification, getAllNotifications, deleteNotification } from '../controllers/notificationController.js';
import {mediaUploadMiddleware} from '../middlewares/uploadMiddleware.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /notifications/send:
 *   post:
 *     summary: Send a new notification with image upload
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the notification
 *               message:
 *                 type: string
 *                 description: Message body of the notification
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image to upload (optional)
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, admin access only
 */
router.post('/send', isAuthorizeMiddleware, isAdmin, mediaUploadMiddleware.array('image', 1), sendNotification);

/**
 * @swagger
 * /notifications/track/{id}:
 *   get:
 *     summary: Track a notification by its ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID to track
 *     responses:
 *       200:
 *         description: Notification found and tracked
 *       404:
 *         description: Notification not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, admin access only
 */
router.get('/track/:id', isAuthorizeMiddleware, isAdmin, trackNotification);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, admin access only
 */
router.get('/', isAuthorizeMiddleware, isAdmin, getAllNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification by its ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, admin access only
 */
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteNotification);

export default router;




// // notificationRoutes.js
// import express from 'express';
// import { sendNotification, trackNotification, getAllNotifications, deleteNotification } from '../controllers/notificationController.js';
// import uploadMiddleware from '../middlewares/uploadMiddleware.js';
// import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
// import { isAdmin } from '../middlewares/adminMiddleware.js';

// const router = express.Router();

// // Send a new notification with image upload
// router.post('/send', isAuthorizeMiddleware, isAdmin ,uploadMiddleware.array('image', 1), sendNotification);

// // Other routes remain the same
// router.get('/track/:id', isAuthorizeMiddleware, isAdmin ,trackNotification);
// router.get('/', isAuthorizeMiddleware, isAdmin ,getAllNotifications);
// router.delete('/:id', isAuthorizeMiddleware, isAdmin ,deleteNotification);

// export default router;