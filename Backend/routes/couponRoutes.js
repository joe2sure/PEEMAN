import express from 'express';
import { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, checkCoupon, getCoupon } from '../controllers/couponController.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';


const router = express.Router();

// Protect the routes if needed
router.post('/', isAuthorizeMiddleware, isAdmin, createCoupon); // Admin can create a coupon
router.get('/', isAuthorizeMiddleware, getAllCoupons); // Any authenticated user can get all coupons
router.get('/:id', isAuthorizeMiddleware, isAdmin, getCoupon); 
router.put('/:id', isAuthorizeMiddleware, isAdmin, updateCoupon); // Admin can update a coupon
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteCoupon); // Admin can delete a coupon
router.post('/check-coupon', isAuthorizeMiddleware, isAdmin, checkCoupon)

export default router;