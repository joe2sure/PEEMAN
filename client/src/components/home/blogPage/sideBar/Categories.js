import React from 'react';
import '../../../../styles/components/home/blogPage/sideBar/Categories.css';

const Categories = ({ categories }) => (
  <div className="blog-widget">
    <h3 className="blog-widget-title">Categories</h3>
    <div className="blog-categories-list">
      {categories.map(category => (
        <div key={category.name} className="blog-category-item">
          <span className="blog-category-name">{category.name}</span>
          <span className="blog-category-count">{category.count}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Categories;