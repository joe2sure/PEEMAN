import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import cloudinary from '../utility/cloudinary.js';

dotenv.config();

// Cloudinary storage setup for images and videos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (file.mimetype.startsWith('image/')) {
      return {
        folder: 'properties/images',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: `image_${Date.now()}`,
      };
    } else if (file.mimetype.startsWith('video/')) {
      return {
        folder: 'properties/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'avi', 'mov'],
        public_id: `video_${Date.now()}`,
      };
    }
  },
});

const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    files: 6, // Maximum 6 files (images or videos)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'), false);
    }
  },
});

export default uploadMiddleware;
