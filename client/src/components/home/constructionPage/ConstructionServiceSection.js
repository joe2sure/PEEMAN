import React, { useEffect } from 'react';
import '../../../styles/components/home/constructionPage/ConstructionServiceSection.css';
import constructionWorker from '../../../assets/images/home/construction/images/construction-worker3.jpg';
import plumbingImg from '../../../assets/images/home/construction/images/plumber1.jpg';
import acInstallImg from '../../../assets/images/home/construction/images/ac-installer2.jpg';
import cabinetImg from '../../../assets/images/home/construction/images/cabinet-making2.jpg';
import carpentryImg from '../../../assets/images/home/construction/images/capentary3.jpg';
import { HandshakeIcon, ThumbsUpIcon, ClockIcon } from 'lucide-react';

const ConstructionServicesSection = () => {
  useEffect(() => {
    const scrollContainer = document.querySelector('.construction-services-grid');
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += 1;
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 30);
    };

    startAutoScroll();
    return () => clearInterval(scrollInterval);
  }, []);

  const services = [
    {
      title: "Sanitary Plumbing",
      description: "Ensure efficient and reliable plumbing solutions for homes and businesses, addressing everything from routine repairs to complex installations with expert precision.",
      image: plumbingImg
    },
    {
      title: "Air Conditioning Installation",
      description: "Professional AC installation services to keep your spaces cool and comfortable. Our team ensures energy-efficient setups tailored to your specific requirements.",
      image: acInstallImg
    },
    {
      title: "Cabinet Making",
      description: "Custom cabinetry designed and crafted to match your vision, adding both functionality and aesthetic value to your spaces with durable, high-quality materials.",
      image: cabinetImg
    },
    {
      title: "Window Carpentry",
      description: "Expert carpentry for windows, ensuring precise fittings, weather resistance, and enhanced aesthetics. Our work combines craftsmanship with durability for lasting results.",
      image: carpentryImg
    }
  ];

  return (
    <div className="construction-services-container">
      {/* First Section - Services */}
      <section className="construction-services-section">
        <div className="construction-services-header">
          <div className="construction-header-left">
            <h3 className="construction-section-subtitle">OUR SERVICES</h3>
            <h2 className="construction-section-title">Ideal Solution For Time<br />Consuming Problems</h2>
          </div>
          <p className="construction-header-description">
          Our comprehensive range of services addresses common challenges in construction, ensuring quality, reliability, and efficiency for every project we undertake.
          </p>
        </div>
        
        <div className="construction-services-grid">
          {services.map((service, index) => (
            <div key={index} className="construction-service-card">
              <div className="construction-service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="construction-service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="construction-service-arrow">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="construction-cta-buttons">
          <button className="construction-btn-primary">Get A Quote</button>
          <button className="construction-btn-secondary">View All Services</button>
        </div>
      </section>

      {/* Second Section - Quote Request */}
      <section className="construction-quote-section">
        <div className="construction-quote-content">
          <h4 className="construction-quote-subtitle">FOR FREE ESTIMATE!</h4>
          <h2 className="construction-quote-title">Request A Quote</h2>
          <form className="construction-quote-form">
            <div className="construction-form-row">
              <input type="text" placeholder="Your Name*" />
              <input type="email" placeholder="Email ID*" />
              <input type="text" placeholder="Office Address" />
            </div>
            <div className="form-row form-row-bottom">
              <select defaultValue="">
                <option value="" disabled>Select Your Work Type</option>
                <option value="plumbing">Plumbing</option>
                <option value="ac">AC Installation</option>
                <option value="cabinet">Cabinet Making</option>
                <option value="carpentry">Carpentry</option>
              </select>
              <input type="date" placeholder="Select Date" />
              <button type="submit" className="construction-btn-estimate">Get Estimate Quote</button>
            </div>
          </form>
        </div>
        <div className="construction-quote-image">
          <img src={constructionWorker} alt="Construction Professional" />
        </div>
      </section>

      {/* Third Section - Trust Features */}
      <section className="construction-trust-section">
        <div className="construction-trust-features">
          <div className="construction-trust-feature-card construction-highlight-card">
            <div className="construction-trust-header">
              <h3 className="construction-trust-subtitle">PEOPLE TRUST</h3>
              <h2 className="construction-trust-title">Why We<br />Are Best</h2>
              <p>Our dedication to quality and professionalism has earned us the trust of our clients. Here’s what sets us apart in the construction industry.</p>
            </div>
          </div>
          <div className="construction-trust-feature-card">
            <HandshakeIcon className="construction-feature-icon" />
            <h3>Licensed Technicians</h3>
            <p>Our certified technicians bring extensive expertise and professionalism to each project, ensuring work is done right the first time.</p>
          </div>
          <div className="construction-trust-feature-card">
            <ThumbsUpIcon className="construction-feature-icon" />
            <h3>Top Rated Service</h3>
            <p>We consistently receive high ratings from clients, reflecting our commitment to delivering quality, reliable services for every project.</p>
          </div>
          <div className="construction-trust-feature-card">
            <ClockIcon className="construction-feature-icon" />
            <h3>Timely Services</h3>
            <p>We respect your time and schedule, ensuring that projects are completed promptly without compromising on quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionServicesSection;

