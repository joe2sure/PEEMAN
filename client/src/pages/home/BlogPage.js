import React, { useState } from "react";
import "../../styles/pages/home/BlogPage.css";
import TabsFilter from "../../components/home/blogPage/TabFilter";
import BlogCard from "../../components/home/blogPage/BlogCard";
import Pagination from "../../components/home/blogPage/Pagination";
import { FaSearch, FaCandyCane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import BlogSidebar from "./Sidebar";
import BlogHeroSection from "../../components/home/blogPage/HeroSection";
import BlogFilterBanner from "../../components/home/blogPage/BlogFilterBanner";
import BlogPropertyCategorySection from "../../components/home/blogPage/BlogPropertyCategorySection";
// import Sidebar from '../../components/home/blogPage/Sidebar';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
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
      id: 4,
      title: "Top 5 Real Estate Trends to Watch in 2024/2025",
      author: "John Doe",
      date: "April 15, 2024",
      image: require("../../assets/images/home/property-image.svg").default,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      likes: 245,
      comments: 68
    },
    {
      id: 5,
      title: "How to Increase Your Home's Value Before Selling",
      author: "Jane Smith",
      date: "March 28, 2024",
      image: require("../../assets/images/home/property-image.svg").default,
      content: "Donec vel metus ac lacus vehicula euismod. Sed ut risus in augue luctus venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      likes: 189,
      comments: 42
    },
    {
      id: 6,
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

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle search toggle
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }
  };

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="blog-page">
      <BlogHeroSection />

      <div className="blog-content-wrapper">
        <div className="blog-filter-header">
          <TabsFilter
            currentCategory={currentCategory}
            setCategory={setCategory}
          />
          <div className="blog-header-icons">
          <div className={`blog-search-container ${isSearchActive ? 'blog-active' : ''}`}>
              {isSearchActive && (
                <input
                  id="search-input"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search blogs..."
                  className="blog-search-input"
                />
              )}
              <button className="blog-icon-button" onClick={toggleSearch}>
                {isSearchActive ? (
                  <IoMdClose className="blog-search-icon" />
                ) : (
                  <FaSearch className="blog-search-icon" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="blog-main-content">
          <div className="blog-content">
          <BlogFilterBanner/>
          <BlogPropertyCategorySection/>
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