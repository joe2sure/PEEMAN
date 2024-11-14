import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Toaster from '../../../utility/Toaster';  // Import the Toaster component
import '../../../styles/components/home/propertyDetail/PropertyDetailForm.css';

const PropertyDetailForm = ({ propertyType }) => {
  const [formData, setFormData] = useState({
    inquiryType: propertyType === 'rent' ? 'For Lease' : 'For Sale',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toaster, setToaster] = useState({
    show: false,
    message: '',
    type: '',  // 'success' or 'error'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      inquiry_type: formData.inquiryType,
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      message: formData.message,
    };

    try {
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      console.log('Email sent successfully:', result.text);
      setToaster({
        show: true,
        message: 'Inquiry submitted successfully!',
        type: 'success',
      });

      // Reset form data
      setFormData({
        inquiryType: propertyType === 'rent' ? 'For Lease' : 'For Sale',
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setToaster({
        show: true,
        message: 'Failed to submit inquiry. Please try again later.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.6 : 1 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
      
      {/* Toaster Notification */}
      {toaster.show && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          duration={3000} // Customize toaster duration as needed
          onClose={() => setToaster({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default PropertyDetailForm;
