import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../styles/components/OrderDetailsSection.css';

const OrderDetailsSection = () => {
  const orderData = [
    { name: 'Pending', value: 10, color: '#FFCF26' },
    { name: 'Processing', value: 15, color: '#FFFFFF' },
    { name: 'Cancelled', value: 5, color: '#EE2727' },
    { name: 'Shipped', value: 20, color: '#2697FF' },
    { name: 'Delivered', value: 50, color: '#26FF31' },
  ];

  const totalOrders = orderData.reduce((sum, item) => sum + item.value, 0);

  const renderOrderInfoCard = (icon, title, value) => (
    <div className="order-info-card">
      <span className="icon">{icon}</span>
      <div className="info">
        <h4>{title}</h4>
        <p>{value} Orders</p>
      </div>
    </div>
  );

  return (
    <div className="order-details-section">
      <h2>Orders Details</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={orderData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {orderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="total-orders">{totalOrders}</div>
      </div>
      {renderOrderInfoCard('📦', 'All Orders', totalOrders)}
      {orderData.map((item) => renderOrderInfoCard('🔔', item.name + ' Orders', item.value))}
    </div>
  );
};

export default OrderDetailsSection;