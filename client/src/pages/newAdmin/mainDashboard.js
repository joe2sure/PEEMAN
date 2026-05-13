import React, { useState } from 'react';
import '../../styles/components/newAdmin/MainDashboard.css';
import DashboardSidebar from '../../components/newAdmin/DashboardSidebar';
import DashboardNavbar from '../../components/newAdmin/DashboardNavbar';
import DashboardCards from '../../components/newAdmin/DashboardCards';
import StatisticsSection from '../../components/newAdmin/StatisticsSection';
import TopProperties from '../../components/newAdmin/TopProperties';
import ReservationsPieChart from '../../components/newAdmin/ReservationsPieChart';
import RecentSales from '../../components/newAdmin/ResentSales';

// ✅ Correct import — points to where the component actually lives
import AdminTestimonialsScreen from '../../components/admin/testimonials/adminTestimonialsScreen';

// ─── Sub-pages ────────────────────────────────────────────────────────────────
const DashboardHome = () => (
  <div className="dashboard-container">
    <DashboardCards />
    <StatisticsSection />
    <div className="grid">
      <TopProperties />
      <ReservationsPieChart />
      <RecentSales />
    </div>
  </div>
);

// ─── Main dashboard ───────────────────────────────────────────────────────────
function MainDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage]       = useState('dashboard');

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleNavigate = (key) => {
    if (key === 'logout') {
      // dispatch logoutUser() here if needed
      return;
    }
    setActivePage(key);
    setIsSidebarOpen(false); // close on mobile after tap
  };

  // ✅ Rendered as a function call so each navigation
  //    mounts a fresh component instance with clean state.
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'testimonials':
        return <AdminTestimonialsScreen />;
      default:
        return (
          <div style={{ padding: 32, color: '#6b7280', fontSize: 15 }}>
            This section is coming soon.
          </div>
        );
    }
  };

  return (
    <div className="main-dashboard">
      <div className="flex">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          activePage={activePage}
          onNavigate={handleNavigate}
        />
        <div className="main-content">
          <DashboardNavbar toggleSidebar={toggleSidebar} />
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;



// import React, { useState } from 'react';
// import '../../styles/components/newAdmin/MainDashboard.css';
// import DashboardSidebar from '../../components/newAdmin/DashboardSidebar';
// import DashboardNavbar from '../../components/newAdmin/DashboardNavbar';
// import DashboardCards from '../../components/newAdmin/DashboardCards';
// import StatisticsSection from '../../components/newAdmin/StatisticsSection';
// import TopProperties from '../../components/newAdmin/TopProperties';
// import ReservationsPieChart from '../../components/newAdmin/ReservationsPieChart';
// import RecentSales from '../../components/newAdmin/ResentSales';
// import AdminTestimonials from '../../components/newAdmin/AdminTestimonials';

// // ─── Page components map ──────────────────────────────────────────────────────
// const DashboardHome = () => (
//   <div className="dashboard-container">
//     <DashboardCards />
//     <StatisticsSection />
//     <div className="grid">
//       <TopProperties />
//       <ReservationsPieChart />
//       <RecentSales />
//     </div>
//   </div>
// );

// const pageMap = {
//   dashboard: <DashboardHome />,
//   testimonials: <AdminTestimonials />,
//   // Add more pages here as the admin grows
// };

// // ─── Main dashboard ───────────────────────────────────────────────────────────
// function MainDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activePage, setActivePage] = useState('dashboard');

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleNavigate = (key) => {
//     if (key === 'logout') {
//       // Dispatch logout action here if needed
//       return;
//     }
//     setActivePage(key);
//     // Close sidebar on mobile after navigation
//     setIsSidebarOpen(false);
//   };

//   const currentPage = pageMap[activePage] || (
//     <div style={{ padding: 32, color: '#6b7280' }}>
//       This section is coming soon.
//     </div>
//   );

//   return (
//     <div className="main-dashboard">
//       <div className="flex">
//         <DashboardSidebar
//           isOpen={isSidebarOpen}
//           activePage={activePage}
//           onNavigate={handleNavigate}
//         />
//         <div className="main-content">
//           <DashboardNavbar toggleSidebar={toggleSidebar} />
//           {currentPage}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainDashboard;