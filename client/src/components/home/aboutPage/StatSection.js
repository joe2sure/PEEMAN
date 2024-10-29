import React from 'react';
import '../../../styles/components/home/aboutPage/StatSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container stats-grid">
        <div className="stats-image">
          <img 
            src="/api/placeholder/400/300"
            alt="Modern building"
          />
        </div>
        <div className="stats-content">
          <h2>Excellence in Real Estate Services</h2>
          <p>We're committed to providing exceptional service and guidance throughout your real estate journey.</p>
          <div className="stats-numbers">
            <div className="stat-item">
              <h3>15k+</h3>
              <p>Properties Listed</p>
            </div>
            <div className="stat-item">
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