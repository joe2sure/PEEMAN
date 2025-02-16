import express from 'express';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addComment,
  likePost
} from '../controllers/blogController.js';
import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import {mediaUploadMiddleware} from '../middlewares/uploadMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Returns a list of blog posts
 */
router.get('/', getPosts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the requested post
 *       404:
 *         description: Post not found
 */
router.get('/:id', getPost);

/**
 * @swagger
 * /{id}/comments:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Comment text
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/comments', isAuthorizeMiddleware, addComment);

/**
 * @swagger
 * /{id}/like:
 *   post:
 *     summary: Like a blog post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/like', isAuthorizeMiddleware, likePost);

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new blog post (Admin only)
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image for the post
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post('/post', isAuthorizeMiddleware, isAdmin, mediaUploadMiddleware.single('image'), createPost);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update a blog post (Admin only)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.put('/post/:id', isAuthorizeMiddleware, isAdmin, updatePost);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a blog post (Admin only)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.delete('/post/:id', isAuthorizeMiddleware, isAdmin, deletePost);

export default router;



// import express from 'express';
// import {
//   createPost,
//   getPosts,
//   getPost,
//   updatePost,
//   deletePost,
//   addComment,
//   likePost
// } from '../controllers/blogController.js';
// import { isAuthorizeMiddleware } from '../middlewares/authMiddleware.js';
// import { isAdmin } from '../middlewares/adminMiddleware.js';
// import uploadMiddleware from '../middlewares/uploadMiddleware.js';



// const router = express.Router();

// // Public routes
// router.get('/', getPosts);
// router.get('/:id', getPost);

// // User routes
// router.post('/:id/comments', isAuthorizeMiddleware, addComment);
// router.post('/:id/like', isAuthorizeMiddleware, likePost);

// // Admin routes
// router.post('/post', isAuthorizeMiddleware, isAdmin, uploadMiddleware.single('image'), createPost);
// router.put('/post/:id', isAuthorizeMiddleware, isAdmin, updatePost);
// router.delete('/post/:id', isAuthorizeMiddleware, isAdmin, deletePost);

// export default router;