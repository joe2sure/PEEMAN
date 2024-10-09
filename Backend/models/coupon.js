import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountType: {
    type: String,
    enum: ['fixed', 'percentage'],
    required: true
  },
  discountAmount: {
    type: Number,
    required: true
  },
  minimumPurchaseAmount: {
    type: Number,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  applicablePropertyType: {
    type: String,
    enum: ['for lease', 'for sale', 'vacation home', 'investment', 'commercial use', 'short-term lease'],
    required: true
  },
}, { timestamps: true });

CouponSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
export default Coupon;