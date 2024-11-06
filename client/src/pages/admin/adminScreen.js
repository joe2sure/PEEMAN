import React, { useState } from 'react';
import '../../App.css'
import DashboardScreen from './dashboardScreen.js';
import Sidebar from '../../components/admin/SideBar.js';
import DashboardHeader from '../../components/admin/DashboardHeader.js';
import PropertyReservationSection from '../../components/admin/PropertyReservationSection.js';
import AdminBlogScreen from '../../components/admin/blog/adminBlogScreen.js';
import AdminConstructionScreen from '../../components/admin/construction/adminConstructionScreen.js';
// import AdminBlogScreen from '../../components/admin/blog/AdminBlogScreen.js';


const AdminScreen = () => {
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'Orders':
        return <PropertyReservationSection />;
      case 'Blogs':
        return <AdminBlogScreen title='Blogs'  />;
      case 'Constructions':
        return <AdminConstructionScreen title='Constructions'  />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="admin">
      <Sidebar setActiveScreen={setActiveScreen} />
      <div className="admin-main-content">
        <DashboardHeader />
        <main className="admin-screen-main">{renderScreen()}</main>
      </div>
    </div>
  );
};

export default AdminScreen;




// import React, { useState } from 'react';
// import '../../App.css';
// import DashboardScreen from './dashboardScreen.js';
// import Sidebar from '../../components/admin/SideBar.js';
// import DashboardHeader from '../../components/admin/DashboardHeader.js';
// import PropertyReservationSection from '../../components/admin/PropertyReservationSection.js';
// // import OrderDetailsSection from '../../components/admin/PropertyReservationSection.js';

// const AdminScreen = () => {
//   const [activeScreen, setActiveScreen] = useState('Dashboard');

//   const renderScreen = () => {
//     switch (activeScreen) {
//       case 'Dashboard':
//         return <DashboardScreen />;
//         case 'Orders':
//           return < PropertyReservationSection />;
//       //   case 'Posters':
//       //     return <Posters />;
//       //   case 'Notifications':
//       //     return <Notifications />;
//       //   default:
//       //     return <DashboardScreen />;
//       //   case 'Coupons':
//       //     return <Coupons />;
//       // case 'Category':
//       //   return <Category />;
//       // case 'SubCategory':
//       //   return <SubCategory />;
//       // case 'Brands':
//       //   return <Brands />;
//       // case 'VariantType':
//       //   return <VariantType />;
//       // case 'Variants':
//       //   return <Variants />;
//     }
//   };

//   return (
//     <div className="admin">
//       <Sidebar setActiveScreen={setActiveScreen} />
//       <div className="admin-main-content">
//         <DashboardHeader />
//         <main>{renderScreen()}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminScreen;