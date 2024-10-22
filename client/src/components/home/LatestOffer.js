import React from "react";
import "../../styles/components/home/LatestOffer.css";
import bedroomIcon from "../../assets/icons/home/bedroom-icon.svg";
import bathroomIcon from "../../assets/icons/home/bathroom-icon.svg";
import parkingIcon from "../../assets/icons/home/parking-icon.svg";
import { Link } from "react-router-dom";

export const PropertyCard = ({
  id,
  image,
  forRent,
  price,
  originalPrice,
  title,
  location,
  bedrooms,
  bathrooms,
  parking,
  properties // Pass properties to the card
}) => (
  <Link 
    to={`/property/${id}`} 
    state={{ property: { id, image, forRent, price, originalPrice, title, location, bedrooms, bathrooms, parking }, properties }} // Pass properties in state
    className="property-card-link"
  >
    <div className="property-card">
      <div
        className="property-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="property-tag">{forRent ? "For rent" : "For sale"}</span>
        <span className="property-discount">Use coupon to get discount</span>
      </div>
      <div className="property-details">
        <h3 className="property-price">${price.toLocaleString()}</h3>
        <p className="property-original-price">
          ${originalPrice.toLocaleString()}
        </p>
        <h4 className="property-title">{title}</h4>
        <p className="property-location">{location}</p>
        <div className="property-features">
          <div className="feature">
            <img src={bedroomIcon} className="bedrooms" alt="Bedrooms" />
            <span>{bedrooms} Bedrooms</span>
          </div>
          <div className="feature">
            <img src={bathroomIcon} className="bathrooms" alt="Bathrooms" />
            <span>{bathrooms} Bathrooms</span>
          </div>
          <div className="feature">
            <img src={parkingIcon} className="parking" alt="Parking" />
            <span>{parking ? parking : "No"} Parking</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const LatestOffers = () => {
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
    // Add 5 more property objects here with different details
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
    <section className="latest-offers">
      <h2>Our Latest Offers</h2>
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            properties={properties} // Ensure properties are passed
            {...property}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestOffers;