import React, { useState } from 'react';
import '../../../styles/components/home/constructionPage/ConstructionPaymentSection.css';

import partnerImg1 from '../../../assets/images/home/construction/png/partnerImg1.png';
import partnerImg2 from '../../../assets/images/home/construction/png/partnerImg2.png';
import partnerImg3 from '../../../assets/images/home/construction/png/partnerImg3.png';
import partnerImg4 from '../../../assets/images/home/construction/png/partnerImg4.png';
import partnerImg5 from '../../../assets/images/home/construction/png/partnerImg5.png';

const ConstructionPaymentSection = () => {
  const [billingType, setBillingType] = useState('monthly');

  const packages = [
    {
      title: "Repairing Plan",
      price: "25",
      features: [
        { text: "Routine maintenance and minor repairs", included: true },
        { text: "On-call support for emergency repairs", included: true },
        { text: "Annual safety and functionality inspection", included: true },
        { text: "Access to discounted repair services", included: true },
        { text: "Priority service scheduling", included: false },
        { text: "Full system replacement options", included: false },
      ]
    },
    {
      title: "Emergency Plan",
      price: "50",
      isPopular: true,
      features: [
        { text: "24/7 emergency repair service", included: true },
        { text: "Rapid response for urgent repairs", included: true },
        { text: "Comprehensive diagnostic checks", included: true },
        { text: "Priority access to repair personnel", included: true },
        { text: "Full replacement if repair isn’t feasible", included: false },
        { text: "Exclusive annual check-up and maintenance", included: false },
      ]
    },
    {
      title: "Replacement Plan",
      price: "75",
      features: [
        { text: "Complete system replacement service", included: true },
        { text: "Project planning and cost estimation", included: true },
        { text: "Customized solutions for unique requirements", included: true },
        { text: "Includes removal of old equipment", included: true },
        { text: "One-year warranty on all replacements", included: false },
        { text: "Free follow-up inspections", included: false },
      ]
    }
  ];

  const sponsors = [
    { name: "Stereo", logo: partnerImg1 },
    { name: "Tidal", logo: partnerImg2 },
    { name: "Inovate", logo: partnerImg3},
    { name: "Trap Music", logo: partnerImg4 },
    { name: "Party", logo: partnerImg5 }
  ];

  return (
    <section className="construction-payment-section">
      <div className="construction-payment-package-section">
        <h2 className="construction-payment-section-title">LEADING SERVICES</h2>
        <h1 className="construction-payment-main-title">Service Packages</h1>
        <p className="construction-payment-description">
          Choose from our tailored packages designed to meet the unique demands of every project. From emergency repairs to full system replacements, our plans are crafted to keep your facilities in top condition.
        </p>

        <div className="construction-payment-billing-toggle">
          <span className={billingType === 'construction-payment-monthly' ? 'construction-payment-active' : ''}>Monthly</span>
          <label className="construction-payment-toggle-switch">
            <input
              type="checkbox"
              onChange={() => setBillingType(billingType === 'monthly' ? 'yearly' : 'monthly')}
              checked={billingType === 'yearly'}
            />
            <span className="construction-payment-slider round"></span>
          </label>
          <span className={billingType === 'construction-payment-yearly' ? 'construction-payment-active' : ''}>Yearly</span>
        </div>

        <div className="construction-payment-packages-container">
          {packages.map((pkg, index) => (
            <div key={index} className={`construction-payment-package-card ${pkg.isPopular ? 'construction-popular' : ''}`}>
              {pkg.isPopular && <div className="construction-payment-popular-tag">Most Popular</div>}
              <h3 className="construction-payment-package-title">{pkg.title}</h3>
              <div className="construction-payment-package-price">
                <span className="construction-payment-currency">£</span>
                <span className="construction-payment-amount">{pkg.price}</span>
                <span className="construction-payment-period">/ Per Month</span>
              </div>
              <ul className="construction-payment-features-list">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className={feature.included ? 'construction-payment-included' : 'construction-payment-not-included'}>
                    <span className="construction-payment-check-icon">{feature.included ? '✓' : '×'}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button className="construction-payment-get-package-btn">Get This Package</button>
            </div>
          ))}
        </div>
      </div>

      <div className="construction-payment-footer-section">
        <p className="construction-payment-footer-text">
          We are committed to providing exceptional service at competitive rates. All packages come with flexible billing options to accommodate project needs. For more details on our packages or custom solutions, feel free to <a href="mailto:info@example.com">contact us</a>.
        </p>
        <div className="construction-payment-sponsors-container">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="construction-payment-sponsor-logo">
              <img src={sponsor.logo} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionPaymentSection;