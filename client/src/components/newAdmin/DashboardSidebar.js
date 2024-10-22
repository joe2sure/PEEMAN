import React from 'react';
import { FaHome, FaBuilding, FaInfoCircle, FaPlusCircle, FaProjectDiagram, FaEnvelope, FaFileAlt, FaBell, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/components/newAdmin/DashboardSidebar.css';

const DashboardSidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-logo">
        <img src="https://placehold.co/150x50" alt="Logo" />
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <FaHome className="icon" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <FaBuilding className="icon" />
          <span>Properties</span>
        </a>
        <a href="#" className="nav-item">
          <FaInfoCircle className="icon" />
          <span>Property Details</span>
        </a>
        <a href="#" className="nav-item">
          <FaPlusCircle className="icon" />
          <span>Add Properties</span>
        </a>
        <a href="#" className="nav-item">
          <FaProjectDiagram className="icon" />
          <span>Project</span>
        </a>
        <a href="#" className="nav-item">
          <FaEnvelope className="icon" />
          <span>Contact</span>
        </a>
        <a href="#" className="nav-item">
          <FaFileAlt className="icon" />
          <span>File Manager</span>
        </a>
        <a href="#" className="nav-item">
          <FaBell className="icon" />
          <span>Notifications</span>
        </a>
        <a href="#" className="nav-item">
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </a>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
