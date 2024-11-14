import React from 'react';
import '../../../styles/components/home/offer/PropertyInquirySection.css'
import InformationPanel from './InformationPanel';
import InquiryForm from './InquiryForm';


const PropertyInquirySection = () => {
  return (
    <section className="property-inquiry-section">
      <div className="container">
        <InformationPanel />
        <InquiryForm />
      </div>
    </section>
  );
};

export default PropertyInquirySection;