import React from 'react';
import '../../styles/components/newAdmin/RecentSales.css';

const RecentSales = () => {
  return (
    <div className="recent-sales">
      <h4>Recent Sales</h4>
      <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Suburban Modern Duplex</td>
            <td>For Rent</td>
            <td>£4500/mo</td>
            <td><span className="complete">Complete</span></td>
            <td><i className="icon">...</i></td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSales;
