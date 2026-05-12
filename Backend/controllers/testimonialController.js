import Testimonial from '../models/Testimonial.js';

// ─── Public ──────────────────────────────────────────────────────────────────

/** GET /testimonials/approved  — used by the home page */
export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' })
      .sort({ updatedAt: -1 })
      .populate('user', 'username avatar')
      .lean();

    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials', error: error.message });
  }
};

// ─── Authenticated users ──────────────────────────────────────────────────────

/** POST /testimonials  — logged-in user submits a review */
export const submitTestimonial = async (req, res) => {
  try {
    const { rating, text } = req.body;

    if (!rating || !text) {
      return res.status(400).json({ success: false, message: 'Rating and review text are required.' });
    }

    // One pending/approved testimonial per user is enough — reject duplicates gracefully
    const existing = await Testimonial.findOne({
      user: req.user._id,
      status: { $in: ['pending', 'approved'] },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          existing.status === 'approved'
            ? 'You already have an approved testimonial.'
            : 'Your testimonial is pending admin approval.',
      });
    }

    const testimonial = await Testimonial.create({
      user: req.user._id,
      rating: Number(rating),
      text,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted and is pending approval.',
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit testimonial', error: error.message });
  }
};

/** GET /testimonials/my  — fetch the current user's own testimonial */
export const getMyTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ user: req.user._id }).lean();
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch your testimonial', error: error.message });
  }
};

// ─── Admin ────────────────────────────────────────────────────────────────────

/** GET /admin/testimonials  — all testimonials with user info */
export const getAllTestimonials = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('user', 'username email avatar')
      .lean();

    const total = await Testimonial.countDocuments(filter);

    res.status(200).json({ success: true, testimonials, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials', error: error.message });
  }
};

/** PUT /admin/testimonials/:id/approve */
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', adminNote: '' },
      { new: true }
    ).populate('user', 'username email avatar');

    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });

    res.status(200).json({ success: true, message: 'Testimonial approved.', testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to approve testimonial', error: error.message });
  }
};

/** PUT /admin/testimonials/:id/reject */
export const rejectTestimonial = async (req, res) => {
  try {
    const { adminNote } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', adminNote: adminNote || '' },
      { new: true }
    ).populate('user', 'username email avatar');

    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });

    res.status(200).json({ success: true, message: 'Testimonial rejected.', testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reject testimonial', error: error.message });
  }
};

/** DELETE /admin/testimonials/:id */
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });

    res.status(200).json({ success: true, message: 'Testimonial deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial', error: error.message });
  }
};