import React from 'react';
import '../../../styles/components/home/blogPage/Sidebar.css';

const Sidebar = () => {
  const recentPosts = [
    { id: 1, title: "Investment Strategies in Real Estate", image: "/images/investment.jpg" },
    { id: 2, title: "Tips for First-Time Buyers", image: "/images/first-time-buyers.jpg" },
    // Add more recent posts
  ];

  return (
    <aside className="sidebar">
      <div className="widget">
        <h3>Recent Posts</h3>
        <ul>
          {recentPosts.map(post => (
            <li key={post.id}>
              <img src={post.image} alt={post.title} />
              <p>{post.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget">
        <h3>Most Viewed Videos</h3>
        {/* Add similar code for videos */}
        <ul>
          {/* Example Video Section */}
          <li>Video Placeholder 1</li>
          <li>Video Placeholder 2</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
