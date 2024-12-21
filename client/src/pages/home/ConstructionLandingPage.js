import React, { useState, useEffect, Suspense, lazy } from 'react';
import '../../styles/pages/home/ConstructionLandingPage.css';
import Spinner from '../../utility/Spinner';


// Lazy load all components
const ConstructionHeroSection = lazy(() => import('../../components/home/constructionPage/ConstructionHeroSection'));
const ConstructionAboutSection = lazy(() => import('../../components/home/constructionPage/ConstructionAboutSection'));
const ConstructionServicesSection = lazy(() => import('../../components/home/constructionPage/ConstructionServiceSection'));
const ConstructionWorkSection = lazy(() => import('../../components/home/constructionPage/ConstructionWorkSection'));
const ConstructionProgramSection = lazy(() => import('../../components/home/constructionPage/ConstructionProgramSection'));
const ConstructionStatisticsSection = lazy(() => import('../../components/home/constructionPage/ConstructionStatisticsSection'));
const ConstructionBookingSection = lazy(() => import('../../components/home/constructionPage/ConstructionBookingSection'));
const ConstructionPaymentSection = lazy(() => import('../../components/home/constructionPage/ConstructionPaymentSection'));
const ConstructionTestimonialSection = lazy(() => import('../../components/home/constructionPage/ConstructionTestimonialSection'));
const JobVacanciesAd = lazy(() => import('../../components/home/JobVacanciesAd'));

// ScrollToTop Button Component
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

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

// Component to wrap sections with Suspense and intersection observer
const LazySection = ({ children }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {shouldLoad && (
        <Suspense fallback={<Spinner />}>
          {children}
        </Suspense>
      )}
    </div>
  );
};

function ConstructionLandingPage() {
  return (
    <div className="construction-landing-page">
      {/* Hero section loads immediately */}
      <Suspense fallback={<Spinner />}>
        <ConstructionHeroSection />
      </Suspense>

      {/* Other sections load when scrolled into view */}
      <LazySection>
        <ConstructionAboutSection />
      </LazySection>

      <LazySection>
        <ConstructionServicesSection />
      </LazySection>

      <LazySection>
        <ConstructionWorkSection />
      </LazySection>

      <LazySection>
        <JobVacanciesAd />
      </LazySection>

      <LazySection>
        <ConstructionProgramSection />
      </LazySection>

      <LazySection>
        <ConstructionBookingSection />
      </LazySection>

      <LazySection>
        <ConstructionStatisticsSection />
      </LazySection>

      <LazySection>
        <ConstructionPaymentSection />
      </LazySection>

      <LazySection>
        <ConstructionTestimonialSection />
      </LazySection>

      <ScrollToTop />
    </div>
  );
}

export default ConstructionLandingPage;