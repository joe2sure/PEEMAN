import React from 'react';
import '../../../styles/components/home/aboutPage/HeroSection.css';
import arrowRight from '../../../assets/icons/home/arrow-right.svg';

const HeroSection = () => {
  return (
    <section className="about-hero">
      <div className="about-hero-overlay"></div>
      <div className="about-hero-content">
        <h1>Trusted Real Estate Property For You</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
        {/* <button className="about-btn-primary">Contact Now</button> */}
        <button className="about-cta-button">
          Contact Now
          <img src={arrowRight} alt="Arrow right" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;