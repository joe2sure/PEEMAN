import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/home/Banner.css';
import arrowRight from '../../assets/icons/home/arrow-right.svg';
import defaultBannerImage from '../../assets/images/home/banner-image.svg';
import hiringIcon from '../../assets/icons/home/hiring-icon.svg';
import PropertyModal from './PropertyModal.js';

const Banner = () => {
  const navigate = useNavigate();
  const { properties } = useSelector(state => state.property);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHiringNotificationClick = () => {
    navigate('/construction/job-vacancies');
  };

  const handleGetFormClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const bannerImages = React.useMemo(() => {
    const uniqueImages = [];
    const seenImages = new Set();

    for (const property of properties) {
      if (property.images && property.images.length > 0) {
        const firstImage = property.images[0].url;
        if (!seenImages.has(firstImage) && uniqueImages.length < 5) {
          uniqueImages.push(firstImage);
          seenImages.add(firstImage);
        }
      }
      if (uniqueImages.length === 5) break;
    }

    return uniqueImages.length > 0 ? uniqueImages : [defaultBannerImage];
  }, [properties]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % bannerImages.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerImages]);

  return (
    <section className="banner">
      {/* Hiring Notification Card */}
      <div className="hiring-notification" onClick={handleHiringNotificationClick}>
        <img src={hiringIcon} alt="Hiring Notification" className="hiring-icon" />
        <span className="hiring-text">We are Hiring!!!</span>
      </div>

      {/* Banner image with overlay */}
      <div className="banner-image-overlay">
        <img 
          src={bannerImages[currentImageIndex]} 
          alt={`Banner image ${currentImageIndex + 1}`} 
          className="banner-carousel-image"
        />
      </div>

      {/* Banner content centered within overlay */}
      <div className="banner-content">
        <h1>Find Your <i>Dream Home</i><br /> Right Away</h1>
        <p>
          Find your dream property with us and unlock a world of luxurious living. 
          Explore our exceptional collection of homes, apartments, 
          and estates that cater to your unique lifestyle.
        </p>
        <button className="cta-button">
          See our latest offers
          <img src={arrowRight} alt="Arrow right" />
        </button>
      </div>

      {/* Get Form Indicator */}
      <div className="watch-live-circle" onClick={handleGetFormClick}>
        <span>Get Form</span>
      </div>

      {/* Modal */}
      {isModalOpen && <PropertyModal onClose={handleCloseModal} />}

      {/* Image Indicators */}
      {bannerImages.length > 1 && (
        <div className="banner-image-indicators">
          {bannerImages.map((_, index) => (
            <span 
              key={index} 
              className={`banner-image-indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
export default Banner;



// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/components/home/Banner.css';
// import arrowRight from '../../assets/icons/home/arrow-right.svg';
// import defaultBannerImage from '../../assets/images/home/banner-image.svg';
// import hiringIcon from '../../assets/icons/home/hiring-icon.svg';

// const Banner = () => {
//   const navigate = useNavigate();
//   const { properties } = useSelector(state => state.property);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleHiringNotificationClick = () => {
//     navigate('/construction/job-vacancies');
//   };

//   const bannerImages = React.useMemo(() => {
//     const uniqueImages = [];
//     const seenImages = new Set();

//     for (const property of properties) {
//       if (property.images && property.images.length > 0) {
//         const firstImage = property.images[0].url;
//         if (!seenImages.has(firstImage) && uniqueImages.length < 5) {
//           uniqueImages.push(firstImage);
//           seenImages.add(firstImage);
//         }
//       }
//       if (uniqueImages.length === 5) break;
//     }

//     return uniqueImages.length > 0 ? uniqueImages : [defaultBannerImage];
//   }, [properties]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         (prevIndex + 1) % bannerImages.length
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [bannerImages]);

//   return (
//     <section className="banner">
//       {/* Hiring Notification Card */}
//       <div className="hiring-notification" onClick={handleHiringNotificationClick}>
//         <img src={hiringIcon} alt="Hiring Notification" className="hiring-icon" />
//         <span className="hiring-text">We are Hiring!!!</span>
//       </div>

//       {/* Banner image with overlay */}
//       <div className="banner-image-overlay">
//         <img 
//           src={bannerImages[currentImageIndex]} 
//           alt={`Banner image ${currentImageIndex + 1}`} 
//           className="banner-carousel-image"
//         />
//       </div>

//       {/* Banner content centered within overlay */}
//       <div className="banner-content">
//         <h1>Find Your <i>Dream Home</i><br /> Right Away</h1>
//         <p>
//           Find your dream property with us and unlock a world of luxurious living. 
//           Explore our exceptional collection of homes, apartments, 
//           and estates that cater to your unique lifestyle.
//         </p>
//         <button className="cta-button">
//           See our latest offers
//           <img src={arrowRight} alt="Arrow right" />
//         </button>
//       </div>

//       {/* Image Indicators */}
//       {bannerImages.length > 1 && (
//         <div className="banner-image-indicators">
//           {bannerImages.map((_, index) => (
//             <span 
//               key={index} 
//               className={`banner-image-indicator ${index === currentImageIndex ? 'active' : ''}`}
//               onClick={() => setCurrentImageIndex(index)}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Banner;