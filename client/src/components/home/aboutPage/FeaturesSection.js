import React from 'react';
import { Home, Shield, Users, Clock } from 'lucide-react';
import '../../../styles/components/home/aboutPage/FeatureSection.css';

const features = [
  {
    icon: <Home className="feature-icon" />,
    title: "Find Your Ideal Home",
    description: "We help you discover the perfect property that matches your lifestyle and preferences."
  },
  {
    icon: <Shield className="feature-icon" />,
    title: "Secure Transactions",
    description: "Our platform ensures safe and protected property transactions for your peace of mind."
  },
  {
    icon: <Users className="feature-icon" />,
    title: "Expert Guidance",
    description: "Get support from our experienced real estate professionals throughout your journey."
  },
  {
    icon: <Clock className="feature-icon" />,
    title: "Efficient Process",
    description: "We streamline the property buying and selling process to save you time and effort."
  }
];

const FeatureSection = () => {
  return (
    <section className="features-section">
      <div className="container features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;


// import React from 'react';
// import { featuresData } from '../../../assets/data/aboutPageData';
// import '../../../styles/components/home/aboutPage/FeatureSection.css';

// const FeaturesSection = () => {
//   return (
//     <section className="features">
//       <h2>Why Choose Us?</h2>
//       <div className="features-grid">
//         {featuresData.map((feature) => (
//           <div key={feature.id} className="feature-card">
//             <div className="feature-icon">{feature.icon}</div>
//             <h3>{feature.title}</h3>
//             <p>{feature.description}</p>
//             <button className="btn-text">Read More</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;