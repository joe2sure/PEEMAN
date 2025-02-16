import express from 'express';
import {formUploadMiddleware}  from '../middlewares/uploadMiddleware.js';
import { uploadForm, getSignedUrl, downloadForm } from '../controllers/formController.js';
import cloudinary from '../utility/cloudinary.js';

const router = express.Router();

// Use the specific form upload middleware
router.post('/upload-form', formUploadMiddleware.single('form'), uploadForm);
router.get('/signed-url/:public_id', getSignedUrl);
router.get('/download/:public_id', downloadForm);


export default router;


// import express from 'express';
// import uploadMiddleware from '../middlewares/uploadMiddleware.js';
// import { uploadForm } from '../controllers/formController.js';

// const router = express.Router();

// router.post('/upload-form', uploadMiddleware.single('form'), uploadForm);

// router.get('/download/:public_id', async (req, res) => {
//     try {
//       const { public_id } = req.params;
      
//       // Generate signed URL
//       const signedUrl = cloudinary.utils.private_download_url(
//         public_id,
//         'pdf',
//         {
//           resource_type: 'raw',
//           type: 'authenticated',
//           expires_at: Math.floor(Date.now() / 1000) + 3600
//         }
//       );
  
//       // Fetch the file using the signed URL
//       const response = await fetch(signedUrl);
      
//       if (!response.ok) {
//         throw new Error(`Failed to download file (${response.status})`);
//       }
  
//       // Set response headers
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', `attachment; filename="${public_id.split('/').pop()}"`);
  
//       // Pipe the response
//       response.body.pipe(res);
//     } catch (error) {
//       console.error('Download error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Error downloading file',
//         error: error.message
//       });
//     }
//   });

// export default router;