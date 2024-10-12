// models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide content for the comment'],
    trim: true,
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

CommentSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  CommentSchema.set("toJSON", {
    virtuals: true,
  });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;