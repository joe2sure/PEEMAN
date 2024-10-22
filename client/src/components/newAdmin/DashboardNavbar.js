import React from 'react';
import { FaBars, FaEnvelope, FaBell } from 'react-icons/fa';
import '../../styles/components/newAdmin/DashboardNavbar.css';

const DashboardNavbar = ({ toggleSidebar }) => {
  return (
    <div className="dashboard-navbar">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars className="icon" />
      </button>
      <div className="dashboard-navbar-search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="dashboard-navbar-icons">
        <FaEnvelope  className="icon" />
        <FaBell className="icon" />
        <div className="user-info">
          <span>Jay Inspiration</span>
          <img src="https://placehold.co/40x40" alt="User Avatar" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;