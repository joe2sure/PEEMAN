import React from 'react';
import '../../styles/components/admin/DashboardStatisticsCard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DashboardStatisticsCard = () => {
  // Sample data for the chart
  const data = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2800 },
    { name: 'Apr', value: 2400 },
    { name: 'May', value: 2400 },
    { name: 'Jun', value: 3200 },
  ];

  return (
    <div className="admin-dashboard-statistics-section">
      <h4>Statistics</h4>
      <div className="admin-dashboard-statistics-graph">
        <LineChart width={700} height={250} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default DashboardStatisticsCard;


// import React from 'react';
// import '../../styles/components/admin/DashboardStatisticsCard.css';

// const DashboardStatisticsCard = () => {
//   return (
//     <div className="statistics-section">
//       <h4>Statistics</h4>
//       <div className="statistics-graph">
//         <img src="https://placehold.co/700x250" alt="Statistics" />
//       </div>
//     </div>
//   );
// };

// export default DashboardStatisticsCard;