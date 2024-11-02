import React, { useState, useEffect } from 'react';
import '../../../styles/components/home/blogPage/HeroSection.css';
import propertyImage1 from '../../../assets/images/home/property-image.svg';
import propertyImage2 from '../../../assets/images/home/property-image-2.svg';
import propertyImage3 from '../../../assets/images/home/property-image-3.svg';

const BlogHeroSection = () => {
  const images = [propertyImage1, propertyImage2, propertyImage3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-scroll effect for property images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="blog-hero-section">
      {/* Image overlay */}
      <div className="blog-hero-image-overlay">
        <img 
          src={images[currentImageIndex]} 
          alt="Featured Property" 
          className="blog-hero-carousel-image"
        />
      </div>
      
      {/* Centralized Content */}
      <div className="blog-hero-content">
        <h1>Discover the Latest Real Estate Insights</h1>
        <p>Stay updated with the newest trends and market tips.</p>
        <button className="blog-cta-button">Read More</button>
      </div>
    </section>
  );
};

export default BlogHeroSection;



// import React from 'react';
// import '../../../styles/components/home/blogPage/HeroSection.css';
// import propertyImage from '../../../assets/images/home/property-image.svg'

// const HeroSection = () => {
//   return (
//     <section className="blog-hero-section">
//       <div className="blog-hero-content">
//         <h1>Discover the Latest Real Estate Insights</h1>
//         <p>Stay updated with the newest trends and market tips.</p>
//         <button className="blog-cta-button">Read More</button>
//       </div>
//       <img src={propertyImage} alt="blog-Featured Property" className="blog-hero-image" />
//     </section>
//   );
// };

// export default HeroSection;