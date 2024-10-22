import React from 'react';
import '../../styles/components/newAdmin/DashboardCards.css';

const DashboardCards = () => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card">
        <h4>Revenue</h4>
        <h2>$75,500</h2>
        <span className="increase">+12%</span>
      </div>
      <div className="dashboard-card">
        <h4>Sold Properties</h4>
        <h2>2358</h2>
        <span className="increase">+10%</span>
      </div>
      <div className="dashboard-card">
        <h4>Available Properties</h4>
        <h2>2358</h2>
        <span className="increase">+5%</span>
      </div>
    </div>
  );
};

export default DashboardCards;
