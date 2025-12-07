import React from "react";
import '../../../styles/components/home/aboutPage/WhyChooseUs.css';
import { Building2, Shield, Users, Award, Hammer, Clock, CheckCircle, TrendingUp } from 'lucide-react';

// Why Choose Us Section
const WhyChooseUs = () => {
    const reasons = [
      'Licensed and fully insured',
      'Transparent pricing with no hidden costs',
      'Eco-friendly and sustainable building practices',
      'Comprehensive warranty on all projects',
      'Dedicated project management',
      '24/7 customer support'
    ];
  
    return (
      <section className="why-choose">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-content">
              <h2 className="section-title">Why Choose Peeman Developers?</h2>
              <p className="why-choose-text">
                We stand out in the construction industry through our unwavering commitment 
                to excellence, innovation, and customer satisfaction.
              </p>
              <ul className="reasons-list">
                {reasons.map((reason, index) => (
                  <li key={index} className="reason-item">
                    <CheckCircle size={20} />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="why-choose-image">
              <div className="image-placeholder">
                <Hammer size={100} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default WhyChooseUs;