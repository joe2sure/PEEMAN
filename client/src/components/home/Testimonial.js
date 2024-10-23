import React, { useState, useEffect } from 'react';
import '../../styles/components/home/Testimonial.css';
import testimonialBg from '../../assets/images/home/testimonial-bg.svg';
import testimonialFigure from '../../assets/images/home/testimonial-figure.svg';

const testimonials = [
  {
    name: 'Sunday Okoro',
    image: require('../../assets/images/home/sunday_okoro.svg').default,
    text: 'Thanks to their expertise, we found our dream home in a competitive market. Their negotiation skills saved us thousands!',
  },
  {
    name: 'Joe Onwe',
    image: require('../../assets/images/home/my_pic.svg').default,
    text: 'As first-time homebuyers, we appreciated their patient guidance through every step of the process. Truly outstanding service.',
  },
  {
    name: 'Ugonna Anamekwe',
    image: require('../../assets/images/home/testimonial_pic.svg').default,
    text: 'They helped us sell our property above asking price in just two weeks. Their market knowledge is exceptional!',
  },
  {
    name: 'Miera Oke',
    image: require('../../assets/images/home/testimonial_pic3.svg').default,
    text: 'Their property management services have made being a landlord completely stress-free. Highly recommended!',
  },
  {
    name: 'Peace Onwe',
    image: require('../../assets/images/home/testimonial_pic2.svg').default,
    text: 'The virtual tours and digital documentation process made buying our vacation home from overseas seamless.',
  }
];

const contentMessages = [
  {
    heading: "Experience the difference of working with true real estate professionals",
    text: "Our dedicated team of experts is committed to making your real estate journey smooth and successful. See what our satisfied clients have to say about their experiences."
  },
  {
    heading: "Your dream home is just one consultation away",
    text: "We combine local market expertise with personalized service to help you find the perfect property. Let our track record speak for itself."
  },
  {
    heading: "Trust, integrity, and results in every transaction",
    text: "From first-time buyers to seasoned investors, we provide unmatched service that consistently exceeds expectations."
  },
  {
    heading: "Making real estate dreams come true...",
    text: "Our proven track record of success and satisfied clients speaks volumes about our commitment to excellence in real estate."
  },
  {
    heading: "Your property journey begins with the right partner",
    text: "Whether buying, selling, or investing, our expertise ensures you achieve the best possible outcomes in any market condition."
  }
];

export default function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    let intervalId;
    
    if (isAutoScrolling) {
      intervalId = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Change testimonial every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoScrolling]);

  const nextTestimonial = () => {
    setIsAutoScrolling(false); // Pause auto-scroll when manually navigating
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoScrolling(false); // Pause auto-scroll when manually navigating
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial">
      <div 
        className="testimonial-container" 
        style={{ backgroundImage: `url(${testimonialBg})`, width: '100%' }}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        <div className="testimonial-left">
          <div className="testimonial-image">
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].name} 
            />
          </div>
          <div 
            className="testimonial-info" 
            style={{ backgroundImage: `url(${testimonialFigure})` }}
          >
            <h3>{testimonials[currentTestimonial].name}</h3>
            <p>{testimonials[currentTestimonial].text}</p>
          </div>
        </div>
        <div className="testimonial-content">
          <h2>{contentMessages[currentTestimonial].heading}</h2>
          <p>{contentMessages[currentTestimonial].text}</p>
          <div className="testimonial-navigation">
            <button onClick={prevTestimonial} className="prev-btn">&larr;</button>
            <button onClick={nextTestimonial} className="next-btn">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}





// import React, { useState } from 'react';
// import '../../styles/components/home/Testimonial.css';
// import testimonialBg from '../../assets/images/home/testimonial-bg.svg';
// import testimonialFigure from '../../assets/images/home/testimonial-figure.svg';


// const testimonials = [
//   {
//     name: 'Joe Onwe',
//     image: require('../../assets/images/home/testimonial_pic3.svg').default,
//     text: 'We like the final result of this project. It\'s extraordinary and also provides the best service to the client.',
//   },
//   {
//     name: 'Sarah Johnson',
//     image: require('../../assets/images/home/testimonial_pic2.svg').default,
//     text: 'The team was incredibly professional and helped us find our dream home in record time.',
//   },
//   {
//     name: 'Michael Chen',
//     image: require('../../assets/images/home/testimonial_pic.svg').default,
//     text: 'Their expertise in the local market made selling our property a smooth and profitable experience.',
//   },
// ];

// export default function Testimonial() {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <section className="testimonial">
//       <div className="testimonial-container" style={{ backgroundImage: `url(${testimonialBg})`, width: '100%' }}>
//         <div className="testimonial-left">
//           <div className="testimonial-image">
//             <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
//           </div>
//           <div className="testimonial-info" style={{ backgroundImage: `url(${testimonialFigure})` }}>
//             <h3>{testimonials[currentTestimonial].name}</h3>
//             <p>{testimonials[currentTestimonial].text}</p>
//           </div>
//         </div>
//         <div className="testimonial-content">
//           <h2>We like the final result of this project, it's extraordinary and also provides the best service to the client</h2>
//           <p>
//             We are here to help you build an excellent build. With us, nothing is impossible. 
//             See what we have done and what they have to say about our work performance.
//           </p>
//           <div className="testimonial-navigation">
//             <button onClick={prevTestimonial} className="prev-btn">&larr;</button>
//             <button onClick={nextTestimonial} className="next-btn">&rarr;</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }