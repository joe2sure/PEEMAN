import React from 'react';
import '../../../styles/components/home/constructionPage/ConstructionStatisticsSection.css';
import constructionWorker from '../../../assets/images/home/construction/images/construction-worker1.jpg';
import plumbingImg from '../../../assets/images/home/construction/images/construction-worker2.jpg';
import acInstallImg from '../../../assets/images/home/construction/images/construction-worker-painter.jpg';
import cabinetImg from '../../../assets/images/home/construction/images/capentary1.jpg';
import carpentryImg from '../../../assets/images/home/construction/images/ac-installer1.jpg';

const ConstructionStatisticsSection = () => {
  const stats = [
    { number: "980+", label: "Projects Completed" },
    { number: "900+", label: "Satisfied Clients" },
    { number: "450+", label: "Qualified Experts" },
    { number: "220+", label: "Locations Served" },
  ];

  const serviceImages = [
    { src: constructionWorker, alt: "AC Repair Service" },
    { src: plumbingImg, alt: "Sanitization Service" },
    { src: acInstallImg, alt: "Appliance Repair" },
    { src: cabinetImg, alt: "Cabinet Installation" },
    { src: carpentryImg, alt: "Carpentry Services" },
    { src: acInstallImg, alt: "General Carpentry Work" },
  ];

  return (
    <section className="construction-statistics-section">
      <div className="construction-statistics-top-section">
        <div className="construction-statistics-content-wrapper">
          <div className="construction-statistics-text-content">
            <span className="construction-statistics-service-label">DEPENDABLE SOLUTIONS</span>
            <h1 className="construction-statistics-main-heading">Reliable Plumbing, Electrical, and Carpentry Services</h1>
            <p className="construction-statistics-description">
              Our team is committed to delivering safe, high-quality workmanship in every project. 
              With a focus on reliability and precision, we ensure all plumbing, electrical, and carpentry needs are met with expertise. 
              Experience the confidence that comes with choosing a professional team that values your safety and satisfaction.
            </p>
            
            <div className="construction-statistics-reviews">
              <div className="construction-statistics-review-avatars">
                {/* Add avatar images here */}
              </div>
              <div className="construction-statistics-rating">
                <div className="construction-statistics-stars">★★★★★</div>
                <span>4K+ Positive Reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="construction-statistics-stats-row">
          {stats.map((stat, index) => (
            <div key={index} className="construction-statistics-stat-item">
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="construction-statistics-gallery-section">
        <div className="construction-statistics-image-grid">
          {serviceImages.map((image, index) => (
            <div key={index} className="construction-statistics-image-item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
        <button className="construction-statistics-portfolio-button">Browse Our Portfolio</button>
      </div>
    </section>
  );
};

export default ConstructionStatisticsSection;



// import React from 'react';
// import '../../../styles/components/home/constructionPage/ConstructionStatisticsSection.css';
// import constructionWorker from '../../../assets/images/home/property-image.svg';
// import plumbingImg from '../../../assets/images/home/property-image-3.svg';
// import acInstallImg from '../../../assets/images/home/property-image-3.svg';
// import cabinetImg from '../../../assets/images/home/property-image-2.svg';
// import carpentryImg from '../../../assets/images/home/property-image.svg';

// const ConstructionStatisticsSection = () => {
//   const stats = [
//     { number: "980+", label: "Successful Services" },
//     { number: "900+", label: "Satisfied Clients" },
//     { number: "450+", label: "Professionals" },
//     { number: "220+", label: "Global Stores" },
//   ];

//   const serviceImages = [
//     { src: constructionWorker, alt: "AC Repair Service" },
//     { src: plumbingImg, alt: "Sanitization Service" },
//     { src: acInstallImg, alt: "Appliance Repair" },
//     { src: cabinetImg, alt: "Cleaning Service" },
//     { src: carpentryImg, alt: "Installation Service" },
//     { src: acInstallImg, alt: "Carpentry Work" },
//   ];

//   return (
//     <section className="construction-statistics-section">
//       <div className="construction-statistics-top-section">
//         <div className="construction-statistics-content-wrapper">
//           <div className="construction-statistics-text-content">
//             <span className="construction-statistics-service-label">FRIENDLY SERVICES</span>
//             <h1 className="construction-statistics-main-heading">Safe And Secure Plumbing, Electrical And Carpenter Work</h1>
//             <p className="construction-statistics-description">
//               Egestas erat imperdiet sed euismod nisi porta lorem mollis. Nunc scelerisque viverra mauris in aliquam. 
//               Morbi non arcu risus quis.Libero enim sed faucibus turpis in eu mi. Aliquam nulla facilisis fermentum 
//               odio eu feugiat pretium nibh.
//             </p>
            
//             <div className="construction-statistics-reviews">
//               <div className="construction-statistics-review-avatars">
//                 {/* Add avatar images here */}
//               </div>
//               <div className="construction-statistics-rating">
//                 <div className="construction-statistics-stars">★★★★★</div>
//                 <span>4.k Reviews</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="construction-statistics-stats-row">
//           {stats.map((stat, index) => (
//             <div key={index} className="construction-statistics-stat-item">
//               <h2>{stat.number}</h2>
//               <p>{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="construction-statistics-gallery-section">
//         <div className="construction-statistics-image-grid">
//           {serviceImages.map((image, index) => (
//             <div key={index} className="construction-statistics-image-item">
//               <img src={image.src} alt={image.alt} />
//             </div>
//           ))}
//         </div>
//         <button className="construction-statistics-portfolio-button">View All Portfolio</button>
//       </div>
//     </section>
//   );
// };

// export default ConstructionStatisticsSection;