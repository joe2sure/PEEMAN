import React, { useState, useEffect } from 'react';

import Banner from '../../components/home/Banner.js';
import CustomSearchSection from '../../components/home/CustomSearchSection.js';
import BuySellRent from '../../components/home/BuySellRent.js';
import LatestOffers from '../../components/home/LatestOffer.js';
import Testimonial from '../../components/home/Testimonial.js';
import Newsletter from '../../components/home/Newsletter.js';
import Navbar from '../../components/home/Navbar.js';
import Footer from '../../components/home/Footer.js';
import '../../App.css';

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

const LandingPage = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Banner />
        <CustomSearchSection />
        <BuySellRent />
        <LatestOffers />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop /> 
    </div>
  );
};

export default LandingPage;






// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProperties } from '../../redux/actions/propertyActions.js';
// // import PropertyCard from '../../components/PropertyCard.js';
// import Spinner from '../../utility/Spinner.js';
// import Toaster from '../../utility/Toaster.js';
// import '../../styles/pages/home/landingPage.css';
// import PropertyCard from '../../components/admin/PropertyCard.js';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const { properties, loading, error } = useSelector(state => state.property);
//   const [toaster, setToaster] = useState(null);

//   useEffect(() => {
//     dispatch(fetchProperties());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       setToaster({ message: error, type: 'error' });
//     } else {
//       setToaster(null);
//     }
//   }, [error]);

//   const handleToasterClose = () => {
//     setToaster(null);
//   };

//   return (
//     <div className="landing-page">
//       <h1>Welcome to Our Real Estate App</h1>
//       {loading ? (
//         <Spinner />
//       ) : error ? (
//         <div className="error-message">Error: {error}</div>
//       ) : properties.length === 0 ? (
//         <div className="no-properties">No properties available at the moment.</div>
//       ) : (
//         <div className="property-grid">
//           {properties.map(property => (
//             <PropertyCard key={property.id} property={property} />
//           ))}
//         </div>
//       )}
//       {toaster && (
//         <Toaster
//           message={toaster.message}
//           type={toaster.type}
//           onClose={handleToasterClose}
//         />
//       )}
//     </div>
//   );
// };

// export default LandingPage;