import User from '../../models/User.js';
import cloudinary from '../../utility/cloudinary.js';  // If using Cloudinary for image uploads

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Upload image to Cloudinary (or other services)
        const result = await cloudinary.uploader.upload(req.file.path);
        user.avatar = result.secure_url; // Store the image URL in the 'avatar' field

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile picture uploaded successfully',
            data: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error uploading profile picture', error: error.message });
    }
};

// Update username
export const updateUsername = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.username = username;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Username updated successfully',
            data: user.username,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating username', error: error.message });
    }
};

// Delete favorite properties (liked properties)
export const deleteFavoriteProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.favoriteProperties = []; // Clear out the favorite properties array
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Favorite properties removed successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting favorite properties', error: error.message });
    }
};

// Get user profile details
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favoriteProperties'); // Populates the user's liked properties
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
    }
};
