import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../../styles/pages/admin/dashboardScreen.css';
import PropertySummaryCard from '../../components/admin/PropertySummaryCard';
import PropertyListSection from '../../components/admin/PropertyListSection';
import PropertyReservationSection from '../../components/admin/PropertyReservationSection';

import refreshIcon from '../../assets/icons/admin/refresh-icon.svg';
import datePickerIcon from '../../assets/icons/admin/date-picker-icon.svg';  
import DashboardStatisticsCard from '../../components/admin/DashboardStatisticsCard';


const DashboardScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Add your refresh logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      // Refresh your data here
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
    // Add your date change logic here
  };


  const propertySummaryItems = [
    {
      title: "All Properties",
      propertyCount: 4476,  // Total number of properties
      icon: 'house-icon.svg',  
      color: "#DDE1FF",
    },
    {
      title: "Revenue",
      propertyCount: "£75,500",  // Revenue value
      percentage: "+10%",  // Percentage change
      icon: 'revenue-icon.svg',  
      color: "#DDE1FF",
    },
    {
      title: "Sold Properties",
      propertyCount: 2358,  // Number of sold properties
      percentage: "+5%",  // Percentage change
      icon: 'sold-icon.svg',  
      color: "#FFE6CC",
    },
    {
      title: "Available Properties",
      propertyCount: 1034,  // Number of available properties
      icon: 'available-icon.svg',  
      color: "#DAFEFF",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-header-right">
        <img 
              src={refreshIcon} 
              alt="Refresh" 
              className="dashboard-refresh-icon"
              onClick={handleRefresh}
            />
            <div className="date-picker-container">
              <button 
                className="dashboard-date-picker-btn"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <img src={datePickerIcon} alt="Date Picker" className="dashboard-date-picker-icon" />
                {selectedDate.toLocaleDateString()}
              </button>
              {isDatePickerOpen && (
                <div className="date-picker-popup">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                  />
                </div>
              )}
            </div>
        </div>
      </div>

      <div className="dashboard-property-summary-grid">
        {propertySummaryItems.map((item, index) => (
          <PropertySummaryCard key={index} info={item} />
        ))}
      </div>
      <div className="dashboard-content">
        <PropertyListSection />
        <PropertyReservationSection />
      </div>
      <DashboardStatisticsCard/>
    </div>
  );
};

export default DashboardScreen;





// import React from 'react';
// import '../../styles/pages/admin/dashboardScreen.css';
// import PropertySummaryCard from '../../components/admin/PropertySummaryCard';
// import PropertyListSection from '../../components/admin/PropertyListSection';
// import OrderDetailsSection from '../../components/admin/OrderDetailsSection';

// const DashboardScreen = () => {
//   const propertySummaryItems = [
//     {
//       title: "All Properties",
//       propertyCount: 100,
//       icon: "🏠",
//       color: "#2697FF",
//       percentage: 100,
//     },
//     {
//       title: "Revenue",
//       propertyCount: 10,
//       icon: "🚫",
//       color: "#EA3829",
//       percentage: 10,
//     },
//     {
//       title: "Sold Properties",
//       propertyCount: 20,
//       icon: "⚠️",
//       color: "#ECBE23",
//       percentage: 20,
//     },
//     {
//       title: "Available Properties",
//       propertyCount: 70,
//       icon: "✅",
//       color: "#47e228",
//       percentage: 70,
//     },
//   ];

//   return (
//     <div className="dashboard">
//       <h2>Dashboard</h2>
//       <div className="property-summary-grid">
//         {propertySummaryItems.map((item, index) => (
//           <PropertySummaryCard key={index} info={item} /> 
//         ))}
//       </div>
//       <div className="dashboard-content">
//         <PropertyListSection />
//         <OrderDetailsSection />
//       </div>
//     </div>
//   );
// };

// export default DashboardScreen;
