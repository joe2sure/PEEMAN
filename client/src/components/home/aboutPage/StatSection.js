import React from 'react';
import '../../../styles/components/home/aboutPage/StatSection.css';
import statImage from '../../../assets/images/home/property-image.svg';

const StatsSection = () => {
  return (
    <section className="about-stats-section">
      <div className="about-container about-stats-grid">
        <div className="about-stats-image">
          <img 
            src={statImage}
            alt="Modern building"
          />
        </div>
        <div className="about-stats-content">
          <h2>Excellence in Real Estate Services</h2>
          <p>We're committed to providing exceptional service and guidance throughout your real estate journey.</p>
          <div className="about-stats-numbers">
            <div className="about-stat-item">
              <h3>15k+</h3>
              <p>Properties Listed</p>
            </div>
            <div className="about-stat-item">
              <h3>8k+</h3>
              <p>Satisfied Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;