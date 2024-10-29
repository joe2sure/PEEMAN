import React from 'react';
import '../../../styles/components/home/aboutPage/StarRating.css';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.floor(rating) ? 'filled' : ''} 
                     ${star === Math.ceil(rating) && rating % 1 !== 0 ? 'half-filled' : ''}`}
        >
          ★
        </span>
      ))}
      <span className="rating-number">{rating}</span>
    </div>
  );
};

export default StarRating;