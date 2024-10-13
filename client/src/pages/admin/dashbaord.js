import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { fetchProperties, addNewProperty, updateExistingProperty, deleteExistingProperty } from '../../redux/actions/propertyActions.js';
import Spinner from '../../utility/Spinner.js';
import Toaster from '../../utility/Toaster.js';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);
  
  const [newProperty, setNewProperty] = useState({
    name: '',
    description: '',
    location: '',
    price: 0,
    beds: 0,
    baths: 0,
    isOffer: false,
    furnished: false,
    propertyType: '',
  });
  
  const [editingProperty, setEditingProperty] = useState(null);
  const [toaster, setToaster] = useState(null);

  useEffect(() => {
    dispatch(fetchProperties());
    // setToaster(null); 
  }, [dispatch]);

  const handleInputChange = (e, property = newProperty) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'checkbox' ? e.target.checked : value;

    if (property === newProperty) {
      setNewProperty({ ...property, [name]: updatedValue });
    } else {
      setEditingProperty({ ...property, [name]: updatedValue });
    }
  };

  const handleFileChange = (e, property = newProperty) => {
    const { name, files } = e.target;
    if (files) {
      const fileList = Array.from(files);
      if (property === newProperty) {
        setNewProperty({ ...property, [name]: fileList });
      } else {
        setEditingProperty({ ...property, [name]: fileList });
      }
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newProperty).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });

    const result = await dispatch(addNewProperty(formData));
    if (result.success) {
      setNewProperty({
        name: '',
        description: '',
        location: '',
        price: 0,
        beds: 0,
        baths: 0,
        isOffer: false,
        furnished: false,
        propertyType: '',
      });
      setToaster({ message: 'Property added successfully', type: 'success' });
    } else {
      setToaster({ message: result.message || 'Failed to add property', type: 'error' });
    }
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    if (!editingProperty) return;

    const formData = new FormData();
    Object.entries(editingProperty).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });

    const result = await dispatch(updateExistingProperty(editingProperty.id, formData));
    if (result.success) {
      setEditingProperty(null);
      setToaster({ message: 'Property updated successfully', type: 'success' });
    } else {
      setToaster({ message: result.message || 'Failed to update property', type: 'error' });
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const result = await dispatch(deleteExistingProperty(id));
      if (result.success) {
        setToaster({ message: 'Property deleted successfully', type: 'success' });
      } else {
        setToaster({ message: result.message || 'Failed to delete property', type: 'error' });
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="property-form">
        <h2>Add New Property</h2>
        <form onSubmit={handleAddProperty}>
          <input
            type="text"
            name="name"
            value={newProperty.name}
            onChange={handleInputChange}
            placeholder="Property Name"
            required
          />
          <textarea
            name="description"
            value={newProperty.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="location"
            value={newProperty.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <input
            type="number"
            name="price"
            value={newProperty.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="beds"
            value={newProperty.beds}
            onChange={handleInputChange}
            placeholder="Number of Beds"
            required
          />
          <input
            type="number"
            name="baths"
            value={newProperty.baths}
            onChange={handleInputChange}
            placeholder="Number of Baths"
            required
          />
          <label>
            <input
              type="checkbox"
              name="isOffer"
              checked={newProperty.isOffer}
              onChange={handleInputChange}
            />
            Is Offer
          </label>
          {newProperty.isOffer && (
            <input
              type="number"
              name="discount"
              value={newProperty.discount}
              onChange={handleInputChange}
              placeholder="Discount"
            />
          )}
          <label>
            <input
              type="checkbox"
              name="furnished"
              checked={newProperty.furnished}
              onChange={handleInputChange}
            />
            Furnished
          </label>
          <select
            name="propertyType"
            value={newProperty.propertyType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            required
          />
          <input
            type="file"
            name="videos"
            onChange={handleFileChange}
            multiple
            accept="video/*"
          />
          <button type="submit">Add Property</button>
        </form>
      </div>

      <div className="property-list">
        <h2>Property List</h2>
        {properties.map((property) => (
          <div key={property.id} className="property-item">
            {editingProperty && editingProperty.id === property.id ? (
              <form onSubmit={handleUpdateProperty}>
                <input
                  type="text"
                  name="name"
                  value={editingProperty.name}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                />
                <textarea
                  name="description"
                  value={editingProperty.description}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={editingProperty.location}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editingProperty.price}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                />
                <input
                  type="number"
                  name="beds"
                  value={editingProperty.beds}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                />
                <input
                  type="number"
                  name="baths"
                  value={editingProperty.baths}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                />
                <label>
                  <input
                    type="checkbox"
                    name="isOffer"
                    checked={editingProperty.isOffer}
                    onChange={(e) => handleInputChange(e, editingProperty)}
                  />
                  Is Offer
                </label>
                {editingProperty.isOffer && (
                  <input
                    type="number"
                    name="discount"
                    value={editingProperty.discount}
                    onChange={(e) => handleInputChange(e, editingProperty)}
                    placeholder="Discount"
                  />
                )}
                <label>
                  <input
                    type="checkbox"
                    name="furnished"
                    checked={editingProperty.furnished}
                    onChange={(e) => handleInputChange(e, editingProperty)}
                  />
                  Furnished
                </label>
                <select
                  name="propertyType"
                  value={editingProperty.propertyType}
                  onChange={(e) => handleInputChange(e, editingProperty)}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
                <input
                  type="file"
                  name="images"
                  onChange={(e) => handleFileChange(e, editingProperty)}
                  multiple
                  accept="image/*"
                />
                <input
                  type="file"
                  name="videos"
                  onChange={(e) => handleFileChange(e, editingProperty)}
                  multiple
                  accept="video/*"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingProperty(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h3>{property.name}</h3>
                <p>Location: {property.location}</p>
                <p>Price: ${property.price}</p>
                <p>Type: {property.propertyType}</p>
                <p>Beds: {property.beds}</p>
                <p>Baths: {property.baths}</p>
                <p>Furnished: {property.furnished ? 'Yes' : 'No'}</p>
                {property.isOffer && <p>Discount: ${property.discount}</p>}
                <div className="property-actions">
                  <button onClick={() => setEditingProperty(property)}>Edit</button>
                  <button onClick={() => handleDeleteProperty(property.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {toaster && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={() => setToaster(null)}
        />
      )}
    </div>
  );
}
