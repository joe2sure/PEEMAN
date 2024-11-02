import React from 'react';
import '../../../styles/components/home/constructionPage/ConstructionServiceSection.css';

const ConstructionServicesSection = () => {
  return (
    <section id="construction-services" className="construction-services-section">
      <h2>Our Popular Services</h2>
      <div className="construction-services-grid">
        {/* Repeat for each service */}
        <div className="construction-service-card">Office Refurbishment</div>
        <div className="construction-service-card">Flooring Installation</div>
        <div className="construction-service-card">Painting and Decorating</div>
      </div>
    </section>
  );
};

export default ConstructionServicesSection;
