import express from "express";
import { registerUser, loginUser, googleLogin, requestPasswordReset, resetPassword } from '../../controllers/users/authController.js';


const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request or user already exists
 */
router.post('/register', registerUser); 

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/google-login:
 *   post:
 *     summary: Log in a user using Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *                 description: Google token from frontend
 *     responses:
 *       200:
 *         description: User logged in with Google successfully
 *       400:
 *         description: Google login failed
 */
router.post('/google-login', googleLogin); 

// Step 1: Request password reset
router.post('/forgot-password', requestPasswordReset);

// Step 2: Reset password
router.put('/reset-password/:token', resetPassword);

export default router;
