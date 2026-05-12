import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: [true, 'Please provide review text'],
      trim: true,
      maxlength: [600, 'Review cannot exceed 600 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNote: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

TestimonialSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TestimonialSchema.set('toJSON', { virtuals: true });

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;