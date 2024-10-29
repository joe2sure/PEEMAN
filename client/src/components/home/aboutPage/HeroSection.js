import React from 'react';
import '../../../styles/components/home/aboutPage/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Trusted Real Estate Property For You</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <button className="btn-primary">Contact Now</button>
      </div>
    </section>
  );
};

export default HeroSection;