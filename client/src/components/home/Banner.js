import React from 'react';
import '../../styles/components/home/Banner.css';
import bannerImage from '../../assets/images/home/banner-image.svg';
import arrowRight from '../../assets/icons/home/arrow-right.svg';

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Find Your <i>Dream Home</i><br/> Right Away</h1>
        <p>
          Find your dream property with us and unlock a world of luxurious living. 
          Explore our exceptional collection of homes, apartments, 
          and estates that cater to your unique lifestyle.
        </p>
        <button className="cta-button">
          See our latest offers
          <img src={arrowRight} alt="Arrow right" />
        </button>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Luxurious home" />
      </div>
    </section>
  );
}

export default Banner;