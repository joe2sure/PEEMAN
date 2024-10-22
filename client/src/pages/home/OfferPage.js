import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchProperties } from '../../redux/actions/propertyActions';
import "../../styles/pages/home/OfferPage.css";
import BuySellRent from "../../components/home/BuySellRent";
import Newsletter from "../../components/home/Newsletter";
import { PropertyCard } from "../../components/home/LatestOffer";
import PropertyInquirySection from "../../components/home/offer/PropertyInquirySection";
import Spinner from "../../utility/Spinner";
import defaultPropertyImage from "../../assets/images/home/property-image.svg";

const ITEMS_PER_PAGE = 6;

const OfferPage = () => {
  const dispatch = useDispatch();
  const { properties: adminProperties, loading, error } = useSelector(state => state.property);
  
  // Local state for pagination
  const [visibleLatestItems, setVisibleLatestItems] = useState(ITEMS_PER_PAGE);
  const [visibleRentItems, setVisibleRentItems] = useState(ITEMS_PER_PAGE);
  const [visibleSaleItems, setVisibleSaleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Transform admin properties to match UI layout
  const transformPropertyData = (adminProperty) => {
    const isRental = adminProperty.propertyType?.toLowerCase().includes('rent') || 
                     adminProperty.propertyType?.toLowerCase().includes('lease');
    
    const price = Number(adminProperty.price);
    const originalPrice = adminProperty.isOffer ? 
      price + (price * Number(adminProperty.discount || 0) / 100) : 
      price;

    const propertyImages = adminProperty.images?.slice(0, 6).map(img => img.url) || [defaultPropertyImage];

    return {
      id: adminProperty.id,
      images: propertyImages,
      image: propertyImages[0],
      forRent: isRental,
      price: price,
      originalPrice: originalPrice,
      title: adminProperty.name,
      location: adminProperty.location,
      bedrooms: Number(adminProperty.beds) || 0,
      bathrooms: Number(adminProperty.baths) || 0,
      parking: adminProperty.parking || null,
      description: adminProperty.description,
      furnished: adminProperty.furnished,
    };
  };

  const transformedProperties = adminProperties.map(transformPropertyData);

  // Filter properties
  const rentProperties = transformedProperties.filter(p => p.forRent);
  const saleProperties = transformedProperties.filter(p => !p.forRent);

  // Handle load more functions
  const handleLoadMoreLatest = () => {
    setVisibleLatestItems(prev => prev + ITEMS_PER_PAGE);
  };

  const handleLoadMoreRent = () => {
    setVisibleRentItems(prev => prev + ITEMS_PER_PAGE);
  };

  const handleLoadMoreSale = () => {
    setVisibleSaleItems(prev => prev + ITEMS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="offer-page-loading">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-page-error">
        <h2>Error loading properties</h2>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchProperties())} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="offer-page">
      <BuySellRent />

      <section className="latest-offers">
        <h2>Our Latest Offers</h2>
        <p>
          Whether you're looking to buy, sell, or rent, we've made it easy for
          you to find exactly what you need. Customize your search by choosing
          the location, property type, and price range that best fits your
          preferences. With just a few clicks, discover homes and properties
          that match your unique criteria.
        </p>
        <div className="property-grid">
          {transformedProperties
            .slice(0, visibleLatestItems)
            .map((property) => (
              <PropertyCard 
                key={property.id} 
                {...property}
                properties={transformedProperties} 
              />
            ))}
        </div>
        {transformedProperties.length > visibleLatestItems && (
          <div className="offer-cta">
            <button onClick={handleLoadMoreLatest} className="load-more">
              Load more options
            </button>
          </div>
        )}
        <div className="offer-cta">
          <p className="cta-text">
            You can also place your own properties up for sale at great prices!
          </p>
          <Link to="/learn-more" className="learn-more">
            Learn More
          </Link>
        </div>
      </section>

      <section className="for-rent">
        <h2>For Rent</h2>
        <div className="property-grid">
          {rentProperties
            .slice(0, visibleRentItems)
            .map((property) => (
              <PropertyCard 
                key={property.id} 
                {...property}
                properties={transformedProperties} 
              />
            ))}
        </div>
        {rentProperties.length > visibleRentItems && (
          <button onClick={handleLoadMoreRent} className="load-more">
            Load more options
          </button>
        )}
      </section>

      <section className="for-sale">
        <h2>For Sale</h2>
        <div className="property-grid">
          {saleProperties
            .slice(0, visibleSaleItems)
            .map((property) => (
              <PropertyCard 
                key={property.id} 
                {...property}
                properties={transformedProperties} 
              />
            ))}
        </div>
        {saleProperties.length > visibleSaleItems && (
          <button onClick={handleLoadMoreSale} className="load-more">
            Load more options
          </button>
        )}
      </section>

      <PropertyInquirySection />
    </div>
  );
};

