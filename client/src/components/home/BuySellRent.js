import React, { useState } from 'react';
import '../../styles/components/home/BuySellRent.css';
import locationIcon from '../../assets/icons/home/location-icon.svg';
import propertyTypeIcon from '../../assets/icons/home/property-type-icon.svg';
import priceRangeIcon from '../../assets/icons/home/price-range-icon.svg';



const BuySellRent = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  return (
    <section className="buy-sell-rent">
      <h2>Buy, Sell, Rent!</h2>

      <p>
        Whether you're looking to buy, sell, or rent, we've made it easy for you to find exactly what you need. 
        Customize your search by choosing the location, property type, and price range that best fits your preferences. 
        With just a few clicks, discover homes and properties that match your unique criteria.
      </p>
      <div className="filter-container">
        <div className="filter-label">Enter your preference</div>
        <div className="filter-content">
          <div className="filter-item">
            <img src={locationIcon} alt="Location icon" />
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Location</option>
              <option value="wolverhampton">Wolverhampton</option>
              <option value="bilston">Bilston</option>
              <option value="walsall">Walsall </option>
              <option value="west-bromwich">West Bromwich</option>
            </select>
          </div>
          <div className="filter-item">
            <img src={propertyTypeIcon} alt="Property type icon" />
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
          </div>
          <div className="filter-item">
            <img src={priceRangeIcon} alt="Price range icon" />
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">Price Range</option>
              <option value="0-100000">£0 - £100,000</option>
              <option value="100000-500000">£100,000 - £500,000</option>
              <option value="500000+">£500,000+</option>
            </select>
          </div>
        </div>
        <button className="search-btn">Search</button>
      </div>
    </section>
  );
}

export default BuySellRent;