import React, { useState } from 'react';
import '../../styles/components/home/JobVacanciesAd.css';
import '../../styles/components/home/Modal.css';

const JobVacanciesAd = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Job vacancy data
  const jobVacancies = [
    {
      id: 1,
      title: 'Plumbing Specialist',
      description: 'Experienced plumber needed for residential and commercial projects',
      image: require('../../assets/images/home/construction/images/plumber-img.jpeg'),
      category: 'plumbing',
      fullDescription: 'We are seeking a skilled Plumbing Specialist with extensive experience in both residential and commercial plumbing projects.',
      roles: [
        'Install and repair plumbing systems',
        'Diagnose and fix plumbing issues',
        'Maintain and service plumbing equipment'
      ],
      pay: '$25 - $35 per hour',
      requirements: [
        'Valid plumbing license',
        '5+ years of experience',
        'Strong problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'Master Carpenter',
      description: 'Skilled carpenter wanted for custom woodworking and construction',
      image: require('../../assets/images/home/construction/images/carpenter-img.jpeg'),
      category: 'carpentry',
      fullDescription: 'Our company is looking for a highly skilled Master Carpenter with expertise in custom woodworking and construction.',
      roles: [
        'Create custom woodworking pieces',
        'Read and interpret construction blueprints',
        'Install and repair wooden structures'
      ],
      pay: '$30 - $45 per hour',
      requirements: [
        'Proven carpentry skills',
        'Ability to read blueprints',
        'Attention to detail'
      ]
    },
    {
      id: 3,
      title: 'Construction Manager',
      description: 'Leadership role overseeing large-scale building projects',
      image: require('../../assets/images/home/construction/images/builder-img.jpeg'),
      category: 'building',
      fullDescription: 'We are seeking an experienced Construction Manager to lead and oversee large-scale building projects.',
      roles: [
        'Manage project timelines and budgets',
        'Coordinate construction teams',
        'Ensure compliance with safety regulations'
      ],
      pay: '$70,000 - $90,000 per year',
      requirements: [
        'Construction management degree',
        '7+ years of experience',
        'Strong leadership skills'
      ]
    }
  ];

  const openJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleApplyNow = () => {
    alert(`Applying for ${selectedJob.title}`);
    closeModal();
  };

  return (
    <>
      <section className="job-vacancies-ad">
        <div className="job-vacancies-container">
          <h2 className="job-section-title">Current Job Vacancies</h2>
          <div className="job-grid">
            {jobVacancies.map((job) => (
              <div 
                key={job.id} 
                className="job-card"
                onClick={() => openJobModal(job)}
              >
                <div className="job-image-container">
                  <img 
                    src={job.image} 
                    alt={job.title} 
                    className="job-image"
                  />
                </div>
                <div className="job-content">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-description">{job.description}</p>
                  <button 
                    className="job-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openJobModal(job);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{selectedJob.title}</h2>
              <button 
                className="modal-close-btn" 
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <section>
                <h3>Job Description</h3>
                <p>{selectedJob.fullDescription}</p>
              </section>

              <section>
                <h3>Key Responsibilities</h3>
                <ul>
                  {selectedJob.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Compensation</h3>
                <p>{selectedJob.pay}</p>
              </section>

              <section>
                <h3>Requirements</h3>
                <ul>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button 
                className="modal-btn modal-btn-apply"
                onClick={handleApplyNow}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobVacanciesAd;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/components/home/JobVacanciesAd.css';

// const JobVacanciesAd = () => {
//   const navigate = useNavigate();

//   // Job vacancy data
//   const jobVacancies = [
//     {
//       id: 1,
//       title: 'Plumbing Specialist',
//       description: 'Experienced plumber needed for residential and commercial projects',
//       image: require('../../assets/images/home/construction/images/plumber-img.jpeg'),
//       category: 'plumbing'
//     },
//     {
//       id: 2,
//       title: 'Master Carpenter',
//       description: 'Skilled carpenter wanted for custom woodworking and construction',
//       image: require('../../assets/images/home/construction/images/carpenter-img.jpeg'),
//       category: 'carpentry'
//     },
//     {
//       id: 3,
//       title: 'Construction Manager',
//       description: 'Leadership role overseeing large-scale building projects',
//       image: require('../../assets/images/home/construction/images/builder-img.jpeg'),
//       category: 'building'
//     }
//   ];

//   const handleJobClick = (job) => {
//     // Navigate to construction page with job details
//     navigate('/construction', { 
//       state: { 
//         jobDetails: job 
//       } 
//     });
//   };

//   return (
//     <section className="job-vacancies-ad">
//       <div className="container">
//         <h2 className="section-title">Current Job Vacancies</h2>
//         <div className="job-grid">
//           {jobVacancies.map((job) => (
//             <div 
//               key={job.id} 
//               className="job-card"
//               onClick={() => handleJobClick(job)}
//             >
//               <div className="job-image-container">
//                 <img 
//                   src={job.image} 
//                   alt={job.title} 
//                   className="job-image"
//                 />
//               </div>
//               <div className="job-content">
//                 <h3 className="job-title">{job.title}</h3>
//                 <p className="job-description">{job.description}</p>
//                 <button className="job-details-btn">View Details</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobVacanciesAd;