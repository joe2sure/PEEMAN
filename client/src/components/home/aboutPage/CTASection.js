import React from 'react';
import '../../../styles/components/home/aboutPage/CTASection.css';
import arrowRight from '../../../assets/icons/home/arrow-right.svg';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Start Your Project?</h2>
        <p className="cta-text">
          Let's bring your construction vision to life. Contact us today for a consultation.
        </p>
        <button className="cta-button">
          Get Started
          <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
};

export default CTASection;
// const CTASection = () => {
//   return (
//     <section className="aboutPage-cta-section">
//       <div className="aboutPage-cta-container">
//         <h2>Ready to Find Your Dream Home?</h2>
//         <p className='aboutPage-cta-text'>Start your journey with us today</p>
//         {/* <button className="aboutPage-cta-button">Get Started</button> */}
//         <button className="aboutPage-cta-button">
//           Get Started
//           <img src={arrowRight} alt="Arrow right" />
//         </button>
//       </div>
//     </section>
//   );
// };


