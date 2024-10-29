import React from 'react';
import '../../../styles/components/home/blogPage/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover the Latest Real Estate Insights</h1>
        <p>Stay updated with the newest trends and market tips.</p>
        <button className="cta-button">Read More</button>
      </div>
      <img src="/images/featured-property.jpg" alt="Featured Property" className="hero-image" />
    </section>
  );
};

export default HeroSection;
