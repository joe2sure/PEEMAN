import React from 'react';
import { Home, Building, Warehouse, Hotel } from 'lucide-react';
import '../../../styles/components/home/blogPage/BlogPropertyCategorySection.css';

const BlogPropertyCategorySection = () => {
  const categories = [
    {
      icon: <Home size={32} />,
      title: "Residential",
      properties: "2,345",
      growth: "+12%",
      description: "Single family homes & apartments"
    },
    {
      icon: <Building size={32} />,
      title: "Commercial",
      properties: "1,278",
      growth: "+8%",
      description: "Office spaces & retail units"
    },
    {
      icon: <Warehouse size={32} />,
      title: "Industrial",
      properties: "892",
      growth: "+15%",
      description: "Warehouses & factories"
    },
    {
      icon: <Hotel size={32} />,
      title: "Vacation",
      properties: "1,156",
      growth: "+18%",
      description: "Holiday homes & resorts"
    }
  ];

  return (
    <div className="blog-property-categories">
      <div className="categories-header">
        <h2>Explore Property Categories</h2>
        <p>Find the perfect property type for your needs</p>
      </div>
      <div className="blog-categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="blog-category-card">
            <div className="blog-category-icon">
              {category.icon}
            </div>
            <h3>{category.title}</h3>
            <div className="blog-category-stats">
              <span className="blog-property-count">{category.properties} listings</span>
              <span className="blog-growth-rate">{category.growth} this month</span>
            </div>
            <p className="blog-category-description">{category.description}</p>
            <button className="blog-category-button">View Listings</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPropertyCategorySection;