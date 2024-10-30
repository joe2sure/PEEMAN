import React from 'react';
import '../../../../styles/components/home/blogPage/sideBar/RecentPosts.css'

const RecentPosts = ({ posts }) => (
  <div className="blog-widget">
    <h3 className="blog-widget-title">Recent Posts</h3>
    <div className="blog-recent-posts">
      {posts.map(post => (
        <div key={post.id} className="blog-recent-post-item">
          <img 
            src={post.image} 
            alt={post.title}
            className="blog-recent-post-image"
          />
          <div className="blog-recent-post-content">
            <h4 className="blog-recent-post-title">{post.title}</h4>
            <div className="blog-recent-post-meta">
              <span>{post.date}</span>
              <span className="blog-meta-separator">•</span>
              <span>{post.views} views</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentPosts;