import React, { useState, useEffect } from "react";
import "../../../styles/components/admin/blog/AdminBlogScreen.css";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Edit, Trash } from "lucide-react";

// Sample blog post data
const sampleData = [
  {
    id: 1,
    title: "Top 10 Real Estate Trends for 2023",
    category: "Market Insights",
    tags: ["real estate", "trends", "2023"],
    isFeatured: true,
    views: 2456,
    engagement: 78.4,
  },
  {
    id: 2,
    title: "Renovating on a Budget: Tips and Tricks",
    category: "Home Improvement",
    tags: ["renovation", "budget", "DIY"],
    isFeatured: false,
    views: 1892,
    engagement: 65.2,
  },
  {
    id: 3,
    title: "Understanding the Mortgage Application Process",
    category: "Financing",
    tags: ["mortgage", "application", "first-time buyer"],
    isFeatured: true,
    views: 3124,
    engagement: 82.1,
  },
  // Add more sample data as needed
];

const AdminBlogScreen = () => {
  const [blogPosts, setBlogPosts] = useState(sampleData);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    tags: [],
    isFeatured: false,
  });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    // Fetch blog posts from the server (if applicable)
  }, []);

  const handleCreatePost = () => {
    // Create a new blog post
    setBlogPosts([...blogPosts, newPost]);
    setNewPost({
      title: "",
      category: "",
      tags: [],
      isFeatured: false,
    });
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setBlogPosts(updatedPosts);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = blogPosts.filter((post) => post.id !== postId);
    setBlogPosts(updatedPosts);
  };

  // Sample blog statistics data
  const blogStatisticsData = [
    { name: "Jan", views: 2400, engagement: 2400 },
    { name: "Feb", views: 1398, engagement: 2210 },
    { name: "Mar", views: 3800, engagement: 2290 },
    { name: "Apr", views: 2800, engagement: 2000 },
    { name: "May", views: 2210, engagement: 2181 },
    { name: "Jun", views: 2290, engagement: 2500 },
  ];

  return (
    <div className="admin-blog-management-screen">
      <div className="admin-blog-management-header">
        <h2>Blog Management</h2>
        <button
          className="admin-blog-create-post-btn"
          onClick={handleCreatePost}
        >
          Add New Post
        </button>
      </div>
      <div className="admin-blog-post-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Featured</th>
              <th>Views</th>
              <th>Engagement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.tags.join(", ")}</td>
                <td>{post.isFeatured ? "Yes" : "No"}</td>
                <td>{post.views}</td>
                <td>{post.engagement.toFixed(1)}%</td>
                <td>
                  <div className="admin-blog-post-buttons">
                    <button
                      className="admin-blog-edit-post-btn"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="admin-blog-delete-post-btn"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-blog-statistics">
        <h2>Blog Statistics</h2>
        <div className="admin-blog-statistics-chart">
          <LineChart width={800} height={400} data={blogStatisticsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
            <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogScreen;
