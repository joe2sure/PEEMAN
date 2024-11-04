import React, { useState, useEffect } from 'react';
import '../../../styles/components/home/aboutPage/HeroSection.css';
import arrowRight from '../../../assets/icons/home/arrow-right.svg';
import propertyImg1 from '../../../assets/images/home/property-image-2.svg';
import propertyImg2 from '../../../assets/images/home/property-image-3.svg';
import propertyImg3 from '../../../assets/images/home/buy-sell-rent-background-image.svg';

const HeroSection = () => {
  const images = [
    propertyImg1,
    propertyImg2,
    propertyImg3
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about-hero">
      {images.map((image, index) => (
        <div
          key={index}
          className={`about-hero-overlay ${
            index === currentImageIndex ? 'active' : ''
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      <div className="about-hero-content">
        <h1>Your Trusted Partner in Construction & Real Estate Development</h1>
        <p>
          With a legacy of excellence in construction and real estate, we bring your vision to life. Our team is committed to delivering innovative solutions, quality craftsmanship, and sustainable building practices that stand the test of time.
        </p>
        <button className="about-cta-button">
          Contact Us Today
          <img src={arrowRight} alt="Arrow right" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

// import React from 'react';
// import '../../../styles/components/home/aboutPage/HeroSection.css';
// import arrowRight from '../../../assets/icons/home/arrow-right.svg';

// const HeroSection = () => {
//   return (
//     <section className="about-hero">
//       <div className="about-hero-overlay"></div>
//       <div className="about-hero-content">
//         <h1>Your Trusted Partner in Construction & Real Estate Development</h1>
//         <p>
//           With a legacy of excellence in construction and real estate, we bring your vision to life. Our team is committed to delivering innovative solutions, quality craftsmanship, and sustainable building practices that stand the test of time.
//         </p>
//         <button className="about-cta-button">
//           Contact Us Today
//           <img src={arrowRight} alt="Arrow right" />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;