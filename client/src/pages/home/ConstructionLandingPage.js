import React from 'react';
import '../../styles/pages/home/ConstructionLandingPage.css';
import ConstructionHeroSection from '../../components/home/constructionPage/ConstructionHeroSection';
import ConstructionAboutSection from '../../components/home/constructionPage/ConstructionAboutSection';
import ConstructionServicesSection from '../../components/home/constructionPage/ConstructionServiceSection';
import ConstructionWorkProgressSection from '../../components/home/constructionPage/ConstructionWorkProgressSection';
import ConstructionTrainingProgramSection from '../../components/home/constructionPage/ConstructionTrainingProgramSection';



function ConstructionLandingPage() {
  return (
    <div className="construction-landing-page">
      <ConstructionHeroSection />
      <ConstructionAboutSection />
      <ConstructionServicesSection />
      <ConstructionWorkProgressSection />
      <ConstructionTrainingProgramSection />
    </div>
  );
}

export default ConstructionLandingPage;
