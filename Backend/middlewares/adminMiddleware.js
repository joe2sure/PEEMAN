import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
    try {
      // Find the user by ID, assuming req.user.userId is available from the authentication token
      const user = await User.findById(req.user.id);
  
      // Check if the user's role is not 'admin'
      if (user.role !== 'admin') {
        // If not an admin, deny access
        return res.status(403).json({  success: false, message: 'Access denied. Admin role required.' });
      }
  
      // If the user is an admin, continue to the next middleware or route handler
      next();
    } catch (error) {
      // If there's an error, send a 500 error response
      res.status(500).json({ success: false, message: 'Error checking admin status', error: error.message });
    }
  };
  