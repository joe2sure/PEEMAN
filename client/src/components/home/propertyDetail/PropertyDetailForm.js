import React, { useState } from 'react';
import '../../../styles/components/home/propertyDetail/PropertyDetailForm.css';

const PropertyDetailForm = ({ propertyType }) => {
  const [formData, setFormData] = useState({
    inquiryType: propertyType === 'rent' ? 'For Lease' : 'For Sale',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="property-inquiry-form">
      <h3>Property Inquiry Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inquiryType">Inquiry Type</label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
          >
            <option value="For Sale">For Sale</option>
            <option value="For Lease">For Lease</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone (Optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (123) 456-0509"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Include property location and description"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Inquiry</button>
      </form>
    </div>
  );
};

export default PropertyDetailForm;