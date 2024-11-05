import React from 'react';
import '../../../styles/components/home/blogPage/BlogFilterBanner.css';
import BlogFilterBannerImg from '../../../assets/images/home/property-image.svg';

const BlogFilterBanner = () => {
  return (
    <div className="blog-banner">
      <div className="blog-banner-content">
        <div className="blog-banner-text">
          <h2>Find Your Dream Home</h2>
          <p>Explore our curated selection of premium properties and expert real estate advice</p>
          <button className="blog-banner-button">Explore Properties</button>
        </div>
        <div className="blog-banner-image">
          <img src={BlogFilterBannerImg} alt="Modern home interior" />
        </div>
      </div>
    </div>
  );
};

export default BlogFilterBanner;