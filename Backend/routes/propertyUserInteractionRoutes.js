import express from 'express';
import { likeProperty, unlikeProperty, addReview, requestVideoCall, getPropertyDetails } from '../controllers/propertyUserInteractionController.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';



const router = express.Router();

router.post('/:id/like', isAuthorizeMiddleware, likeProperty);
router.post('/:id/unlike', isAuthorizeMiddleware, unlikeProperty);
router.post('/:id/review', isAuthorizeMiddleware, addReview);
router.post('/:id/video-call-request', isAuthorizeMiddleware, requestVideoCall);
router.get('/:id/details', getPropertyDetails);

export default router;