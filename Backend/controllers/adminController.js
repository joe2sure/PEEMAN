import Property from '../models/Property.js';
import User from '../models/User.js';



// @desc make user an admin
// @route PUT /api/users/:userId/make-admin
// @access private to be accessed only by superAdmin
export const makeAdmin = async (req, res) => {
    try {
      // Extract user ID from the request parameters
      const { userId } = req.params;
  
      // Find the user by ID and update the role to 'admin'
      const user = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });
  
      // If the user is not found, return a 404 error
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // If the update is successful, return the updated user and a success message
      res.json({ success: true, message: 'User role updated to admin', user });
    } catch (error) {
      // If any error occurs, return a 500 error and the error message
      res.status(500).json({ success: false, message: 'Server Error updating user role', error: error.message });
    }
  };


/**
 * Manage properties (Admin CRUD) 
 * */ 

// GET /api/properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json({ success: true, message: "Properties retrieved successfully", data: properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// GET /api/properties/:id
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


// Create property with images and videos
export const createProperty = async (req, res) => {
  try {
    // Remove the duplicate middleware since it's already applied in the route
    const { 
      name, 
      description, 
      location, 
      price, 
      beds, 
      baths,  
      isOffer, 
      discount, 
      furnished, 
      propertyType 
    } = req.body;

    // Log body and files for debugging
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    // Validate required fields
    if (!name || !description || !location || !propertyType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, description, location, or propertyType'
      });
    }

    // Parse numeric values
    const parsedPrice = parseFloat(price);
    const parsedBeds = parseInt(beds, 10);
    const parsedBaths = parseInt(baths, 10);
    const parsedDiscount = parseFloat(discount) || 0;

    if (isNaN(parsedPrice) || isNaN(parsedBeds) || isNaN(parsedBaths)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid numeric values for price, beds, or baths'
      });
    }

    let discountPrice = parsedPrice;
    if (isOffer === 'true' && parsedDiscount > 0) {
      discountPrice = parsedPrice - parsedDiscount;
    }

    // Validate and process uploaded files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    // Map Cloudinary URLs from uploaded files
    const images = req.files.map(file => ({
      url: file.path // Cloudinary URL
    }));

    const newProperty = new Property({
      name,
      description,
      location,
      price: parsedPrice,
      discountPrice,
      beds: parsedBeds,
      baths: parsedBaths,
      images,
      isOffer: isOffer === 'true',
      discount: parsedDiscount,
      furnished: furnished === 'true',
      propertyType
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: newProperty
    });
  } catch (error) {
    console.error('Property creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


export const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    
    const { price, isOffer, discount, propertyType } = req.body; // Include propertyType
    let discountPrice = price || property.price;
    
    if (isOffer && discount) {
      discountPrice = price - discount;
    }

    // Handle image updates
    const images = req.files
      ? req.files
          .filter((file) => file.mimetype.startsWith('image/'))
          .map((file) => ({ url: file.path }))
      : property.images;
      
      property = await Property.findByIdAndUpdate(
        req.params.id,
      { ...req.body, discountPrice, images, propertyType }, // Include propertyType
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: property,
      message: 'Property updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error updating property', error: error.message });
  }
};


// GET /api/properties/search
export const searchProperties = async (req, res) => {
  try {
    const { name, location, priceMin, priceMax } = req.query;

    // Build query based on provided parameters
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case insensitive
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = priceMin;
      if (priceMax) query.price.$lte = priceMax;
    }

    const properties = await Property.find(query);
    res.json({ success: true, data: properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// GET /api/properties/count
export const countProperties = async (req, res) => {
  try {
    const count = await Property.countDocuments();
    res.json({ success: true, data: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


// DELETE /api/properties/:id
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    // console.error(error.message);
    res.status(500).json({ success: false, message: 'Server Error deleting property', error: error.message });
  }
};