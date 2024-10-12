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
import uploadMiddleware from '../middlewares/uploadMiddleware.js';



const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// User routes
router.post('/:id/comments', isAuthorizeMiddleware, addComment);
router.post('/:id/like', isAuthorizeMiddleware, likePost);

// Admin routes
router.post('/post', isAuthorizeMiddleware, isAdmin, uploadMiddleware.single('image'), createPost);
router.put('/post/:id', isAuthorizeMiddleware, isAdmin, updatePost);
router.delete('/post/:id', isAuthorizeMiddleware, isAdmin, deletePost);

export default router;