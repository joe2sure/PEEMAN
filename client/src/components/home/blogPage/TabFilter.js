import React from 'react';
import '../../../styles/components/home/blogPage/TabFilter.css';

const TabsFilter = ({ currentCategory, setCategory }) => {
  const categories = ['All', 'Market', 'Tips', 'Finance', 'Investment'];

  return (
    <div className="tabs-filter">
      {categories.map(category => (
        <button
          key={category}
          className={currentCategory === category ? 'active' : ''}
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TabsFilter;