import React from 'react';
import '../../../styles/components/home/constructionPage/ConstructionBookingSection.css';
import constructionWorker from '../../../assets/images/home/construction/images/plumber1.jpg';

const ConstructionBookingSection = () => {
  return (
    <section className="construction-booking-section">
      <div className="construction-booking-container">
        <div className="construction-booking-content">
          <div className="construction-booking-image-section">
            <img 
              src={constructionWorker}
              alt="Professional worker" 
              className="construction-booking-worker-image"
            />
            <div className="construction-booking-contact-info">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="construction-booking-contact-text">
                <h3>24/7 Customer Support</h3>
                <p>emmaonwe79@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="construction-booking-form-section">
            <div className="construction-booking-form-header">
              <h3>CONTACT US</h3>
              <h2>Seamless Booking Process</h2>
              <p>Our team is here to make your booking experience easy and stress-free. Whether you need a quick consultation or a detailed service plan, we’re just a message away.</p>
            </div>
            
            <form className="construction-booking-booking-form">
              <select className="construction-booking-form-input" defaultValue="">
                <option value="" disabled>Choose a Service</option>
                <option value="consultation">Consultation</option>
                <option value="installation">Installation</option>
                <option value="maintenance">Maintenance</option>
              </select>
              
              <div className="construction-booking-form-row">
                <input type="text" placeholder="Your Name*" className="construction-booking-form-input" />
                <select className="construction-booking-form-input" defaultValue="">
                  <option value="" disabled>Select Preferred Date</option>
                  <option value="2023-11-10">November 10, 2023</option>
                  <option value="2023-11-15">November 15, 2023</option>
                  <option value="2023-11-20">November 20, 2023</option>
                </select>
              </div>
              
              <div className="construction-booking-form-row">
                <input type="email" placeholder="Email Address*" className="construction-booking-form-input" />
                <input type="tel" placeholder="Phone Number*" className="construction-booking-form-input" />
              </div>
              
              <input type="text" placeholder="Project Address*" className="construction-booking-form-input" />
              <textarea placeholder="Describe Your Project or Request*" className="construction-booking-form-input message-input"></textarea>
              
              <button type="submit" className="construction-booking-submit-button">Send Your Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionBookingSection;