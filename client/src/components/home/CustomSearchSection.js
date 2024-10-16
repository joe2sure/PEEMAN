import React from 'react';
import '../../styles/components/home/CustomSearchSection.css';
import buyIcon from '../../assets/icons/home/buy-icon.svg';
import rentIcon from '../../assets/icons/home/rent-icon.svg';
import SellIcon from '../../assets/icons/home/sell-icon.svg';


const CustomSearchSection = () => {
  return (
    <section className="customize-search">
      <h2>Customize Your Search</h2>
      <p>We let you tell us what kind of property you want to buy, rent or sell</p>
      <div className="card-container">
        <div className="card">
          <img src={buyIcon} alt="Buy icon" />
          <h3>Buy a Property</h3>
          <p>Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.</p>
        </div>
        <div className="card">
          <img src={rentIcon} alt="Rent icon" />
          <h3>Rent a Property</h3>
          <p>We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</p>
        </div>
        <div className="card">
          <img src={SellIcon} alt="Sell icon" />
          <h3>Sell a Property</h3>
          <p>Whether you sell with new Zillow Offers™ or take another approach, we'll help you navigate the path to a successful sale.</p>
        </div>
      </div>
    </section>
  );
}

export default CustomSearchSection;