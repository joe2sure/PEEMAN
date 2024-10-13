import React from 'react';
import '../styles/components/DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
      <div className="user-info">
        <img src="/api/placeholder/40/40" alt="User Avatar" className="avatar" />
        <span className="username">John Doe</span>
      </div>
    </header>
  );
};

export default DashboardHeader;