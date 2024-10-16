
import React, { useState } from 'react';
import '../../styles/components/home/Testimonial.css';
import testimonialBg from '../../assets/images/home/testimonial-bg.svg';
import testimonialFigure from '../../assets/images/home/testimonial-figure.svg';


const testimonials = [
  {
    name: 'Jacob Molen',
    image: require('../../assets/images/home/jacob-molen.svg').default,
    text: 'We like the final result of this project. It\'s extraordinary and also provides the best service to the client.',
  },
  {
    name: 'Sarah Johnson',
    image: require('../../assets/images/home/jacob-molen.svg').default,
    text: 'The team was incredibly professional and helped us find our dream home in record time.',
  },
  {
    name: 'Michael Chen',
    image: require('../../assets/images/home/emmanuel.png').default,
    text: 'Their expertise in the local market made selling our property a smooth and profitable experience.',
  },
];

export default function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial">
      <div className="testimonial-container" style={{ backgroundImage: `url(${testimonialBg})`, width: '100%' }}>
        <div className="testimonial-left">
          <div className="testimonial-image">
            <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
          </div>
          <div className="testimonial-info" style={{ backgroundImage: `url(${testimonialFigure})` }}>
            <h3>{testimonials[currentTestimonial].name}</h3>
            <p>{testimonials[currentTestimonial].text}</p>
          </div>
        </div>
        <div className="testimonial-content">
          <h2>We like the final result of this project, it's extraordinary and also provides the best service to the client</h2>
          <p>
            We are here to help you build an excellent build. With us, nothing is impossible. 
            See what we have done and what they have to say about our work performance.
          </p>
          <div className="testimonial-navigation">
            <button onClick={prevTestimonial} className="prev-btn">&larr;</button>
            <button onClick={nextTestimonial} className="next-btn">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}