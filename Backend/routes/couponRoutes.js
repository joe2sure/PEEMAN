import express from 'express';
import { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, checkCoupon, getCoupon } from '../controllers/couponController.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     description: Only admins can create a coupon.
 *     tags:
 *       - Coupons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Coupon created successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', isAuthorizeMiddleware, isAdmin, createCoupon); 

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     description: Any authenticated user can retrieve all available coupons.
 *     tags:
 *       - Coupons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all coupons.
 *       401:
 *         description: Unauthorized.
 */
router.get('/', isAuthorizeMiddleware, getAllCoupons); 

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     description: Only admins can retrieve a specific coupon by its ID.
 *     tags:
 *       - Coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon retrieved successfully.
 *       404:
 *         description: Coupon not found.
 */
router.get('/:id', isAuthorizeMiddleware, isAdmin, getCoupon); 

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupon
 *     description: Only admins can update a coupon.
 *     tags:
 *       - Coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to update.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Coupon not found.
 */
router.put('/:id', isAuthorizeMiddleware, isAdmin, updateCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     description: Only admins can delete a coupon.
 *     tags:
 *       - Coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon deleted successfully.
 *       404:
 *         description: Coupon not found.
 */
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteCoupon);

/**
 * @swagger
 * /coupons/check-coupon:
 *   post:
 *     summary: Validate a coupon
 *     description: Only admins can validate if a coupon is valid.
 *     tags:
 *       - Coupons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupon is valid.
 *       400:
 *         description: Invalid coupon.
 */
router.post('/check-coupon', isAuthorizeMiddleware, isAdmin, checkCoupon);

export default router;



// import express from 'express';
// import { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, checkCoupon, getCoupon } from '../controllers/couponController.js';
// import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
// import { isAdmin } from '../middlewares/adminMiddleware.js';


// const router = express.Router();

// // Protect the routes if needed
// router.post('/', isAuthorizeMiddleware, isAdmin, createCoupon); // Admin can create a coupon
// router.get('/', isAuthorizeMiddleware, getAllCoupons); // Any authenticated user can get all coupons
// router.get('/:id', isAuthorizeMiddleware, isAdmin, getCoupon); 
// router.put('/:id', isAuthorizeMiddleware, isAdmin, updateCoupon); // Admin can update a coupon
// router.delete('/:id', isAuthorizeMiddleware, isAdmin, deleteCoupon); // Admin can delete a coupon
// router.post('/check-coupon', isAuthorizeMiddleware, isAdmin, checkCoupon)

// export default router;