import Poster from '../models/Poster.js';
import cloudinary from '../utility/cloudinary.js';


// Get all posters
export const getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find({});
    res.json({ success: true, message: "Posters retrieved successfully.", data: posters });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get a poster by ID
export const getPosterById = async (req, res) => {
  try {
    const posterID = req.params.id;
    const poster = await Poster.findById(posterID);
    if (!poster) {
      return res.status(404).json({ success: false, message: "Poster not found." });
    }
    res.json({ success: true, message: "Poster retrieved successfully.", data: poster });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Create a new poster
export const createPoster = async (req, res) => {
  try {
    const { posterName } = req.body;
    if (!posterName) {
      return res.status(400).json({ success: false, message: "Poster name is required." });
    }

    // Handle image upload with Cloudinary
    let imageUrl = 'no_url';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'posters/images',
      });
      imageUrl = result.secure_url;
    }

    const newPoster = new Poster({
      posterName,
      imageUrl,
    });

    await newPoster.save();
    res.json({ success: true, message: "Poster created successfully.", data: newPoster });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Update a poster
export const updatePoster = async (req, res) => {
  try {
    const posterID = req.params.id;
    const { posterName } = req.body;

    let imageUrl = req.body.imageUrl; // Use the provided image URL

    if (req.file) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'posters/images',
      });
      imageUrl = result.secure_url;
    }

    if (!posterName || !imageUrl) {
      return res.status(400).json({ success: false, message: "Poster name and image are required." });
    }

    const updatedPoster = await Poster.findByIdAndUpdate(posterID, { posterName, imageUrl }, { new: true });

    if (!updatedPoster) {
      return res.status(404).json({ success: false, message: "Poster not found." });
    }

    res.json({ success: true, message: "Poster updated successfully.", data: updatedPoster });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' ,error: error.message });
  }
};

// Delete a poster
export const deletePoster = async (req, res) => {
  try {
    const posterID = req.params.id;
    const deletedPoster = await Poster.findByIdAndDelete(posterID);

    if (!deletedPoster) {
      return res.status(404).json({ success: false, message: "Poster not found." });
    }

    res.json({ success: true, message: "Poster deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' , error: error.message });
  }
};
