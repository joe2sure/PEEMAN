export const uploadForm = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }
  
      // Add detailed logging
      console.log('File upload details:', {
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
  
      // Verify the file exists in Cloudinary
      try {
        const result = await cloudinary.api.resource(req.file.filename, { resource_type: 'raw' });
        console.log('Cloudinary verification:', result);
      } catch (error) {
        console.error('Cloudinary verification failed:', error);
      }
  
      res.status(200).json({
        success: true,
        message: 'Form uploaded successfully',
        data: {
          url: req.file.path,
          public_id: req.file.filename,
          format: 'pdf',
          originalName: req.file.originalname,
          size: req.file.size
        }
      });
    } catch (error) {
      console.error('Error uploading form:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading form',
        error: error.message,
      });
    }
  };


// import cloudinary from '../utility/cloudinary.js';

// export const uploadForm = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded',
//       });
//     }

//     // Upload the file to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'forms',
//       resource_type: 'raw',
//       public_id: `forms/${req.file.originalname.replace(/\.[^/.]+$/, '')}_${Date.now()}`,
//       format: 'pdf',
//     });

//     // Return the Cloudinary response
//     res.status(200).json({
//       success: true,
//       message: 'Form uploaded successfully',
//       data: result,
//     });
//   } catch (error) {
//     console.error('Error uploading form:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error uploading form',
//       error: error.message,
//     });
//   }
// };