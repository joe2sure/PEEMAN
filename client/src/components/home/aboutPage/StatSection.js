import React from 'react';
import '../../../styles/components/home/aboutPage/StatSection.css';
// import statImage from '../../../assets/images/home/property-image.svg';
import { Building2, Shield, Users, Award, Hammer, Clock, CheckCircle, TrendingUp } from 'lucide-react';


// Stats Section
const StatsSection = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: <Award size={32} /> },
    { number: '200+', label: 'Projects Completed', icon: <Building2 size={32} /> },
    { number: '500+', label: 'Happy Clients', icon: <Users size={32} /> },
    { number: '98%', label: 'Success Rate', icon: <TrendingUp size={32} /> }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;



// const StatsSection = () => {
//   return (
//     <section className="about-stats-section">
//       <div className="about-container about-stats-grid">
//         <div className="about-stats-image">
//           <img 
//             src={statImage}
//             alt="Modern building"
//           />
//         </div>
//         <div className="about-stats-content">
//           <h2>Excellence in Real Estate Services</h2>
//           <p>We're committed to providing exceptional service and guidance throughout your real estate journey.</p>
//           <div className="about-stats-numbers">
//             <div className="about-stat-item">
//               <h3>15k+</h3>
//               <p>Properties Listed</p>
//             </div>
//             <div className="about-stat-item">
//               <h3>8k+</h3>
//               <p>Satisfied Clients</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };