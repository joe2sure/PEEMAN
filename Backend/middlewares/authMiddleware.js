import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/User.js';


dotenv.config();

const isAuthorizeMiddleware = async (req, res, next) => {
    const jwt_secret = process.env.JWT_SECRET;
  
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]; // Extracts the token from the header
  
      try {
        const decode = jwt.verify(token, jwt_secret); // Decodes and verifies the token
        const user = await User.findById(decode.id); // Finds the user by the decoded userId
        
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "User not found, unauthorized access!",
          });
        }
  
        req.user = user; // Stores user data for use in next middleware or route
        next(); // Allows the request to continue if everything is valid
      } catch (error) {
        // Handles token-related errors
        if (error.name === "TokenExpiredError") {
          return res.json({
            success: false,
            message: "Session expired, please sign in again!",
          });
        }
        if (error.name === "JsonWebTokenError") {
          return res.json({
            success: false,
            message: "Unauthorized access, invalid token!",
          });
        }
  
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }
  };
  


const authMiddleware = (req, res, next) => {
    // Get token from request header
    const token = req.header('x-auth-token');
  
    // If token is not provided, deny access
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Attach decoded user data (e.g., user ID) to the request object
      req.user = decoded;
  
      // Continue to the next middleware or route handler
      next();
    } catch (err) {
      // If token verification fails, return an error response
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };

  export  {authMiddleware, isAuthorizeMiddleware};