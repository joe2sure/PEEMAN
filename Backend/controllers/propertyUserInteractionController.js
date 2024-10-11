import Property from '../models/Property.js';
import User from '../models/User.js';

// Like a property
export const likeProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Property already liked' });
    }

    property.likes.push(userId);
    await property.save();

    res.json({ success: true, message: 'Property liked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Unlike a property
export const unlikeProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const index = property.likes.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ success: false, message: 'Property not liked by user' });
    }

    property.likes.splice(index, 1);
    await property.save();

    res.json({ success: true, message: 'Property unliked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Add a review (comment and rating)
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const newReview = {
      user: userId,
      rating,
      comment
    };

    property.reviews.push(newReview);
    await property.save();

    res.json({ success: true, message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Request a video call
export const requestVideoCall = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const existingRequest = property.videoCallRequests.find(request => request.user.toString() === userId);
    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'Video call request already exists' });
    }

    property.videoCallRequests.push({ user: userId });
    await property.save();

    res.json({ success: true, message: 'Video call request sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get property details including likes, reviews, and video call requests
export const getPropertyDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id)
      .populate('likes', 'name email') // Populate user details for likes
      .populate('reviews.user', 'name email') // Populate user details for reviews
      .populate('videoCallRequests.user', 'name email'); // Populate user details for video call requests

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};