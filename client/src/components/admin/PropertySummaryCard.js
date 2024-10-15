
import React from 'react';
import '../../styles/components/admin/PropertySummaryCard.css';

const PropertySummaryCard = ({ info }) => {
  // console.log(info); 
  return (
    <div className="property-summary-card" style={{ '--card-color': info.color }}>
      <div className="card-header">
        <span className="icon">{info.icon}</span>
        <span className="more-icon">⋮</span>
      </div>
      <h3>{info.title}</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${info.percentage}%` }}></div>
      </div>
      <p>{info.propertyCount} Properties</p>
    </div>
  );
};

export default PropertySummaryCard;