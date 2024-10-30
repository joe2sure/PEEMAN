import React from 'react';
import '../../../styles/components/home/aboutPage/CTASection.css';
import arrowRight from '../../../assets/icons/home/arrow-right.svg';

const CTASection = () => {
  return (
    <section className="aboutPage-cta-section">
      <div className="aboutPage-cta-container">
        <h2>Ready to Find Your Dream Home?</h2>
        <p className='aboutPage-cta-text'>Start your journey with us today</p>
        {/* <button className="aboutPage-cta-button">Get Started</button> */}
        <button className="aboutPage-cta-button">
          Get Started
          <img src={arrowRight} alt="Arrow right" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
