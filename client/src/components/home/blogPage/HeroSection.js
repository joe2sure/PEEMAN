import React from 'react';
import '../../../styles/components/home/blogPage/HeroSection.css';
import propertyImage from '../../../assets/images/home/property-image.svg'

const HeroSection = () => {
  return (
    <section className="blog-hero-section">
      <div className="blog-hero-content">
        <h1>Discover the Latest Real Estate Insights</h1>
        <p>Stay updated with the newest trends and market tips.</p>
        <button className="blog-cta-button">Read More</button>
      </div>
      <img src={propertyImage} alt="blog-Featured Property" className="blog-hero-image" />
    </section>
  );
};

export default HeroSection;