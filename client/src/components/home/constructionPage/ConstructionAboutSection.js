import React from 'react';
import '../../../styles/components/home/constructionPage/ConstructionAboutSection.css';

const ConstructionAboutSection = () => {
  const stats = [
    { number: '560+', label: 'Projects Done' },
    { number: '180+', label: 'Projects Done' },
    { number: '180+', label: 'Technicians' }
  ];

  const images = [
    require('../../../assets/images/home/property-image-3.svg').default,
    require('../../../assets/images/home/property-image-2.svg').default,
    require('../../../assets/images/home/property-image.svg').default,
  ];

  const features = [
    {
      title: 'Earliest Consultation',
      description: 'Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Aenean vel elit scelerisque mauris pellentesque consectetur adipiscing elit.',
      icon: '👷‍♂️'
    },
    {
      title: 'Customized Solution',
      description: 'Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Purus gravida quis blandit turpis. Dolor sit amet consectetur adipiscing elit.',
      icon: '📄'
    },
    {
      title: 'Affordable Pricing',
      description: 'Quis vel eros donec ac odio tempor. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit.Suspendisse interdum consectetur.',
      icon: '💳'
    },
    {
      title: 'All-In-One Service',
      description: 'Pellentesque id nibh tortor id. Quis vel eros donec ac odio tempor orci. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam.',
      icon: '📝'
    }
  ];

  return (
    <section className="construction-about-section">
      <div className="construction-header">
        <span className="construction-subtitle">24/7 HASSLE-FREE</span>
        <h1>Home And Businesses Installation Services</h1>
        <p className="construction-description">
          Imperdiet massa tincidunt nunc pulvinar sapien. Sit amet facilisis magna etiam odio mollis mollis. Integer lacus ligula, imperdiet vel massa in, maximus suscipit turpis.
        </p>
      </div>

      <div className="construction-content">
        <div className="construction-stats-section">
          <div className="construction-images-container">
            <img src={images[0]} alt="Worker installing light" className="construction-main-image" />
            <div className="construction-secondary-images">
              <img src={images[1]} alt="Installation work" className="construction-secondary-image" />
              <img src={images[2]} alt="Technician at work" className="construction-secondary-image" />
            </div>
          </div>
          
          <div className="construction-stats-card">
            {stats.map((stat, index) => (
              <div key={index} className="construction-stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="construction-features-section">
          {features.map((feature, index) => (
            <div key={index} className="construction-feature-item">
              <span className="construction-feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="construction-contact-section">
          <button className="construction-read-more">Read More</button>
          <div className="construction-phone-number">
            <span className="construction-phone-icon">📞</span>
            <div>
              <h3>000 123 456 789</h3>
              <p>Call For Booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionAboutSection;


// const ConstructionAboutSection = () => {
//   return (
//     <section id="construction-about" className="construction-about-section">
//       <h2>About Us</h2>
//       <p>Victoria Construction specializes in delivering high-quality renovation services.</p>
//     </section>
//   );
// };

// export default ConstructionAboutSection;
