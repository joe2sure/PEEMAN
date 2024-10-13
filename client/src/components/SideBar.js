import React from 'react';
import '../styles/components/Sidebar.css';

const Sidebar = ({ setActiveScreen }) => {
  const menuItems = [
    { title: 'Dashboard', icon: '📊' },
    { title: 'Category', icon: '📁' },
    { title: 'SubCategory', icon: '📂' },
    { title: 'Brands', icon: '🏷️' },
    { title: 'VariantType', icon: '🔢' },
    { title: 'Variants', icon: '🔣' },
    { title: 'Orders', icon: '📦' },
    { title: 'Coupons', icon: '🎟️' },
    { title: 'Posters', icon: '🖼️' },
    { title: 'Notifications', icon: '🔔' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>Real Estate Dashboard</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.title}>
              <button onClick={() => setActiveScreen(item.title)}>
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