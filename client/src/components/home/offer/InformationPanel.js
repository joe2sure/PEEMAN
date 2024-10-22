import React from 'react';
import '../../../styles/components/home/offer/InformationPanel.css'


const InformationPanel = () => {
  return (
    <div className="information-panel">
      <h2>Do you have a <br/> property for <br/>sale or rent?</h2>
      <p>Fill out the inquiry form and we will contact you personally!</p>
      <div className="divider"></div>
      <div className="steps">
        <div className="step">
          <h3>01.</h3>
          <h3>Contact Information</h3>
          <p>Enter the required contact information in <br/>the form, so we can send you a <br/>personalized response. Ensure you enter <br/>the correct information</p>
        </div>
        <div className="step">
          <h3>02.</h3>
          <h3>Property Description</h3>
          <p>Send us a message including the <br/> description of the property, it’s location,<br/> bed and bath number, and your desired <br/>sale price range.</p>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;