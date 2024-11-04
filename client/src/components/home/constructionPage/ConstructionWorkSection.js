import React from 'react';
import '../../../styles/components/home/constructionPage/ConstructionWorkSection.css';
import { FaTools, FaSnowflake, FaPlug, FaWrench, FaHammer } from 'react-icons/fa';

const ConstructionWorkSection = () => {
  return (
    <section id="construction-work-section" className="construction-work-section">
      <div className="construction-overlay">
        <h5>GET STARTED TODAY</h5>
        <h2>Peeman Developers Services<br/>Excellence in Every Service</h2>
        <p>
          From plumbing repairs to AC maintenance and electrical work, we offer a full spectrum of services 
          delivered with precision and care. Our team of licensed professionals is dedicated to providing 
          high-quality solutions tailored to your needs.
        </p>
        <div className="construction-services">
          <div className="construction-service-item">
            <FaTools />
            <span>Plumbing Solutions</span>
          </div>
          <div className="construction-service-item">
            <FaSnowflake />
            <span>AC Repair & Maintenance</span>
          </div>
          <div className="construction-service-item">
            <FaPlug />
            <span>Electrical Services</span>
          </div>
          <div className="construction-service-item">
            <FaWrench />
            <span>Appliance Repair</span>
          </div>
          <div className="construction-service-item">
            <FaHammer />
            <span>Carpentry Work</span>
          </div>
        </div>
        <div className="construction-buttons">
          <button className="construction-read-more">Learn More</button>
          <button className="construction-book-service">Book a Service</button>
        </div>
      </div>
    </section>
  );
};

export default ConstructionWorkSection;



// import React from 'react';
// import '../../../styles/components/home/constructionPage/ConstructionWorkSection.css';
// import { FaTools, FaSnowflake, FaPlug, FaWrench, FaHammer } from 'react-icons/fa';

// const ConstructionWorkSection = () => {
//   return (
//     <section id="construction-work-section" className="construction-work-section">
//       <div className="construction-overlay">
//         <h5>START TODAY</h5>
//         <h2>Mezan Services<br/>World Class Comprehensive</h2>
//         <p>
//           Massa ultricies mi quis hendrerit dolor magna. Gravida et sollicitudin. 
//           Proin libero nunc consequat interdum varius sit amet mattis vulputate
//         </p>
//         <div className="construction-services">
//           <div className="construction-service-item">
//             <FaTools />
//             <span>Plumber</span>
//           </div>
//           <div className="construction-service-item">
//             <FaSnowflake />
//             <span>AC Service</span>
//           </div>
//           <div className="construction-service-item">
//             <FaPlug />
//             <span>Electrician</span>
//           </div>
//           <div className="construction-service-item">
//             <FaWrench />
//             <span>Appliance</span>
//           </div>
//           <div className="construction-service-item">
//             <FaHammer />
//             <span>Carpenter</span>
//           </div>
//         </div>
//         <div className="construction-buttons">
//           <button className="construction-read-more">Read More</button>
//           <button className="construction-book-service">Book Service</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConstructionWorkSection;