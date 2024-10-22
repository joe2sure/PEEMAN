import React from 'react';
import '../../styles/components/admin/DashboardStatisticsCard.css';

const DashboardStatisticsCard = () => {
  return (
    <div className="statistics-section">
      <h4>Statistics</h4>
      <div className="statistics-graph">
        <img src="https://placehold.co/700x250" alt="Statistics" />
      </div>
    </div>
  );
};

export default DashboardStatisticsCard;
