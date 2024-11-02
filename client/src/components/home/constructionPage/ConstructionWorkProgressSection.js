import React from 'react';
import '../../../styles/components/home/constructionPage/ConstructionWorkProgressSection.css';

const ConstructionWorkProgressSection = () => {
  const progressData = [
    { label: 'Project Done', percentage: 75 },
    { label: 'Happy Clients', percentage: 90 },
    { label: 'Completed Co.', percentage: 68 },
    { label: 'Creative Cover', percentage: 80 },
  ];

  return (
    <section id="construction-work-progress" className="construction-work-progress-section">
      <h2>Our Work Progress</h2>
      <div className="construction-progress-circles">
        {progressData.map((item, index) => (
          <div className="construction-progress-item" key={index}>
            <div className="construction-circle">
              <span>{item.percentage}%</span>
            </div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConstructionWorkProgressSection;
