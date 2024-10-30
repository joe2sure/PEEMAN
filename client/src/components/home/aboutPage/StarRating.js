import React from 'react';
import '../../../styles/components/home/aboutPage/StarRating.css';

const StarRating = ({ rating }) => {
  return (
    <div className="about-star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`about-star ${star <= Math.floor(rating) ? 'about-filled' : ''} 
                     ${star === Math.ceil(rating) && rating % 1 !== 0 ? 'about-half-filled' : ''}`}
        >
          ★
        </span>
      ))}
      <span className="about-rating-number">{rating}</span>
    </div>
  );
};

export default StarRating;