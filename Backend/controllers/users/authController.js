import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { OAuth2Client } from "google-auth-library"; // Correct import
import crypto from "crypto";

import User from "../../models/User.js";
import sendEmail from "../../utility/sendEmail.js";




// @desc Register a new user
// @route POST /api/auth
// @access Public
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};


// @desc Login a user
// @route POST /api/auth
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email credential" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

// Initialize Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc Google Login
// @route POST /api/auth/google
// @access Public
export const googleLogin = async (req, res) => {
  const { tokenId } = req.body; // Token sent from frontend after Google login

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your client ID
    });

    const { email, name, picture } = ticket.getPayload(); // Extract user details from the token

    // Check if user exists in your database
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        username: name,
        email,
        password: Math.random().toString(36).slice(-8), // Generate a random password for Google accounts
        avatar: picture, // Store their Google profile picture if needed
      });
      await user.save();
    }

    // Generate JWT token for app's session
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send back the token and user data
    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Google login failed",
      error: error.message,
    });
  }
};

/**
 * Reset password functionality
 */

// Request password reset (Step 1)
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // Send the email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you requested a password reset. Please click the link: ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending reset email",
        error: error.message,
      });
  }
};


// Reset password (Step 2)
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash the token from the URL and find user
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Hash the new password before saving
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error resetting password",
        error: error.message,
      });
  }
};


/**
 * End of reset password functionality
 */
