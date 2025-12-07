import React from 'react';
import '../../../styles/components/home/aboutPage/CompanyOverview.css';
import { Building2, Shield, Users, Award, Hammer, Clock, CheckCircle, TrendingUp } from 'lucide-react';

// Company Overview Section
const CompanyOverview = () => {
    return (
      <section className="company-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-image">
              <div className="image-placeholder">
                <Building2 size={120} strokeWidth={1} />
              </div>
            </div>
            <div className="overview-content">
              <h2 className="section-title">About Peeman Developers Ltd</h2>
              <p className="overview-text">
                Peeman Developers Ltd is a leading construction and property development company 
                committed to delivering exceptional quality and innovative solutions. With a strong 
                foundation in the UK market, we specialize in residential and commercial projects 
                that transform visions into reality.
              </p>
              <p className="overview-text">
                Our team combines years of industry expertise with cutting-edge technology to ensure 
                every project meets the highest standards of quality, safety, and sustainability.
              </p>
              <div className="overview-highlights">
                <div className="highlight-item">
                  <CheckCircle size={24} />
                  <span>Quality Assurance</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={24} />
                  <span>Timely Delivery</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={24} />
                  <span>Sustainable Practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default CompanyOverview;