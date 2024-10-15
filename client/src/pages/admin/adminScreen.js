import React, { useState } from 'react';


import '../../App.css';
import DashboardScreen from './dashboardScreen.js';
import OrderDetailsSection from '../../components/admin/OrderDetailsSection.js';
import Sidebar from '../../components/admin/SideBar.js';
import DashboardHeader from '../../components/admin/DashboardHeader.js';

const AdminScreen = () => {
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return <DashboardScreen />;
        case 'Orders':
          return <OrderDetailsSection />;
      //   case 'Posters':
      //     return <Posters />;
      //   case 'Notifications':
      //     return <Notifications />;
      //   default:
      //     return <DashboardScreen />;
      //   case 'Coupons':
      //     return <Coupons />;
      // case 'Category':
      //   return <Category />;
      // case 'SubCategory':
      //   return <SubCategory />;
      // case 'Brands':
      //   return <Brands />;
      // case 'VariantType':
      //   return <VariantType />;
      // case 'Variants':
      //   return <Variants />;
    }
  };

  return (
    <div className="admin">
      <Sidebar setActiveScreen={setActiveScreen} />
      <div className="admin-main-content">
        <DashboardHeader />
        <main>{renderScreen()}</main>
      </div>
    </div>
  );
};

export default AdminScreen;


// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import Category from './components/Category';
// import SubCategory from './components/SubCategory';
// import Brands from './components/Brands';
// import VariantType from './components/VariantType';
// import Variants from './components/Variants';
// import Orders from './components/Orders';
// import Coupons from './components/Coupons';
// import Posters from './components/Posters';
// import Notifications from './components/Notifications';