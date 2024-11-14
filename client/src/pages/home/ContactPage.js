import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Toaster from '../../utility/Toaster.js';
import '../../styles/pages/home/ContactPage.css';

const ContactPage = () => {
  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toaster, setToaster] = useState({
    show: false,
    message: '',
    type: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      subject: formData.subject,
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
        message: 'Message sent successfully!',
        type: 'success'
      });
  
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setToaster({
        show: true,
        message: 'Failed to send message. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get In Touch</h1>
      <p className="contact-subtitle">
        We'll create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings, improve brand.
      </p>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>We'll create high-quality linkable content and build at least 40 high-authority links.</p>
          <p>📞 07482187549</p>
          <p>✉️ <a href="mailto:emmaonwe83@gmail.com">emmaonwe83@gmail.com</a></p>
          <p>📍 Wolvehampton, UK</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="contact-input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="contact-input"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Your Subject"
            className="contact-input"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write your message here"
            className="contact-textarea"
            required
          />
          <button
            type="submit"
            className="contact-button"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      {toaster.show && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={() => setToaster({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default ContactPage;


// import React from 'react';
// import '../../styles/pages/home/ContactPage.css';

// const ContactPage = () => {
//   return (
//     <div className="contact-container">
//       <h1 className="contact-title">Get In Touch</h1>
//       <p className="contact-subtitle">
//         We'll create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings, improve brand.
//       </p>
//       <div className="contact-content">
//         <div className="contact-info">
//           <h2>Contact Information</h2>
//           <p>We'll create high-quality linkable content and build at least 40 high-authority links.</p>
//           <p>📞  07482187549</p>
//           {/* <p>📞 +880763863686</p> */}
//           <p>✉️ <a href="mailto:emmaonwe79@gmail.com">emmaonwe79@gmail.com</a></p>
//           <p>📍 Wolvehampton, UK</p>
//         </div>
//         <form className="contact-form">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="contact-input"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="contact-input"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Your Subject"
//             className="contact-input"
//             required
//           />
//           <textarea
//             placeholder="Write your message here"
//             className="contact-textarea"
//             required
//           />
//           <button
//             type="submit"
//             className="contact-button"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
