import cloudinary from 'cloudinary';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// blog/blogController.js

export const createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      
      // Log the user object to check if it's present
      console.log('User object:', req.user);
  
      // Ensure req.user exists
      if (!req.user || !req.user._id) {
        return res.status(401).json({ success: false, message: 'User not authenticated or user ID missing' });
      }
  
      let imageUrl = '';
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }
      
      const newPost = new Blog({
        title,
        content,
        image: imageUrl,
        author: req.user._id  // Use _id instead of userId
      });
  
      await newPost.save();
      res.status(201).json({ success: true, message: 'Blog post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(400).json({ success: false, message: 'Failed to create blog post', error: error.message });
    }
  };

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('author', 'username')
      .exec();

    const count = await Blog.countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to get blog posts', error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get blog post', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found or you are not authorized to update it' });
    }
    res.json({ message: 'Blog post updated successfully', post });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update blog post', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user.userId });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found or you are not authorized to delete it' });
    }
    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete blog post', error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    const newComment = new Comment({
      content,
      author: req.user.id,
      post: req.params.id
    });
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add comment', error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    if (post.likes.includes(req.user.userId)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.userId.toString());
    } else {
      post.likes.push(req.user.userId);
    }
    await post.save();
    res.json({ message: 'Post like status updated', likes: post.likes.length });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update like status', error: error.message });
  }
};