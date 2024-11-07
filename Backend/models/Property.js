import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    coupons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Coupon", // Reference to the Coupon model
        },
      ],
    isOffer: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false, // Indicating if the property is furnished
    },
    parkingSpace: {
      type: Boolean,
      default: false, // Indicating if the property is furnished
    },
    discount: Number, // The discount amount when isOffer is true
    propertyType: {
        type: String,
        enum: ['for lease', 'for sale', 'vacation home', 'investment', 'commercial use', 'short-term lease'],
        required: true
      },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    images: [
      {
        // image: {
        //   type: Number,
        //   required: true,
        // },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    videoCallRequests: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
      },
      requestedAt: {
        type: Date,
        default: Date.now
      }
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

PropertySchema.virtual("id").get(function () {
    return this._id.toHexString();
  });

PropertySchema.set("toJSON", {
  virtuals: true,
});

const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
