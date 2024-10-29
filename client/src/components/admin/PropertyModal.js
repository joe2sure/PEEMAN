import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProperty, fetchProperties, updateExistingProperty } from '../../redux/actions/propertyActions';
import Spinner from '../../utility/Spinner';
import Toaster from '../../utility/Toaster';
import '../../styles/components/admin/PropertyModal.css';
import modalLogo from '../../assets/peeman-logo.svg';

const PropertyModal = ({ isEditing, property, onClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    beds: '',
    baths: '',
    isOffer: false,
    discount: '',
    furnished: false,
    propertyType: '',
    category: '',
    images: [],
    videos: []
  });

  useEffect(() => {
    if (isEditing && property) {
      setFormValues(property);
    }
  }, [isEditing, property]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files) {
      const fileList = Array.from(files);
      setFormValues(prev => ({
        ...prev,
        images: fileList  // Store the actual File objects
      }));
    }
  };

// Format category from propertyType
const formatCategory = (type) => {
  if (!type) return '';
  // Split by space and capitalize each word
  return type.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

  // Updated handlePropertyTypeChange
  const handlePropertyTypeChange = (e) => {
    const { value } = e.target;
    setFormValues(prev => ({
      ...prev,
      propertyType: value,
      category: formatCategory(value) // Format category when propertyType changes
    }));
  };

  // const handlePropertyTypeChange = (e) => {
  //   const { value } = e.target;
  //   setFormValues(prev => ({
  //     ...prev,
  //     propertyType: value,
  //     category: value.charAt(0).toUpperCase() + value.slice(1)
  //   }));
  // };


  const handleToggle = (field) => {
    setFormValues(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!formValues.name || !formValues.description || !formValues.location || !formValues.propertyType) {
      setToaster({ 
        message: 'Please fill in all required fields', 
        type: 'error' 
      });
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    
    // Properly append form fields as strings
    Object.entries(formValues).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'videos' && value !== undefined) {
        if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        }
        else if (typeof value === 'number') {
          formData.append(key, value.toString());
        }
        else if (Array.isArray(value)) {
          formData.append(key, value.join(','));
        }
        else {
          formData.append(key, String(value));
        }
      }
    });

    // Handle image files separately
    if (formValues.images && formValues.images.length > 0) {
      formValues.images.forEach(file => {
        formData.append('media', file);
      });
    }
  
    try {
      const action = isEditing ? 
        updateExistingProperty(property.id, formData) : 
        addNewProperty(formData);
      
      const result = await dispatch(action);
      
      // Show success toaster immediately
      setToaster({ 
        message: `Property ${isEditing ? 'updated' : 'added'} successfully`, 
        type: 'success' 
      });

      // Refresh the property list
      await dispatch(fetchProperties());

      // Close modal after toaster appears
      setTimeout(() => {
        onClose();
      }, 2000); // Increased delay to ensure toaster is visible

    } catch (error) {
      setToaster({ 
        message: error.message || 'An error occurred', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   // Client-side validation
  //   if (!formValues.name || !formValues.description || !formValues.location || !formValues.propertyType) {
  //     setToaster({ 
  //       message: 'Please fill in all required fields', 
  //       type: 'error' 
  //     });
  //     setLoading(false);
  //     return;
  //   }
  
  //   const formData = new FormData();
    
  //   // Properly append form fields as strings
  //   Object.entries(formValues).forEach(([key, value]) => {
  //     if (key !== 'images' && key !== 'videos' && value !== undefined) {
  //       // Convert boolean values to strings
  //       if (typeof value === 'boolean') {
  //         formData.append(key, value.toString());
  //       }
  //       // Convert numbers to strings
  //       else if (typeof value === 'number') {
  //         formData.append(key, value.toString());
  //       }
  //       // Handle arrays (if any)
  //       else if (Array.isArray(value)) {
  //         formData.append(key, value.join(','));
  //       }
  //       // Handle regular strings
  //       else {
  //         formData.append(key, String(value));
  //       }
  //     }
  //   });

  //   // Handle image files separately
  //   if (formValues.images && formValues.images.length > 0) {
  //     formValues.images.forEach(file => {
  //       formData.append('media', file);
  //     });
  //   }
  
  //   try {
  //     const action = isEditing ? 
  //       updateExistingProperty(property.id, formData) : 
  //       addNewProperty(formData);
      
  //     const result = await dispatch(action);

  //     if (result.success) {
  //       setToaster({ 
  //         message: `Property ${isEditing ? 'updated' : 'added'} successfully`, 
  //         type: 'success' 
  //       });
  //       setTimeout(() => {
  //         onClose();
  //         dispatch(fetchProperties());
  //       }, 1500);
  //     } else {
  //       setToaster({ 
  //         message: result.message || `Failed to ${isEditing ? 'update' : 'add'} property`, 
  //         type: 'error' 
  //       });
  //     }
  //   } catch (error) {
  //     setToaster({ 
  //       message: error.message || 'An error occurred', 
  //       type: 'error' 
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        {loading && <Spinner />}
        <div className="modal-header">
          <div className="header-row">
            <img src={modalLogo} alt="Logo" className="modal-logo" />
            <h3 className="modal-title">
              {isEditing ? 'Edit Property' : 'Create Something New!'}
            </h3>
          </div>
          <div className="header-row">
            <div className="tabs">
              <button className={`tab ${!isEditing && 'active'}`}>Add Property</button>
              <button className="tab">Add Blog</button>
            </div>
          </div>
        </div>

        <form className="property-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Property Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Beds</label>
              <input
                type="number"
                name="beds"
                value={formValues.beds}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Baths</label>
              <input
                type="number"
                name="baths"
                value={formValues.baths}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Is Offer</label>
              <div className="toggle-buttons">
                <button
                  type="button"
                  className={`toggle-btn ${formValues.isOffer ? 'active' : ''}`}
                  onClick={() => handleToggle('isOffer')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${!formValues.isOffer ? 'active' : ''}`}
                  onClick={() => handleToggle('isOffer')}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Furnished</label>
              <div className="toggle-buttons">
                <button
                  type="button"
                  className={`toggle-btn ${formValues.furnished ? 'active' : ''}`}
                  onClick={() => handleToggle('furnished')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${!formValues.furnished ? 'active' : ''}`}
                  onClick={() => handleToggle('furnished')}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {formValues.isOffer && (
            <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                value={formValues.discount}
                onChange={handleInputChange}
                placeholder="Discount"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Property Type</label>
            <select
              name="propertyType"
              value={formValues.propertyType}
              onChange={handlePropertyTypeChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="for sale">For Sale</option>
              <option value="for lease">For Rent</option>
              <option value="commercial use">Commercial Use</option>
              <option value="vacation home">Vacation Home</option>
            </select>
          </div>

          <div className="form-group">
            <label>Images (Max 6)</label>
            <input
              type="file"
              name="media"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="file-input"
              required={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Videos (Optional)</label>
            <input
              type="file"
              name="media"
              onChange={handleFileChange}
              multiple
              accept="video/*"
              className="file-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>

        {toaster && (
          <Toaster
            message={toaster.message}
            type={toaster.type}
            onClose={() => setToaster(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyModal;



// const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   // Client-side validation
  //   if (!formValues.name || !formValues.description || !formValues.location || !formValues.propertyType) {
  //     setToaster({ 
  //       message: 'Please fill in all required fields', 
  //       type: 'error' 
  //     });
  //     setLoading(false);
  //     return;
  //   }
  
  //   const formData = new FormData();
    
  //   // Append form fields
  //   formData.append('name', formValues.name);
  //   formData.append('description', formValues.description);
  //   formData.append('location', formValues.location);
  //   formData.append('price', formValues.price);
  //   formData.append('beds', formValues.beds);
  //   formData.append('baths', formValues.baths);
  //   formData.append('isOffer', formValues.isOffer);
  //   formData.append('propertyType', formValues.propertyType);
  //   formData.append('furnished', formValues.furnished);
    
  //   if (formValues.isOffer && formValues.discount) {
  //     formData.append('discount', formValues.discount);
  //   }
  
  //   // Append form fields including category
  //   Object.entries(formValues).forEach(([key, value]) => {
  //     if (key !== 'images' && key !== 'videos' && value !== undefined) {
  //       formData.append(key, value);
  //     }
  //   });

  //   // Append files
  //   if (formValues.images) {
  //     formValues.images.forEach(file => {
  //       formData.append('media', file);
  //     });
  //   }
  
  //   try {
  //     const action = isEditing ? 
  //       updateExistingProperty(property.id, formData) : 
  //       addNewProperty(formData);
      
  //     const result = await dispatch(action);

  //     if (result.success) {
  //       setToaster({ 
  //         message: `Property ${isEditing ? 'updated' : 'added'} successfully`, 
  //         type: 'success' 
  //       });
  //       // Close modal after a short delay
  //       setTimeout(() => {
  //         onClose();
  //         // Refresh the property list
  //         dispatch(fetchProperties());
  //       }, 1500);
  //     } else {
  //       setToaster({ 
  //         message: result.message || `Failed to ${isEditing ? 'update' : 'add'} property`, 
  //         type: 'error' 
  //       });
  //     }
  //   } catch (error) {
  //     setToaster({ 
  //       message: error.message || 'An error occurred', 
  //       type: 'error' 
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
      
  // };
