import React, { useState } from 'react';
import '../../styles/components/admin/PropertyListSection.css';

const PropertyListSection = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: 'Luxury Villa', category: 'Residential', subCategory: 'Villa', price: 500000 },
    { id: 2, name: 'Downtown Apartment', category: 'Residential', subCategory: 'Apartment', price: 250000 },
    { id: 3, name: 'Commercial Space', category: 'Commercial', subCategory: 'Office', price: 750000 },
  ]);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Edit property with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <div className="property-list-section">
      <div className="section-header">
        <h2>All Properties</h2>
        <button className="add-property-btn">Add New Property</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>{property.category}</td>
              <td>{property.subCategory}</td>
              <td>${property.price.toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(property.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(property.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyListSection;