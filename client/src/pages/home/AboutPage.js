import React from 'react';
import CTASection from '../../components/home/aboutPage/CTASection';
import FeatureSection from '../../components/home/aboutPage/FeaturesSection';
import AgentSection from '../../components/home/aboutPage/AgentSection';
import StatsSection from '../../components/home/aboutPage/StatSection';
import '../../styles/pages/home/AboutPage.css';
import HeroSection from '../../components/home/aboutPage/HeroSection';

const AboutPage = () => {
  return (
    <div className="about-page">
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <AgentSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;




// import React from 'react';
// import HeroSection from '../../components/home/aboutPage/HeroSection.js';
// import FeaturesSection from '../../components/home/aboutPage/FeaturesSection.js';
// import PropertiesSection from '../../components/home/aboutPage/PropertiesSection.js';
// import ReviewsSection from '../../components/home/aboutPage/ReviewsSection.js';
// import '../../styles/pages/home/AboutPage.css';

// const AboutPage = () => {
//   return (
//     <div className="about-page">
//       <HeroSection />
//       <FeaturesSection />
//       <PropertiesSection />
//       <ReviewsSection />
//     </div>
//   );
// };

// export default AboutPage;