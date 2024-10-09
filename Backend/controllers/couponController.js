import Coupon from "../models/coupon.js";
import Property from "../models/Property.js";


// Create a new coupon
// Create a new coupon
export const createCoupon = async (req, res) => {
    const { code, discountType, discountAmount, minimumPurchaseAmount, endDate, status, applicablePropertyType, applicableProperties } = req.body;
  
    if (!code || !discountType || !discountAmount || !endDate || !status) {
      return res.status(400).json({ success: false, message: "code, discountType, discountAmount, endDate, and status are required." });
    }
  
    try {
      const newCoupon = new Coupon({
        code,
        discountType,
        discountAmount,
        minimumPurchaseAmount,
        endDate,
        status,
        applicablePropertyType,
        applicableProperties // Use array of property IDs
      });
  
      await newCoupon.save();
  
      // Optionally update the properties to associate them with the new coupon
      if (applicableProperties && applicableProperties.length > 0) {
        await Property.updateMany(
          { _id: { $in: applicableProperties } },
          { $push: { coupons: newCoupon._id } }
        );
      }
  
      res.status(201).json({ success: true, message: "Coupon created successfully", coupon: newCoupon });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  };  

  

// Get all coupons
export const getAllCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find()
        .populate({
          path: 'applicableProperties',
          select: 'name images', // Populate the name and images of the properties
        });
      
      res.json({ success: true, message: 'Coupons retrieved successfully', data: coupons });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
  

// Get a coupon by ID
export const getCoupon = async (req, res) => {
    try {
        const couponID = req.params.id;
        const coupon = await Coupon.findById(couponID)
            .populate('applicableProperty', 'id name');
        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found." });
        }
        res.json({ success: true, message: "Coupon retrieved successfully.", data: coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a coupon
export const updateCoupon = async (req, res) => {
    try {
      const couponID = req.params.id;
      const { code, discountType, discountValue, minimumPurchaseAmount, endDate, status, applicablePropertyType } = req.body;
      if (!code || !discountType || !discountValue || !endDate || !status || !applicablePropertyType) {
          return res.status(400).json({ success: false, message: "code, discountType, discountValue, endDate, status, and applicablePropertyType are required." });
      }
  
      const updatedCoupon = await Coupon.findByIdAndUpdate(
          couponID,
          { code, discountType, discountValue, minimumPurchaseAmount, endDate, status, applicablePropertyType },
          { new: true }
      );
  
      if (!updatedCoupon) {
          return res.status(404).json({ success: false, message: "Coupon not found." });
      }
      res.json({ success: true, message: 'Coupon updated successfully', coupon: updatedCoupon });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
        const couponID = req.params.id;
        const deletedCoupon = await Coupon.findByIdAndDelete(couponID);
        if (!deletedCoupon) {
            return res.status(404).json({ success: false, message: "Coupon not found." });
        }

    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Check coupon
export const checkCoupon = async (req, res) => {
    const { code, propertyId, purchaseAmount } = req.body;

    try {
        // Find the coupon with the provided coupon code
        const coupon = await Coupon.findOne({ code });

        // If coupon is not found, return false
        if (!coupon) {
            return res.json({ success: false, message: "Coupon not found." });
        }

        // Check if the coupon is expired
        const currentDate = new Date();
        if (coupon.endDate < currentDate) {
            return res.json({ success: false, message: "Coupon is expired." });
        }

        // Check if the coupon is active
        if (coupon.status !== 'active') {
            return res.json({ success: false, message: "Coupon is inactive." });
        }

        // Check if the purchase amount is greater than the minimum purchase amount specified in the coupon
        if (coupon.minimumPurchaseAmount && purchaseAmount < coupon.minimumPurchaseAmount) {
            return res.json({ success: false, message: "Minimum purchase amount not met." });
        }

        // Fetch the property from the database using the provided property ID
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.json({ success: false, message: "Property not found." });
        }

        // Check if the coupon is applicable for the property type
        if (coupon.applicablePropertyType !== property.propertyType) {
            return res.json({ success: false, message: "Coupon is not applicable for this property type." });
        }

        return res.json({ success: true, message: "Coupon is applicable for the provided property.", data: coupon });
    } catch (error) {
        console.error('Error checking coupon code:', error.message);
        return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
}
