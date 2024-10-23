import React from 'react';
import '../../styles/pages/home/ContactPage.css';

const ContactPage = () => {
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
          <p>📞  07482187549</p>
          {/* <p>📞 +880763863686</p> */}
          <p>✉️ <a href="mailto:emmaonwe79@gmail.com">emmaonwe79@gmail.com</a></p>
          <p>📍 Wolvehampton, UK</p>
        </div>
        <form className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
            required
          />
          <input
            type="text"
            placeholder="Your Subject"
            className="contact-input"
            required
          />
          <textarea
            placeholder="Write your message here"
            className="contact-textarea"
            required
          />
          <button
            type="submit"
            className="contact-button"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
