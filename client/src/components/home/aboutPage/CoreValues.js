import React from "react";
import '../../../styles/components/home/aboutPage/CoreValues.css';
import { Building2, Shield, Users, Award, Hammer, Clock, CheckCircle, TrendingUp } from 'lucide-react';


// Core Values Section
const CoreValues = () => {
    const values = [
      {
        icon: <Shield size={40} />,
        title: 'Quality & Safety',
        description: 'We prioritize quality craftsmanship and maintain the highest safety standards on every project.'
      },
      {
        icon: <Users size={40} />,
        title: 'Client Focused',
        description: 'Your vision is our mission. We work closely with clients to exceed expectations at every turn.'
      },
      {
        icon: <Hammer size={40} />,
        title: 'Expert Craftsmanship',
        description: 'Our skilled team brings decades of combined experience to deliver exceptional results.'
      },
      {
        icon: <Clock size={40} />,
        title: 'Timely Execution',
        description: 'We understand deadlines matter. Our efficient processes ensure on-time project completion.'
      }
    ];
  
    return (
      <section className="core-values">
        <div className="container">
          <h2 className="section-title centered">Our Core Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default CoreValues;