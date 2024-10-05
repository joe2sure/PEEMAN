import User from "../models/User";


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
      res.status(500).json({ success: false, message: 'Error updating user role', error: error.message });
    }
  };