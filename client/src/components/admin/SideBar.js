import React from 'react';
import '../../styles/components/admin/SideBar.css';

const Sidebar = ({ setActiveScreen }) => {
  const menuItems = [
    { title: 'Dashboard', icon: '📊' },
    { title: 'Blogs', icon: '📁' },
    { title: 'Constructions', icon: '🏷️' },
    { title: 'Coupons', icon: '🎟️' },
    { title: 'Posters', icon: '🖼️' },
    { title: 'Notifications', icon: '🔔' },

  ];

  const handleNavigation = (title) => {
    setActiveScreen(title);  // Trigger the state update in AdminScreen
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>Real Estate Dashboard</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.title}>
              <button onClick={() => handleNavigation(item.title)}>
                <span className="icon">{item.icon}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


    // { title: 'Constructions', icon: '🏷️' },
    // { title: 'Coupons', icon: '🎟️' },
    // { title: 'Posters', icon: '🖼️' },
    // { title: 'Notifications', icon: '🔔' },
    // { title: 'SubCategory', icon: '📂' },
    // { title: 'Brands', icon: '🏷️' },
    // { title: 'VariantType', icon: '🔢' },
    // { title: 'Variants', icon: '🔣' },
    // { title: 'Orders', icon: '📦' },