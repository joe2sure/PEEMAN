import React from 'react';
import '../../../styles/components/home/aboutPage/AgentSection.css';

const agents = [
  { name: "Michael Chen", location: "New York", listings: 24 },
  { name: "Sarah Williams", location: "Los Angeles", listings: 18 },
  { name: "David Miller", location: "Chicago", listings: 22 },
  { name: "Emily Parker", location: "Miami", listings: 15 },
  { name: "James Wilson", location: "Seattle", listings: 20 }
];

const AgentSection = () => {
  return (
    <section className="agents-section">
      <div className="container">
        <h2>Our Featured Agents</h2>
        <div className="agents-grid">
          {agents.map((agent, index) => (
            <div key={index} className="agent-card">
              <img 
                src={`/api/placeholder/200/200`}
                alt={agent.name}
              />
              <div className="agent-info">
                <h3>{agent.name}</h3>
                <p className="location">{agent.location}</p>
                <p className="listings">{agent.listings} Listings</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
