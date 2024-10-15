import React from 'react';
import '../../styles/components/admin/PropertyCard.css';

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img src={property.images[0].url} alt={property.name} className="property-image" />
      <div className="property-details">
        <h2 className="property-name">{property.name}</h2>
        <p className="property-location">{property.location}</p>
        <p className="property-info">
          {property.beds} beds • {property.baths} baths
        </p>
        <div className="property-price">
          <span className="price">
            ${property.isOffer && property.discountPrice
              ? property.discountPrice.toLocaleString()
              : property.price.toLocaleString()}
          </span>
          {property.isOffer && (
            <span className="original-price">${property.price.toLocaleString()}</span>
          )}
        </div>
        <div className="property-tags">
          <span className="property-type">{property.propertyType}</span>
          {property.furnished && <span className="furnished">Furnished</span>}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;