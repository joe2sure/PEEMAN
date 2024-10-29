import React from 'react';
import { reviewsData } from '../../../assets/data/aboutPageData';
import StarRating from './StarRating.js';
import '../../../styles/components/home/aboutPage/ReviewSection.css';

const ReviewsSection = () => {
  return (
    <section className="reviews">
      <h2>Clients Review</h2>
      <div className="reviews-grid">
        {reviewsData.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img src={review.avatar} alt={review.name} />
              <div className="review-info">
                <h3>{review.name}</h3>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;