import React from 'react';
import '../../styles/components/newAdmin/ReservationsPieChart.css';

const ReservationsPieChart = () => {
  return (
    <div className="reservations-pie-chart">
      <h4>Reservations</h4>
      <img src="https://placehold.co/300x300" alt="Reservations Pie Chart" />
      <div className="reservation-details">
        <div>
          <span className="pending">Pending</span>
          <span>£4500</span>
        </div>
        <div>
          <span className="resolved">Resolved</span>
          <span>£4500</span>
        </div>
        <div>
          <span className="cancelled">Cancelled</span>
          <span>£4500</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPieChart;