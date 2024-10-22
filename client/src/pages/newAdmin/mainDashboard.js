import React, { useState } from 'react';
import '../../styles/components/newAdmin/MainDashboard.css';
import DashboardSidebar from '../../components/newAdmin/DashboardSidebar';
import DashboardNavbar from '../../components/newAdmin/DashboardNavbar';
import DashboardCards from '../../components/newAdmin/DashboardCards';
import StatisticsSection from '../../components/newAdmin/StatisticsSection';
import TopProperties from '../../components/newAdmin/TopProperties';
import ReservationsPieChart from '../../components/newAdmin/ReservationsPieChart';
import RecentSales from '../../components/newAdmin/ResentSales';



function MainDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-dashboard">
      <div className="flex">
        <DashboardSidebar isOpen={isSidebarOpen} />
        <div className="main-content">
          <DashboardNavbar toggleSidebar={toggleSidebar} />
          <div className="dashboard-container">
            <DashboardCards />
            <StatisticsSection />
            <div className="grid">
              <TopProperties />
              <ReservationsPieChart />
              <RecentSales />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
