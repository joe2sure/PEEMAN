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

/**
 * @swagger
 * /make-admin/{id}:
 *   put:
 *     summary: Promote user to admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to promote
 *     responses:
 *       200:
 *         description: User promoted to admin
 *       400:
 *         description: Invalid ID supplied
 *       403:
 *         description: Unauthorized action
 */
router.put("/make-admin/:id", isAuthorizeMiddleware, makeAdmin);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Property Management]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of media files
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Unauthorized action
 */
router.post(
  "/properties",
  isAuthorizeMiddleware,
  isAdmin,
  uploadMiddleware.array("media", 6),
  createProperty
);

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Property Management]
 *     responses:
 *       200:
 *         description: List of properties retrieved
 *       403:
 *         description: Unauthorized action
 */
router.get("/properties", isAuthorizeMiddleware, isAdmin, getAllProperties);

/**
 * @swagger
 * /properties/count:
 *   get:
 *     summary: Get the total count of properties
 *     tags: [Property Management]
 *     responses:
 *       200:
 *         description: Total property count retrieved
 *       403:
 *         description: Unauthorized action
 */
router.get(
  "/properties/count",
  isAuthorizeMiddleware,
  isAdmin,
  countProperties
);

/**
 * @swagger
 * /properties/search:
 *   get:
 *     summary: Search properties
 *     tags: [Property Management]
 *     responses:
 *       200:
 *         description: List of properties matching search criteria
 *       403:
 *         description: Unauthorized action
 */
router.get(
  "/properties/search",
  isAuthorizeMiddleware,
  isAdmin,
  searchProperties
);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Property Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property details retrieved
 *       400:
 *         description: Invalid property ID
 *       403:
 *         description: Unauthorized action
 */
router.get("/properties/:id", isAuthorizeMiddleware, isAdmin, getPropertyById);

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property details
 *     tags: [Property Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       400:
 *         description: Invalid property ID
 *       403:
 *         description: Unauthorized action
 */
router.put("/properties/:id", isAuthorizeMiddleware, isAdmin, updateProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete property by ID
 *     tags: [Property Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       400:
 *         description: Invalid property ID
 *       403:
 *         description: Unauthorized action
 */
router.delete(
  "/properties/:id",
  isAuthorizeMiddleware,
  isAdmin,
  deleteProperty
);

export default router;





// import express from "express";

// import uploadMiddleware from "../middlewares/uploadMiddleware.js";
// import {
//   createProperty,
//   deleteProperty,
//   makeAdmin,
//   updateProperty,
//   getAllProperties,
//   getPropertyById,
//   searchProperties,
//   countProperties,
// } from "../controllers/adminController.js";
// import { isAuthorizeMiddleware } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// // Promote user to admin
// router.put("/make-admin/:id", isAuthorizeMiddleware, makeAdmin);

// // Property management routes
// router.post(
//   "/properties",
//   isAuthorizeMiddleware,
//   isAdmin,
//   uploadMiddleware.array("media", 6),
//   createProperty
// );
// router.get("/properties", isAuthorizeMiddleware, isAdmin, getAllProperties);
// router.get(
//     "/properties/count",
//     isAuthorizeMiddleware,
//     isAdmin,
//     countProperties
//   );
//   router.get(
//     "/properties/search",
//     isAuthorizeMiddleware,
//     isAdmin,
//     searchProperties
//   );
// router.get("/properties/:id", isAuthorizeMiddleware, isAdmin, getPropertyById);
// router.put("/properties/:id", isAuthorizeMiddleware, isAdmin, updateProperty);
// router.delete(
//   "/properties/:id",
//   isAuthorizeMiddleware,
//   isAdmin,
//   deleteProperty
// );


// export default router;