import express from "express";

import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import {
  createProperty,
  deleteProperty,
  makeAdmin,
  updateProperty,
  getAllProperties,
  getPropertyById,
  searchProperties,
  countProperties,
} from "../controllers/adminController.js";
import { isAuthorizeMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Promote user to admin
router.put("/make-admin/:id", isAuthorizeMiddleware, makeAdmin);

// Property management routes
router.post(
  "/properties",
  isAuthorizeMiddleware,
  isAdmin,
  uploadMiddleware.array("media", 6),
  createProperty
);
router.get("/properties", isAuthorizeMiddleware, isAdmin, getAllProperties);
router.get(
    "/properties/count",
    isAuthorizeMiddleware,
    isAdmin,
    countProperties
  );
  router.get(
    "/properties/search",
    isAuthorizeMiddleware,
    isAdmin,
    searchProperties
  );
router.get("/properties/:id", isAuthorizeMiddleware, isAdmin, getPropertyById);
router.put("/properties/:id", isAuthorizeMiddleware, isAdmin, updateProperty);
router.delete(
  "/properties/:id",
  isAuthorizeMiddleware,
  isAdmin,
  deleteProperty
);


export default router;