import React from 'react';
import '../../styles/pages/admin/dashboardScreen.css';
import PropertySummaryCard from '../../components/admin/PropertySummaryCard';
import PropertyListSection from '../../components/admin/PropertyListSection';
import OrderDetailsSection from '../../components/admin/OrderDetailsSection';

const DashboardScreen = () => {
  const propertySummaryItems = [
    {
      title: "All Properties",
      propertyCount: 100,
      icon: "🏠",
      color: "#2697FF",
      percentage: 100,
    },
    {
      title: "Out of Stock",
      propertyCount: 10,
      icon: "🚫",
      color: "#EA3829",
      percentage: 10,
    },
    {
      title: "Limited Stock",
      propertyCount: 20,
      icon: "⚠️",
      color: "#ECBE23",
      percentage: 20,
    },
    {
      title: "Other Stock",
      propertyCount: 70,
      icon: "✅",
      color: "#47e228",
      percentage: 70,
    },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="property-summary-grid">
        {propertySummaryItems.map((item, index) => (
          <PropertySummaryCard key={index} info={item} /> 
        ))}
      </div>
      <div className="dashboard-content">
        <PropertyListSection />
        <OrderDetailsSection />
      </div>
    </div>
  );
};

export default DashboardScreen;
