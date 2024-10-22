import React from "react";
import { Link } from "react-router-dom";

import "../../styles/pages/home/OfferPage.css";
import BuySellRent from "../../components/home/BuySellRent";
import Newsletter from "../../components/home/Newsletter";
import { PropertyCard } from "../../components/home/LatestOffer";
import PropertyInquirySection from "../../components/home/offer/PropertyInquirySection";

const OfferPage = () => {
  const properties = [
    {
      id: 1,
      image: require("../../assets/images/home/property-image.svg").default,
      forRent: true,
      price: 400000.89,
      originalPrice: 500000.89,
      title: "Modern Detached Duplex",
      location: "New Hampshire, UK",
      bedrooms: 3,
      bathrooms: 4,
      parking: 2,
    },

    {
      id: 2,
      image: require("../../assets/images/home/property-image.svg").default,
      forRent: false,
      price: 350000,
      originalPrice: 400000,
      title: "Cozy Suburban Home",
      location: "Manchester, UK",
      bedrooms: 4,
      bathrooms: 3,
      parking: 1,
    },
    {
      id: 3,
      image: require("../../assets/images/home/property-image.svg").default,
      forRent: true,
      price: 2500,
      originalPrice: 3000,
      title: "Luxury City Apartment",
      location: "London, UK",
      bedrooms: 2,
      bathrooms: 2,
      parking: null,
    },
    {
      id: 4,
      image: require("../../assets/images/home/property-image.svg").default,
      forRent: false,
      price: 550000,
      originalPrice: 600000,
      title: "Spacious Family House",
      location: "Birmingham, UK",
      bedrooms: 5,
      bathrooms: 4,
      parking: 2,
    },
    {
      id: 5,
      image: require("../../assets/images/home/property-image.svg").default,
      forRent: true,
      price: 1800,
      originalPrice: 2200,
      title: "Modern Studio Flat",
      location: "Edinburgh, UK",
      bedrooms: 1,
      bathrooms: 1,
      parking: null,
    },
    {
      id: 6,
      image: require("../../assets/images/home/property-image.svg").default,
      forRent: false,
      price: 450000,
      originalPrice: 500000,
      title: "Charming Cottage",
      location: "Cotswolds, UK",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
    },
  ];

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
          {properties.map((property) => <PropertyCard key={property.id} id={property.id} {...property} />
            // <Link key={property.id} to={`/property/${property.id}`} state={{ property, properties }}>
            //   <PropertyCard {...property} />
            // </Link>
          )}
        </div>
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
          {properties
            .filter((p) => p.forRent)
            .map((property) => <PropertyCard key={property.id} id={property.id} {...property} />
              // <Link key={property.id} to={`/property/${property.id}`} state={{ property, properties }}>
              //   <PropertyCard {...property} />
              // </Link>
            )}
        </div>
        <button className="load-more">Load more options</button>
      </section>

      <section className="for-sale">
        <h2>For Sale</h2>
        <div className="property-grid">
          {properties
            .filter((p) => !p.forRent)
            .map((property) => <PropertyCard key={property.id} id={property.id} {...property} />
              // <Link key={property.id} to={`/property/${property.id}`} state={{ property, properties }}>
              //   <PropertyCard {...property} />
              // </Link>
            )}
        </div>
        <button className="load-more">Load more options</button>
      </section>

      <PropertyInquirySection />
    </div>
  );
};

export default OfferPage;