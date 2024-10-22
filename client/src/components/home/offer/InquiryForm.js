import React from 'react';
import Button from '../../../utility/Button';
import '../../../styles/components/home/offer/InquiryForm.css'


const InquiryForm = () => {
  return (
    <div className="inquiry-form-container">
      <div className="inquiry-form">
        <h3>Peeman Inquiry Form</h3>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="inquiryType">Inquiry Type</label>
            <select id="inquiryType">
              <option>For Sale</option>
              <option>For Lease</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="example@domain.com" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input type="tel" id="phone" placeholder="+1 (123) 456-0509" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={4} placeholder="Include property location and description"></textarea>
          </div>
          <Button type="submit" className="submit-button">Submit Inquiry</Button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;