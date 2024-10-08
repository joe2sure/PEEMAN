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
    coupon: {
      type: {
        code: String,
        discountType: {
          type: String,
          enum: ['percentage', 'fixed'], // Either percentage or fixed amount discount
          required: true,
        },
        discountValue: {
          type: Number,
          required: true, // value in percentage or fixed amount
        }
      }
    },
    isOffer: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false, // Indicating if the property is furnished
    },
    discount: Number, // The discount amount when isOffer is true
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
    videos: [
        {
          url: {
            type: String,
            required: true,
          },
        },
      ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
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
  },
  { timestamps: true }
);

PropertySchema.set("toJSON", {
  virtuals: true,
});

const Property = mongoose.models.property || mongoose.model("Property", PropertySchema);

export default Property;
