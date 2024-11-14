import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Toaster from '../../../utility/Toaster';
import Button from '../../../utility/Button';
import '../../../styles/components/home/offer/InquiryForm.css';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    inquiryType: 'For Sale',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toaster, setToaster] = useState({
    show: false,
    message: '',
    type: '', // 'success' or 'error'
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
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

      // Reset form data after successful submission
      setFormData({
        inquiryType: 'For Sale',
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
    <div className="inquiry-form-container">
      <div className="inquiry-form">
        <h3>Peeman Inquiry Form</h3>
        <hr />
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
          <Button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.6 : 1 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
        </form>
      </div>

      {/* Toaster Notification */}
      {toaster.show && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          duration={3000} // Set duration for toaster visibility
          onClose={() => setToaster({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default InquiryForm;




// import React from 'react';
// import Button from '../../../utility/Button';
// import '../../../styles/components/home/offer/InquiryForm.css'


// const InquiryForm = () => {
//   return (
//     <div className="inquiry-form-container">
//       <div className="inquiry-form">
//         <h3>Peeman Inquiry Form</h3>
//         <hr />
//         <form>
//           <div className="form-group">
//             <label htmlFor="inquiryType">Inquiry Type</label>
//             <select id="inquiryType">
//               <option>For Sale</option>
//               <option>For Lease</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name" placeholder="John Doe" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" placeholder="example@domain.com" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone (Optional)</label>
//             <input type="tel" id="phone" placeholder="+1 (123) 456-0509" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="message">Message</label>
//             <textarea id="message" rows={4} placeholder="Include property location and description"></textarea>
//           </div>
//           <Button type="submit" className="submit-button">Submit Inquiry</Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InquiryForm;