import React, { useState } from "react";
import "../../styles/pages/home/BlogPage.css";
import TabsFilter from "../../components/home/blogPage/TabFilter";
import BlogCard from "../../components/home/blogPage/BlogCard";
import Pagination from "../../components/home/blogPage/Pagination";
import { FaSearch, FaCandyCane } from "react-icons/fa";
import BlogSidebar from "./Sidebar";
import BlogHeroSection from "../../components/home/blogPage/HeroSection";
// import Sidebar from '../../components/home/blogPage/Sidebar';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;


  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Understanding Real Estate Market Trends",
      category: "Market",
      image: require("../../assets/images/home/property-image-2.svg").default,
      likes: 561,
      comments: 24,
      shares: 5,
      author: "John Doe",
      publishedDate: "October 25, 2024",
    },
    {
      id: 2,
      title: "How to Choose the Best Neighborhood",
      category: "Tips",
      image: require("../../assets/images/home/property-image-2.svg").default,
      likes: 234,
      comments: 13,
      shares: 7,
      author: "Jane Smith",
      publishedDate: "October 22, 2024",
    },
    {
      id: 3,
      title: "Real Estate Investment Strategies",
      category: "Investment",
      image: require("../../assets/images/home/property-image.svg").default,
      likes: 672,
      comments: 18,
      shares: 9,
      author: "Alex Johnson",
      publishedDate: "October 15, 2024",
    },
    {
      id: 1,
      title: "Top 5 Real Estate Trends to Watch in 2024/2025",
      author: "John Doe",
      date: "April 15, 2024",
      image: require("../../assets/images/home/property-image.svg").default,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      likes: 245,
      comments: 68
    },
    {
      id: 2,
      title: "How to Increase Your Home's Value Before Selling",
      author: "Jane Smith",
      date: "March 28, 2024",
      image: require("../../assets/images/home/property-image.svg").default,
      content: "Donec vel metus ac lacus vehicula euismod. Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      likes: 189,
      comments: 42
    },
    {
      id: 3,
      title: "5 Tips for First-Time Home Buyers",
      author: "Michael Johnson",
      date: "February 12, 2023",
      image: require("../../assets/images/home/property-image.svg").default,
      content: "Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec vel metus ac lacus vehicula euismod.",
      likes: 301,
      comments: 89
    }
  ]);

  // Handle search and filter
  const filteredBlogs = blogs.filter(
    (blog) =>
      (currentCategory === "All" || blog.category === currentCategory) &&
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="blog-page">
      <BlogHeroSection />

      <div className="content-wrapper">
        <div className="filter-header">
          <TabsFilter
            currentCategory={currentCategory}
            setCategory={setCategory}
          />
          <div className="header-icons">
            <button className="icon-button" onClick={() => {}}>
              <FaSearch className="search-icon" />
            </button>
            <button className="icon-button" onClick={() => {}}>
              <FaCandyCane className="candy-icon" />
            </button>
          </div>
        </div>

        <div className="blog-main-content">
          <div className="blog-content">
            <div className="blog-list">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

// import React, { useState, useEffect } from 'react';
// import { BiSearch, BiFilter } from 'react-icons/bi';
// import { FaRegThumbsUp, FaRegComment, FaRegShareSquare } from 'react-icons/fa';
// import '../../styles/pages/home/blogPage/BlogPage.css';

// // Blog post data
// const blogPosts = [
//   {
//     id: 1,
//     title: "Top 5 Real Estate Trends to Watch in 2023",
//     author: "John Doe",
//     date: "April 15, 2023",
//     image: "/api/placeholder/400/200",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
//     likes: 245,
//     comments: 68
//   },
//   {
//     id: 2,
//     title: "How to Increase Your Home's Value Before Selling",
//     author: "Jane Smith",
//     date: "March 28, 2023",
//     image: "/api/placeholder/400/200",
//     content: "Donec vel metus ac lacus vehicula euismod. Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
//     likes: 189,
//     comments: 42
//   },
//   {
//     id: 3,
//     title: "5 Tips for First-Time Home Buyers",
//     author: "Michael Johnson",
//     date: "February 12, 2023",
//     image: "/api/placeholder/400/200",
//     content: "Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec vel metus ac lacus vehicula euismod.",
//     likes: 301,
//     comments: 89
//   }
// ];

// const BlogPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState(blogPosts);

//   useEffect(() => {
//     // Filter blog posts based on search term
//     const filtered = blogPosts.filter((post) =>
//       post.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPosts(filtered);
//   }, [searchTerm]);

//   return (
//     <div className="blog-page">
//       <div className="blog-page-content">
//         <div className="blog-page-header">
//           <h1 className="blog-page-title">Blog</h1>
//           <div className="blog-page-actions">
//             <div className="blog-page-search">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="blog-page-search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <BiSearch className="blog-page-search-icon" />
//             </div>
//             <button className="blog-page-filter-btn">
//               <BiFilter className="blog-page-filter-icon" />
//               Filter
//             </button>
//           </div>
//         </div>

//         <div className="blog-post-grid">
//           {filteredPosts.map((post) => (
//             <div key={post.id} className="blog-post-card">
//               <img src={post.image} alt={post.title} className="blog-post-image" />
//               <div className="blog-post-content">
//                 <h2 className="blog-post-title">{post.title}</h2>
//                 <div className="blog-post-meta">
//                   <p className="blog-post-author">{post.author}</p>
//                   <span className="blog-post-divider">•</span>
//                   <p className="blog-post-date">{post.date}</p>
//                 </div>
//                 <p className="blog-post-excerpt">{post.content}</p>
//                 <div className="blog-post-actions">
//                   <div className="blog-post-likes">
//                     <FaRegThumbsUp className="blog-post-likes-icon" />
//                     <span className="blog-post-likes-count">{post.likes}</span>
//                   </div>
//                   <div className="blog-post-comments">
//                     <FaRegComment className="blog-post-comments-icon" />
//                     <span className="blog-post-comments-count">{post.comments}</span>
//                   </div>
//                   <button className="blog-post-share-btn">
//                     <FaRegShareSquare className="blog-post-share-icon" />
//                     Share
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;
