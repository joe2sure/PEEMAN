import React from 'react';
import CTASection from '../../components/home/aboutPage/CTASection';
import FeatureSection from '../../components/home/aboutPage/FeaturesSection';
import AgentSection from '../../components/home/aboutPage/AgentSection';
import StatsSection from '../../components/home/aboutPage/StatSection';
import '../../styles/pages/home/AboutPage.css';
import HeroSection from '../../components/home/aboutPage/HeroSection';
import CompanyOverview from '../../components/home/aboutPage/CompanyOverview';
import CoreValues from '../../components/home/aboutPage/CoreValues';
import ExecutiveSection from '../../components/home/aboutPage/ExecutiveSection';
import WhyChooseUs from '../../components/home/aboutPage/WhyChooseUs';



// Main About Page Component
const AboutPage = () => {
  return (
    <div className="about-page">
      <HeroSection />
      <CompanyOverview />
      <StatsSection />
      <CoreValues />
      <ExecutiveSection />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default AboutPage;




// const AboutPage = () => {
//   return (
//     <div className="about-page">
//       <HeroSection />
//       <StatsSection />
//       <FeatureSection />
//       <AgentSection />
//       <CTASection />
//     </div>
//   );
// };

// export default AboutPage;