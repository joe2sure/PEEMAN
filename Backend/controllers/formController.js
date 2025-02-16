import cloudinary from '../utility/cloudinary.js';
import Form from '../models/Form.js';

// Upload form function
export const uploadForm = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    console.log('Processing upload:', {
      path: req.file.path,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    // Upload to Cloudinary with modified settings
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      public_id: `forms/${req.file.filename}`,
      access_mode: 'authenticated',
      type: 'private',
      format: 'pdf',
    });

    // Generate a temporary URL that's valid for 1 hour
    const signedUrl = cloudinary.utils.private_download_url(
      result.public_id,
      result.format,
      {
        resource_type: 'raw',
        type: 'private',
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      }
    );

    // Save form metadata to database
    const newForm = new Form({
      url: result.secure_url, // Store the permanent URL
      public_id: result.public_id,
      format: 'pdf',
      originalName: req.file.originalname,
      size: req.file.size,
    });

    await newForm.save();

    // Return both permanent and temporary URLs
    res.status(200).json({
      success: true,
      message: 'Form uploaded successfully',
      data: {
        ...newForm.toJSON(),
        temporaryUrl: signedUrl
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

// Get signed URL function
export const getSignedUrl = async (req, res) => {
  try {
    const { public_id } = req.params;
    
    const form = await Form.findOne({ public_id });
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    const signedUrl = cloudinary.utils.private_download_url(
      public_id,
      'pdf',
      {
        resource_type: 'raw',
        type: 'private',
        expires_at: Math.floor(Date.now() / 1000) + 3600
      }
    );

    res.json({
      success: true,
      url: signedUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating signed URL',
      error: error.message
    });
  }
};


// handling downloads
export const downloadForm = async (req, res) => {
  try {
    const { public_id } = req.params;
    
    // Find the form in the database
    const form = await Form.findOne({ public_id });
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    // Generate a signed URL
    const signedUrl = cloudinary.utils.private_download_url(
      form.public_id,
      'pdf',
      {
        resource_type: 'raw',
        type: 'private',
        expires_at: Math.floor(Date.now() / 1000) + 3600
      }
    );

    // Fetch the file from Cloudinary
    const response = await fetch(signedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from Cloudinary (${response.status})`);
    }

    // Get the file buffer
    const buffer = await response.arrayBuffer();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${form.originalName}"`);
    res.setHeader('Content-Length', buffer.byteLength);

    // Send the file
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading file',
      error: error.message
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