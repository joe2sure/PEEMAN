import React from 'react';
import messageIcon from '../../assets/icons/admin/message-icon.svg'; 
import notificationIcon from '../../assets/icons/admin/notification-icon.svg'; 
import '../../styles/components/admin/DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
      <div className='header-right-items'>
        {/* Message Icon with Badge */}
        <div className="icon-wrapper">
          <img src={messageIcon} alt="Message Icon" className="icon-svg" />
          <span className="badge">3</span> {/* Example badge for new messages */}
        </div>

        {/* Notification Icon with Badge */}
        <div className="icon-wrapper">
          <img src={notificationIcon} alt="Notification Icon" className="icon-svg" />
          <span className="badge">5</span> {/* Example badge for new notifications */}
        </div>

        <div className="user-info">
          <img src="/api/placeholder/40/40" alt="User Avatar" className="avatar" />
          <span className="username">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;



// import React from 'react';
// import { FaBars, FaEnvelope, FaBell } from 'react-icons/fa';
// import '../../styles/components/admin/DashboardHeader.css';

// const DashboardHeader = () => {
//   return (
//     <header className="header">
//       <div className="search-bar">
//         <input type="text" placeholder="Search..." />
//         <button>🔍</button>
//       </div>
//       <div className='header-right-items'>
//         {/* Message Icon with Badge */}
//         <div className="icon-wrapper">
//           <FaEnvelope style={{ fontSize: "4px" }} className="icon" />
//           <span className="badge">3</span> {/* Example with 3 new messages */}
//         </div>
        
//         {/* Notification Icon with Badge */}
//         <div className="icon-wrapper">
//           <FaBell style={{ fontSize: "10px" }} className="icon" />
//           <span className="badge">5</span> {/* Example with 5 new notifications */}
//         </div>
        
//         <div className="user-info">
//           <img src="/api/placeholder/40/40" alt="User Avatar" className="avatar" />
//           <span className="username">John Doe</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;