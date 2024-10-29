import React from 'react';
import { propertiesData } from '../../../assets/data/aboutPageData';
import '../../../styles/components/home/aboutPage/PropertiesSection.css';

const PropertiesSection = () => {
  return (
    <section className="properties">
      <h2>We Help You To Make Better Deals</h2>
      <p>Find the perfect property that matches your needs</p>
      <div className="properties-grid">
        {propertiesData.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <div className="property-content">
              <h3>{property.title}</h3>
              <p className="price">${property.price}</p>
              <div className="property-details">
                <span>{property.beds} Beds</span>
                <span>{property.baths} Baths</span>
                <span>{property.sqft} sqft</span>
              </div>
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesSection;