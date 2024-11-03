import React, { useState, useEffect } from 'react';
import '../../../styles/components/home/constructionPage/ConstructionTestimonialSection.css';
import constructionWorker1 from '../../../assets/images/home/property-image.svg';
import constructionWorker2 from '../../../assets/images/home/property-image.svg';
import constructionWorker3 from '../../../assets/images/home/property-image.svg';
import constructionWorker4 from '../../../assets/images/home/property-image.svg';

const testimonials = [
  {
    id: 1,
    text: "We hired them for a large-scale office renovation, and they delivered on time and within budget. Their attention to detail and quality workmanship were outstanding. The team went above and beyond to ensure our satisfaction.",
    author: "Alex Johnson",
    role: "Project Manager, TechCorp Inc.",
    rating: 5,
    additionalText: "Their commitment to safety and cleanliness on the job site was particularly impressive. I highly recommend their services to anyone looking for reliable construction solutions.",
    image: constructionWorker1,
  },
  {
    id: 2,
    text: "The team handled the construction of our residential complex with utmost professionalism. The project was completed ahead of schedule, and they kept us updated at every stage. Great experience working with them.",
    author: "Sarah Thompson",
    role: "Real Estate Developer",
    rating: 5,
    additionalText: "Their expertise and commitment to quality made a huge difference in the final outcome. The residents have been thrilled with the results!",
    image: constructionWorker2,
  },
  {
    id: 3,
    text: "Their renovation work on our retail space was top-notch. The team worked quickly and efficiently, ensuring minimal disruption to our business operations. We were very pleased with the final results.",
    author: "Liam Wright",
    role: "Owner, BrightMart Retail",
    rating: 4,
    additionalText: "They were communicative and receptive to feedback throughout the process. Definitely a trustworthy and skilled construction team.",
    image: constructionWorker3,
  },
  {
    id: 4,
    text: "From start to finish, they provided exceptional service for our industrial warehouse project. Their expertise in handling large-scale constructions was evident in every aspect of their work. Highly recommended!",
    author: "Isabella Chen",
    role: "Operations Manager, LogisticWare",
    rating: 5,
    additionalText: "They were highly responsive and met all our specifications. It was a seamless experience, and we look forward to working with them again in the future.",
    image: constructionWorker4,
  },
];

const ConstructionTestimonialSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="construction-testimonial-section">
      <div className="construction-testimonial-container">
        <div className="construction-testimonial-left">
          <div className="construction-testimonial-worker">
            <img 
              src={testimonials[activeSlide].image} 
              alt={`${testimonials[activeSlide].author}`} 
              className="construction-testimonial-worker-image"
            />
          </div>
        </div>

        <div className="construction-testimonial-right">
          <div className="construction-testimonial-header">
            <span className="construction-testimonial-client-says">CLIENT SAYS</span>
            <h2 className="construction-testimonial-happy-customers">Happy Customers</h2>
          </div>

          <div className="construction-testimonial-rating">
            {[...Array(testimonials[activeSlide].rating)].map((_, index) => (
              <span key={index} className="star">★</span>
            ))}
          </div>

          <div className="construction-testimonial-content">
            <p className="construction-testimonial-text">
              {testimonials[activeSlide].text}
            </p>

            <div className="construction-testimonial-footer">
              <div className="construction-testimonial-author-info">
                <img src={testimonials[activeSlide].image} alt={testimonials[activeSlide].author} className="construction-author-image" />
                <div className="construction-testimonial-author-details">
                  <h4>{testimonials[activeSlide].author}</h4>
                  <p>{testimonials[activeSlide].role}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="construction-testimonial-additional-text">
            {testimonials[activeSlide].additionalText}
          </p>
        </div>

        <div className="construction-testimonial-navigation-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`construction-testimonial-dot ${activeSlide === index ? 'construction-testimonial-active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionTestimonialSection;



// import React, { useState, useEffect } from 'react';
// import '../../../styles/components/home/constructionPage/ConstructionTestimonialSection.css';
// import constructionWorker from '../../../assets/images/home/property-image.svg';

// const testimonials = [
//   {
//     id: 1,
//     text: "Donec Volutpat Ligula Nec Ipsum Ultrices Fringilla. Quisque Vitae Est Turpis. Nulla Sodales Convallis Mi, Quis Semper Ante Lacinia Sit Amet. Maecenas Porta Velit A Justo Commodo Mattis At Et Magna. Cras Auctor Felis Erat, Sit Amet Imperdiet Metus Lacinia In.",
//     author: "Consolata Daria",
//     role: "ENTREPRENEUR",
//     rating: 5,
//     additionalText: "Sem viverra aliquet eget sit amet tellus cras. Scelerisque felis imperdiet proin fermentum leo vel orci.Tortor at auctor urna nunc id. Sit amet facilisis magna etiam odio mollis."
//   },
//   // Add more testimonials as needed
// ];

// const ConstructionTestimonialSection = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="construction-testimonial-section">
//       <div className="construction-testimonial-container">
//         <div className="construction-testimonial-left">
//           <div className="construction-testimonial-worker">
//             {/* Worker illustration would go here */}
//             <svg viewBox="0 0 300 400" className="construction-testimonial-worker-illustration">
//               <path d="..." fill="none" stroke="currentColor" />
//             </svg>
//           </div>
//         </div>

//         <div className="construction-testimonial-right">
//           <div className="construction-testimonial-header">
//             <span className="construction-testimonial-client-says">CLIENT SAYS</span>
//             <h2 className="construction-testimonial-happy-customers">Happy Customers</h2>
//           </div>

//           <div className="construction-testimonial-rating">
//             {[...Array(5)].map((_, index) => (
//               <span key={index} className="star">★</span>
//             ))}
//           </div>

//           <div className="construction-testimonial-content">
//             <p className="construction-testimonial-text">
//               {testimonials[activeSlide].text}
//             </p>

//             <div className="construction-testimonial-footer">
//               <div className="construction-testimonial-author-info">
//                 <img src={constructionWorker} alt="" className="construction-author-image" />
//                 <div className="construction-testimonial-author-details">
//                   <h4>{testimonials[activeSlide].author}</h4>
//                   <p>{testimonials[activeSlide].role}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <p className="construction-testimonial-additional-text">
//             {testimonials[activeSlide].additionalText}
//           </p>
//         </div>

//         <div className="construction-testimonial-navigation-dots">
//           {[...Array(4)].map((_, index) => (
//             <button
//               key={index}
//               className={`construction-testimonial-dot ${activeSlide === index ? 'construction-testimonial-active' : ''}`}
//               onClick={() => setActiveSlide(index)}
//               aria-label={`Testimonial ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConstructionTestimonialSection;