import express from 'express';
import { getAllPosters, getPosterById, createPoster, updatePoster, deletePoster } from '../controllers/posterController.js';
import {mediaUploadMiddleware} from '../middlewares/uploadMiddleware.js';
import { isAuthorizeMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /posters:
 *   get:
 *     summary: Get all posters
 *     description: Retrieve a list of all posters. Requires admin privileges.
 *     tags: 
 *       - Posters
 *     responses:
 *       200:
 *         description: List of posters retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.get('/', isAuthorizeMiddleware, isAdmin, getAllPosters);

/**
 * @swagger
 * /posters/{id}:
 *   get:
 *     summary: Get poster by ID
 *     description: Retrieve a specific poster by its ID. Requires admin privileges.
 *     tags: 
 *       - Posters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the poster to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Poster retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Poster not found.
 */
router.get('/:id', isAuthorizeMiddleware, isAdmin, getPosterById);

/**
 * @swagger
 * /posters:
 *   post:
 *     summary: Create a new poster
 *     description: Create a new poster with an image upload. Requires admin privileges.
 *     tags: 
 *       - Posters
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Poster created successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       400:
 *         description: Invalid input.
 */
router.post('/', isAuthorizeMiddleware, isAdmin, mediaUploadMiddleware.single('img'), createPoster);

/**
 * @swagger
 * /posters/{id}:
 *   put:
 *     summary: Update an existing poster
 *     description: Update a poster by its ID with an optional image upload. Requires admin privileges.
 *     tags: 
 *       - Posters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the poster to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Poster updated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Poster not found.
 *       400:
 *         description: Invalid input.
 */
router.put('/:id', isAuthorizeMiddleware, isAdmin, mediaUploadMiddleware.single('img'), updatePoster);

/**
 * @swagger
 * /posters/{id}:
 *   delete:
 *     summary: Delete a poster
 *     description: Delete a poster by its ID. Requires admin privileges.
 *     tags: 
 *       - Posters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the poster to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Poster deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Poster not found.
 */
router.delete('/:id', isAuthorizeMiddleware, isAdmin, deletePoster);

export default router;





// import express from 'express';
// import { getAllPosters, getPosterById, createPoster, updatePoster, deletePoster } from '../controllers/posterController.js';
// import uploadMiddleware from '../middlewares/uploadMiddleware.js';
// import { isAuthorizeMiddleware } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";
// // import uploadMiddleware from '../middleware/uploadMiddleware.js';

// const router = express.Router();

// // Get all posters
// router.get('/', isAuthorizeMiddleware, isAdmin, getAllPosters);

// // Get poster by ID
// router.get('/:id', isAuthorizeMiddleware, isAdmin, getPosterById);

// // Create a new poster (with image upload)
// router.post('/', isAuthorizeMiddleware, isAdmin, uploadMiddleware.single('img'), createPoster);

// // Update a poster (with image upload)
// router.put('/:id', isAuthorizeMiddleware, isAdmin, uploadMiddleware.single('img'), updatePoster);

// // Delete a poster
// router.delete('/:id', isAuthorizeMiddleware, isAdmin, deletePoster);

// export default router;
