import React from "react";
import '../../../styles/components/home/aboutPage/ExecutiveSection.css';


// Executive Section with Images
const ExecutiveSection = () => {
    const executives = [
      {
        name: 'Mrs Ochezechukwu Imoh',
        title: 'Director',
        location: 'UK',
        bio: 'Director at Peeman Developers Ltd with extensive experience in business development and strategic marketing within the construction industry.',
        image: '/path/to/executive1.jpg', // Replace with actual image path
        initials: 'OI'
      },
      {
        name: 'Mr Emmanuel Onwe',
        title: 'Co-Director',
        location: 'UK',
        bio: 'Co-director at Peeman Developers Ltd, actively involved in operations management and company strategic direction.',
        image: require('../../../assets/images/home/emmanuel.png'), // Replace with actual image path
        initials: 'EO'
      },
      {
        name: 'Jai Davida',
        title: 'Human Resource Manager',
        location: 'UK',
        bio: 'Senior project manager with years of experience in overseeing large-scale construction projects and ensuring quality delivery.',
        image: require('../../../assets/images/home/about/jai_davida.jpeg'), // Replace with actual image path
        initials: 'JD'
      }
    ];
  
    return (
      <section className="executive-section">
        <div className="container">
          <h2 className="section-title centered">Meet Our Leadership</h2>
          <p className="section-subtitle">
            Experienced professionals driving our vision forward
          </p>
          <div className="executive-grid">
            {executives.map((exec, index) => (
              <div key={index} className="executive-card">
                <div className="executive-image">
                  {/* Replace the div below with actual image when available */}
                  <img src={exec.image} alt={exec.name} className="exec-photo" />
                  {/* <div className="image-placeholder-exec">
                    {exec.initials}
                  </div> */}
                </div>
                <div className="executive-info">
                  <h3 className="executive-name">{exec.name}</h3>
                  <p className="executive-title">{exec.title}</p>
                  <p className="executive-location">📍 {exec.location}</p>
                  <p className="executive-bio">{exec.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default ExecutiveSection;
