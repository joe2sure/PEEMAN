import React, { useState, useEffect } from 'react';
import '../../../styles/components/home/constructionPage/ConstructionHeroSection.css';

const images = [
  require('../../../assets/images/home/construction/images/construction-banner-image-2.png'),
  require('../../../assets/images/home/construction/images/construction-banner-image-1.png'),
  require('../../../assets/images/home/construction/images/construction-banner-image-5.png'),
];

const ConstructionHeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="construction-hero-section"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="overlay"></div>
      <div className="construction-hero-text">
      <h1>Crafting Spaces, Creating Legacies</h1>
        <p>Your vision, our expertise. Together, we build more than just structures; we build dreams that stand the test of time.</p>
        <button className="hero-button">Discover Our Services</button>
      </div>
    </section>
  );
};

export default ConstructionHeroSection;



// import React from 'react';
// import '../../../styles/components/home/constructionPage/ConstructionHeroSection.css';

// const ConstructionHeroSection = () => {
//   return (
//     <section className="construction-hero-section">
//       <div className="construction-hero-text">
//         <h1>Building Dreams, Shaping Futures</h1>
//         <p>Peeman Construction is your trusted partner in commercial renovation.</p>
//       </div>
//     </section>
//   );
// };

// export default ConstructionHeroSection;