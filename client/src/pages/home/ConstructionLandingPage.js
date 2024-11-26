import React, { useState, useEffect } from 'react';
import '../../styles/pages/home/ConstructionLandingPage.css';
import ConstructionHeroSection from '../../components/home/constructionPage/ConstructionHeroSection';
import ConstructionAboutSection from '../../components/home/constructionPage/ConstructionAboutSection';
import ConstructionServicesSection from '../../components/home/constructionPage/ConstructionServiceSection';
import ConstructionWorkSection from '../../components/home/constructionPage/ConstructionWorkSection';
import ConstructionProgramSection from '../../components/home/constructionPage/ConstructionProgramSection';
import ConstructionStatisticsSection from '../../components/home/constructionPage/ConstructionStatisticsSection';
import ConstructionBookingSection from '../../components/home/constructionPage/ConstructionBookingSection';
import ConstructionPaymentSection from '../../components/home/constructionPage/ConstructionPaymentSection';
import ConstructionTestimonialSection from '../../components/home/constructionPage/ConstructionTestimonialSection';
import JobVacanciesAd from '../../components/home/JobVacanciesAd';


// ScrollToTop Button Component
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {visible && (
        <button onClick={scrollToTop} className="scroll-button">
          ↑
        </button>
      )}
    </div>
  );
};


function ConstructionLandingPage() {
  return (
    <div className="construction-landing-page">
      <ConstructionHeroSection />
      <ConstructionAboutSection />
      <ConstructionServicesSection />
      <ConstructionWorkSection />
      <JobVacanciesAd/>
      <ConstructionProgramSection />
      <ConstructionBookingSection/>
      <ConstructionStatisticsSection/>
      <ConstructionPaymentSection/>
      <ConstructionTestimonialSection/>

      <ScrollToTop /> 
    </div>
  );
}

export default ConstructionLandingPage;
