import express from 'express';
import { likeProperty, unlikeProperty, addReview, requestVideoCall, getPropertyDetails, getAllProperties, getPropertyById } from '../controllers/propertyUserInteractionController.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /{id}/like:
 *   post:
 *     summary: Like a property
 *     description: Allows an authenticated user to like a specific property.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property liked successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/:id/like', isAuthorizeMiddleware, likeProperty);

/**
 * @swagger
 * /{id}/unlike:
 *   post:
 *     summary: Unlike a property
 *     description: Allows an authenticated user to unlike a specific property.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property unliked successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/:id/unlike', isAuthorizeMiddleware, unlikeProperty);

/**
 * @swagger
 * /{id}/review:
 *   post:
 *     summary: Add a review for a property
 *     description: Allows an authenticated user to add a review for a specific property.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Review content
 *         schema:
 *           type: object
 *           properties:
 *             review:
 *               type: string
 *     responses:
 *       201:
 *         description: Review added successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/:id/review', isAuthorizeMiddleware, addReview);

/**
 * @swagger
 * /{id}/video-call-request:
 *   post:
 *     summary: Request a video call for a property
 *     description: Allows an authenticated user to request a video call for a specific property.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video call request submitted successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/:id/video-call-request', isAuthorizeMiddleware, requestVideoCall);

/**
 * @swagger
 * /{id}/details:
 *   get:
 *     summary: Get property details
 *     description: Fetches details of a specific property.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property details retrieved successfully.
 *       404:
 *         description: Property not found.
 */
router.get('/:id/details', getPropertyDetails);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all properties
 *     description: Fetches a list of all properties.
 *     responses:
 *       200:
 *         description: Properties retrieved successfully.
 */
router.get('/', getAllProperties);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get property by ID
 *     description: Fetches a specific property by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property retrieved successfully.
 *       404:
 *         description: Property not found.
 */
router.get('/:id', getPropertyById);

export default router;





// import express from 'express';
// import { likeProperty, unlikeProperty, addReview, requestVideoCall, getPropertyDetails, getAllProperties, getPropertyById } from '../controllers/propertyUserInteractionController.js';
// import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';



// const router = express.Router();

// router.post('/:id/like', isAuthorizeMiddleware, likeProperty);
// router.post('/:id/unlike', isAuthorizeMiddleware, unlikeProperty);
// router.post('/:id/review', isAuthorizeMiddleware, addReview);
// router.post('/:id/video-call-request', isAuthorizeMiddleware, requestVideoCall);
// router.get('/:id/details', getPropertyDetails);
// router.get('/', getAllProperties);
// router.get('/:id', getPropertyById);

// export default router;