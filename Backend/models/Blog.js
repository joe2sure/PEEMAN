import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the blog post'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content for the blog post'],
    trim: true
  },
  image: {
    type: String,
    required: true
    // required: [true, 'Please provide an image for the blog post']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

BlogSchema.index({ title: 'text', content: 'text' });

BlogSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  BlogSchema.set("toJSON", {
    virtuals: true,
  });

const Blog = mongoose.model('BlogPost', BlogSchema);

export default Blog;