export default OfferPage;



// import React from "react";
// import { Link } from "react-router-dom";

// import "../../styles/pages/home/OfferPage.css";
// import BuySellRent from "../../components/home/BuySellRent";
// import Newsletter from "../../components/home/Newsletter";
// import { PropertyCard } from "../../components/home/LatestOffer";
// import PropertyInquirySection from "../../components/home/offer/PropertyInquirySection";

// const OfferPage = () => {
//   const properties = [
//     {
//       id: 1,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: true,
//       price: 400000.89,
//       originalPrice: 500000.89,
//       title: "Modern Detached Duplex",
//       location: "New Hampshire, UK",
//       bedrooms: 3,
//       bathrooms: 4,
//       parking: 2,
//     },

//     {
//       id: 2,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: false,
//       price: 350000,
//       originalPrice: 400000,
//       title: "Cozy Suburban Home",
//       location: "Manchester, UK",
//       bedrooms: 4,
//       bathrooms: 3,
//       parking: 1,
//     },
//     {
//       id: 3,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: true,
//       price: 2500,
//       originalPrice: 3000,
//       title: "Luxury City Apartment",
//       location: "London, UK",
//       bedrooms: 2,
//       bathrooms: 2,
//       parking: null,
//     },
//     {
//       id: 4,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: false,
//       price: 550000,
//       originalPrice: 600000,
//       title: "Spacious Family House",
//       location: "Birmingham, UK",
//       bedrooms: 5,
//       bathrooms: 4,
//       parking: 2,
//     },
//     {
//       id: 5,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: true,
//       price: 1800,
//       originalPrice: 2200,
//       title: "Modern Studio Flat",
//       location: "Edinburgh, UK",
//       bedrooms: 1,
//       bathrooms: 1,
//       parking: null,
//     },
//     {
//       id: 6,
//       image: require("../../assets/images/home/property-image.svg").default,
//       forRent: false,
//       price: 450000,
//       originalPrice: 500000,
//       title: "Charming Cottage",
//       location: "Cotswolds, UK",
//       bedrooms: 3,
//       bathrooms: 2,
//       parking: 1,
//     },
//   ];

//   return (
//     <div className="offer-page">
//       <BuySellRent />

//       <section className="latest-offers">
//         <h2>Our Latest Offers</h2>
//         <p>
//           Whether you're looking to buy, sell, or rent, we've made it easy for
//           you to find exactly what you need. Customize your search by choosing
//           the location, property type, and price range that best fits your
//           preferences. With just a few clicks, discover homes and properties
//           that match your unique criteria.
//         </p>
//         <div className="property-grid">
//           {properties.map((property) => <PropertyCard key={property.id} id={property.id} {...property} />

//           )}
//         </div>
//         <div className="offer-cta">
//           <p className="cta-text">
//             You can also place your own properties up for sale at great prices!
//           </p>
//           <Link to="/learn-more" className="learn-more">
//             Learn More
//           </Link>
//         </div>
//       </section>

//       <section className="for-rent">
//         <h2>For Rent</h2>
//         <div className="property-grid">
//           {properties
//             .filter((p) => p.forRent)
//             .map((property) => <PropertyCard key={property.id} id={property.id} {...property} />
//             )}
//         </div>
//         <button className="load-more">Load more options</button>
//       </section>

//       <section className="for-sale">
//         <h2>For Sale</h2>
//         <div className="property-grid">
//           {properties
//             .filter((p) => !p.forRent)
//             .map((property) => <PropertyCard key={property.id} id={property.id} {...property} />
//           )}
//         </div>
//         <button className="load-more">Load more options</button>
//       </section>

//       <PropertyInquirySection />
//     </div>
//   );
// };

// export default OfferPage;
