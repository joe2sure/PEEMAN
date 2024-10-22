import React from 'react';
import '../../styles/components/newAdmin/TopProperties.css';

const TopProperties = () => {
  return (
    <div className="top-properties">
      <h4>Top Properties</h4>
      <ul>
        <li>
          <div className="property-info">
            <img src="https://placehold.co/50x50" alt="Property" />
            <div>
              <h5>Suburban Modern Duplex</h5>
              <span>Sold</span>
            </div>
          </div>
          <span>£450,000</span>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </div>
  );
};

export default TopProperties;
