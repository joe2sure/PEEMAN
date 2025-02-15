import express from 'express';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import { uploadForm } from '../controllers/formController.js';

const router = express.Router();

router.post('/upload-form', uploadMiddleware.single('form'), uploadForm);

export default router;