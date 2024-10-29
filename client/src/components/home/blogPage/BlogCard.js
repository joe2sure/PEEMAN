import React from 'react';
import '../../../styles/components/home/blogPage/BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-details">
        <h3>{blog.title}</h3>
        <p className="blog-author">By {blog.author} - {blog.publishedDate}</p>
        <div className="blog-stats">
          <span>❤️ {blog.likes}</span>
          <span>💬 {blog.comments}</span>
          <span>🔗 {blog.shares}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
