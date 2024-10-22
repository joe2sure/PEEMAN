import React from 'react';
import '../../styles/components/admin/PropertySummaryCard.css';
import houseIcon from '../../assets/icons/admin/house-icon.svg';
import revenueIcon from '../../assets/icons/admin/revenue-icon.svg';
import soldPropertyIcon from '../../assets/icons/admin/sold-properties-icon.svg';
import availablePropertyIcon from '../../assets/icons/admin/available-properties-icon.svg';

const iconMap = {
  'house-icon.svg': houseIcon,
  'revenue-icon.svg': revenueIcon,
  'sold-icon.svg': soldPropertyIcon,
  'available-icon.svg': availablePropertyIcon,
};

const PropertySummaryCard = ({ info }) => {
  return (
    <div className="property-summary-card">
      <div className="card-header">
        <div className="icon-wrapper" style={{ backgroundColor: info.color }}>
          <img src={iconMap[info.icon]} alt={info.title} className="icon-svg" />
        </div>
        <span className="more-icon">⋮</span>
      </div>
      <h3>{info.title}</h3>

      <div className="card-numbers">
        <span className="property-count">{info.propertyCount}</span>

        {/* If the percentage is defined, show the percentage container */}
        {info.percentage && (
          <div className="percentage-container">
            <span className="percentage">{info.percentage}</span>
          </div>
        )}
      </div>

      <p>{info.title === "All Properties"}</p>
    </div>
  );
};


export default PropertySummaryCard;





// import React from 'react';
// import '../../styles/components/admin/PropertySummaryCard.css';

// const PropertySummaryCard = ({ info }) => {
//   // console.log(info); 
//   return (
//     <div className="property-summary-card" style={{ '--card-color': info.color }}>
//       <div className="card-header">
//         <span className="icon">{info.icon}</span>
//         <span className="more-icon">⋮</span>
//       </div>
//       <h3>{info.title}</h3>
//       <div className="progress-bar">
//         <div className="progress" style={{ width: `${info.percentage}%` }}></div>
//       </div>
//       <p>{info.propertyCount} Properties</p>
//     </div>
//   );
// };

// export default PropertySummaryCard;