// uploadMiddleware.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import cloudinary from '../utility/cloudinary.js';
dotenv.config();

// Media (Images and Videos) Storage Configuration
const mediaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const baseParams = {
      public_id: `${file.originalname.replace(/\.[^/.]+$/, '')}_${Date.now()}`
    };

    if (file.mimetype.startsWith('image/')) {
      return {
        ...baseParams,
        folder: 'properties/images',
        allowed_formats: ['jpg', 'png', 'jpeg']
      };
    } else if (file.mimetype.startsWith('video/')) {
      return {
        ...baseParams,
        folder: 'properties/videos',
        allowed_formats: ['mp4', 'avi', 'mov']
      };
    }
    
    throw new Error('Invalid media type');
  }
});

// Form (PDF) Storage Configuration
const formStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'forms',
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      public_id: `${file.originalname.replace(/\.[^/.]+$/, '')}_${Date.now()}`,
      resource_type: 'raw',
      format: 'pdf',
      type: 'private',
      access_mode: 'authenticated',
      use_filename: true,
      unique_filename: true
    };
  }
});
// const formStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: (req, file) => {
//     return {
//       public_id: `${file.originalname.replace(/\.[^/.]+$/, '')}_${Date.now()}`,
//       resource_type: 'raw',
//       format: 'pdf',
//       folder: 'forms',
//       access_mode: 'authenticated',
//       type: 'private'
//     };
//   }
// });

// Media Upload Middleware
export const mediaUploadMiddleware = multer({
  storage: mediaStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 6
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'), false);
    }
  }
});

// Form Upload Middleware
export const formUploadMiddleware = multer({
  storage: formStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});


// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import dotenv from 'dotenv';
// import cloudinary from '../utility/cloudinary.js';

// dotenv.config();

// // Cloudinary storage setup for images and videos
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: (req, file) => {
//     if (file.mimetype.startsWith('image/')) {
//       return {
//         folder: 'properties/images',
//         allowed_formats: ['jpg', 'png', 'jpeg'],
//         public_id: `image_${Date.now()}`,
//       };
//     } else if (file.mimetype.startsWith('video/')) {
//       return {
//         folder: 'properties/videos',
//         resource_type: 'video',
//         allowed_formats: ['mp4', 'avi', 'mov'],
//         public_id: `video_${Date.now()}`,
//       };
//     }
//   },
// });

// const uploadMiddleware = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
//     files: 6, // Maximum 6 files (images or videos)
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images and videos are allowed!'), false);
//     }
//   },
// });

// export default uploadMiddleware;
