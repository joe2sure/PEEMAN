import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import cloudinary from '../utility/cloudinary.js';

dotenv.config();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Cloudinary storage setup for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Specify allowed image formats
    public_id: (req, file) => `profile_${Date.now()}`, // Custom file name
  },
});

// Multer middleware for handling file uploads
const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Please upload an image file'), false);
    }
    cb(null, true);
  },
});

export default uploadMiddleware;
