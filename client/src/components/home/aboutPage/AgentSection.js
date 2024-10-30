import React from 'react'; 
import '../../../styles/components/home/aboutPage/AgentSection.css'; 
 
const agents = [ 
  { 
    name: "Mrs Ochezechukwu Imoh", 
    location: "UK", 
    listings: '-', 
    jobTitle: "Director at Peeman Developers Ltd with a lot of experience in Business industry development and marketing"
  }, 
  { 
    name: "Mr Emmanuel Onwe", 
    location: "UK", 
    listings: '-', 
    jobTitle: "Co-director at Peeman Developers Ltd actively involved in running of the company" 
  }, 
]; 
 
const AgentSection = () => { 
  return ( 
    <section className="about-agents-section"> 
      <div className="about-agents-container"> 
        <h2>Meet The Executives</h2> 
        <div className="about-agents-grid"> 
          {agents.map((agent, index) => ( 
            <div key={index} className="about-agent-card"> 
              {/* <img  
                src={`/api/placeholder/200/200?name=${agent.name}`} 
                alt={agent.name} 
              />  */}
              <div className="about-agent-info"> 
                <h3>{agent.name}</h3> 
                <p className="about-job-title">{agent.jobTitle}</p>
                <p className="about-location">{agent.location}</p> 
                <p className="about-listings">{agent.listings} Listings</p> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
export default AgentSection;




// import React from 'react';
// import '../../../styles/components/home/aboutPage/AgentSection.css';

// const agents = [
//   { name: "Michael Chen", location: "New York", listings: 24 },
//   { name: "Sarah Williams", location: "Los Angeles", listings: 18 },
//   { name: "David Miller", location: "Chicago", listings: 22 },
//   { name: "Emily Parker", location: "Miami", listings: 15 },
//   { name: "James Wilson", location: "Seattle", listings: 20 }
// ];

// const AgentSection = () => {
//   return (
//     <section className="about-agents-section">
//       <div className="about-container">
//         <h2>Our Featured Agents</h2>
//         <div className="about-agents-grid">
//           {agents.map((agent, index) => (
//             <div key={index} className="about-agent-card">
//               <img 
//                 src={`/api/placeholder/200/200`}
//                 alt={agent.name}
//               />
//               <div className="about-agent-info">
//                 <h3>{agent.name}</h3>
//                 <p className="about-location">{agent.location}</p>
//                 <p className="about-listings">{agent.listings} Listings</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AgentSection;
