import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import '../../../styles/components/home/constructionPage/ConstructionProgramSection.css';
import constructionWorker from '../../../assets/images/home/property-image.svg';

const FAQ_ITEMS = [
  {
    question: "How Often Should I Have My Plumbing Inspected?",
    answer: "We recommend having your plumbing inspected at least once a year to catch any small issues before they become costly repairs. Regular maintenance can help extend the lifespan of your plumbing system and ensure everything is functioning efficiently."
  },
  {
    question: "How Do I Choose The Right Masonry Contractor?",
    answer: "Look for licensed and insured contractors with solid experience and positive client reviews. A reputable contractor will provide a detailed quote and explain the scope of work clearly, ensuring transparency throughout the project."
  },
  {
    question: "What Are Some Signs That Masonry Work Needs Repair?",
    answer: "Signs of needed masonry repair include visible cracks in brick or stone, crumbling mortar, discoloration from water damage, or loose bricks. Addressing these issues early can prevent structural problems and maintain the safety and aesthetics of your property."
  },
  {
    question: "What Should I Do If My Toilet Is Constantly Running?",
    answer: "A constantly running toilet usually indicates an issue with the flapper or fill valve. Try adjusting or replacing the flapper first. If the problem persists, contact a professional plumber to prevent water waste and higher bills."
  },
  {
    question: "Do You Offer Eco-Friendly Or Sustainable Options For Your Services?",
    answer: "Yes, we prioritize eco-friendly practices by offering water-saving plumbing fixtures, sustainable building materials, and energy-efficient solutions. We’re committed to reducing environmental impact in all our services."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="construction-faq-item">
    <button 
      onClick={onClick}
      className={`construction-faq-question ${isOpen ? 'construction-open' : ''}`}
    >
      <span>{question}</span>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <div className="construction-faq-answer">
        <p>{answer}</p>
      </div>
    )}
  </div>
);

const ConstructionProgramSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <>
      <section className="construction-faq-section">
        <div className="construction-faq-container">
          {/* Left column - Image and Query Form */}
          <div className="construction-query-column">
            <img 
              src={constructionWorker} 
              alt="Construction workers discussing" 
              className="construction-query-image"
            />
            <div className="construction-query-form">
              <h3>Still Have Questions?</h3>
              <p>Our team is here to provide answers and guidance for all your service needs. Reach out to us with any questions.</p>
              <button className="construction-submit-button">Submit Your Query</button>
            </div>
          </div>

          {/* Right column - FAQ */}
          <div className="construction-faq-content">
            <h2 className="construction-section-subtitle">REPAIR & INSTALLATION</h2>
            <h3 className="construction-section-title">Frequently Asked Questions</h3>
            <div className="construction-faq-list">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Service Section */}
      <section className="construction-schedule-section">
        <div className="construction-schedule-container">
          <div className="construction-schedule-content">
            <img 
              src={constructionWorker} 
              alt="House icon" 
              className="construction-schedule-icon"
            />
            <div className="construction-schedule-text">
              <h2>Ready to Schedule Your First Service?</h2>
              <p>Our team provides reliable, high-quality services tailored to your needs. Get in touch today to start your project.</p>
            </div>
          </div>
          <div className="construction-schedule-buttons">
            <button className="construction-quote-button">Get A Quote</button>
            <button className="construction-book-button">Book Your Services</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConstructionProgramSection;





// import React from 'react';
// import '../../../styles/components/home/constructionPage/ConstructionTrainingProgramSection.css';

// const ConstructionSection = () => {
//   return (
//     <section id="construction-training-program" className="construction-training-program-section">
//       <div className="construction-training-content">
//         <h2>Our Training Program</h2>
//         <p>
//           Our training program is designed to provide an in-depth essential skillset 
//           and knowledge in the construction industry. With a focus on hands-on 
//           experience, safety measures, and modern techniques, we empower our workers 
//           to excel and deliver the highest quality service.
//         </p>
//         <button className="construction-join-button">Join Our Team Training Program</button>
//       </div>
//     </section>
//   );
// };

// export default ConstructionSection;
