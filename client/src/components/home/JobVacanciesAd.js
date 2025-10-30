import React, { useState } from 'react';
import '../../styles/components/home/JobVacanciesAd.css';
import '../../styles/components/home/Modal.css';

const JobVacanciesAd = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobVacancies = [
    {
      id: 1,
      title: 'Plumber',
      occupationCode: '531 (Plumbers, Heating and ventilation, installers and Repairs)',
      description: 'Experienced plumber needed for commercial and private properties',
      image: require('../../assets/images/home/construction/images/plumber-img.jpeg'),
      category: 'plumbing',
      fullDescription: 'We are seeking a skilled Plumber for 1st fix and second fix plumbing in bathrooms and kitchens, boiler and heating installations, repairs, and maintenance across commercial and private properties.',
      jobDetails: {
        type: 'Full-time',
        hours: '40 hours per week minimum',
        schedule: 'Monday to Friday, with Saturday during peak trading times',
        hierarchyLevel: 'Level 1',
      },
      compensation: {
        salary: {
          annual: '£30,960',
          hourly: '£15.88'
        },
        benefits: [
          'Pension',
          '28 days annual leave',
          'Future development and career opportunities',
          'Access to employee assistance program',
          'Competitive overtime rate where applicable',
          'Opportunities for career advancement and skill development',
          'Training and mentoring programs'
        ]
      },
      roles: [
        '1st fix and second fix plumbing for bathrooms and kitchens',
        'Boiler installations',
        'Full heating installations',
        'Repairs and maintenance',
        'Working in commercial and private properties',
        'Ordering correct equipment',
        'Installing and maintaining all forms of plumbing',
        'Drainage maintenance on customer commercial sites',
        'Planned maintenance including jetting drains, interceptor servicing, pump station inspection',
        'Cleaning gullies and ACO\'s',
        'Maintaining and repairing urinals and toilets'
      ],
      requirements: [
        'Plumbing expertise in commercial and residential settings'
      ],
      pay: '£30,960 per annum (£15.88 per hour)',
      googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
    },
    {
      id: 2,
      title: 'Carpenter',
      occupationCode: '5316 (Carpenter and Joiners)',
      description: 'Skilled carpenter for high-quality woodworking and construction',
      image: require('../../assets/images/home/construction/images/carpenter-img.jpeg'),
      category: 'carpentry',
      fullDescription: 'We are seeking a skilled Carpenter to create high-quality entrance gates, outdoor furniture, and support various construction projects.',
      jobDetails: {
        type: 'Full-time',
        hours: '40 hours per week minimum',
        schedule: 'Monday to Friday, with Saturdays during peak trading times',
        hierarchyLevel: 'Level 1',
      },
      compensation: {
        salary: {
          annual: '£30,960',
          hourly: '£15.88'
        },
        benefits: [
          'Pension',
          '28 days annual leave',
          'Future development and career opportunities',
          'Access to employee assistance program',
          'Competitive overtime rate where applicable',
          'Opportunities for career advancement and skill development',
          'Training and mentoring programs'
        ]
      },
      qualifications: [
        'CSCS blue card – carpentry and formwork',
        'NVQ level 2 or higher BTEC/City & Guilds or equivalent in carpentry',
        'Formal apprenticeship or craft trained equivalent',
        'Minimum 2-3 years experience',
        'Experience making gates and garden furniture preferred',
        'Valid car driving license (UK) or international driving permit'
      ],
      personalQualities: [
        'Excellent attention to details',
        'High-quality workmanship',
        'Punctual, hardworking, and trustworthy',
        'Able to work independently and as part of a team',
        'Good communication skills',
        'Able to follow safety guidelines'
      ],
      roles: [
        'Make high-quality entrance gates and outdoor furniture',
        'Use various saws and machinery',
        'Ensure high standard of work and meet deadlines',
        'Provide excellent customer service',
        'Integrate with the team',
        'Undergo training and development',
        'Make measurements and prepare sites for woodwork',
        'Prepare drawings for cabinetry, framing, and construction projects',
        'Select and evaluate materials',
        'Source timber by size, strength, and budget',
        'Assess and review carpentry or joinery refurbishments',
        'Perform finish carpentry including siding, flooring, and built-ins'
      ],
      requirements: [
        'Minimum 2-3 years of carpentry experience',
        'Valid CSCS card',
        'NVQ level 2 or equivalent in carpentry'
      ],
      additionalConsiderations: [
        'Ability to meet skilled worker visa requirements if applying from outside the UK',
        'IELTS certification may be required for international applicants'
      ],
      pay: '£30,960 per annum (£15.88 per hour)',
      googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
    },
    {
      id: 3,
      title: 'Construction Expert',
      description: 'Leadership role overseeing large-scale building projects',
      image: require('../../assets/images/home/construction/images/builder-img.jpeg'),
      category: 'building',
      fullDescription: 'We are seeking an experienced Construction Manager to lead and oversee large-scale building projects.',
      roles: [
        'Manage project timelines and budgets',
        'Coordinate construction teams',
        'Ensure compliance with safety regulations'
      ],
      requirements: [
        'Construction management degree',
        '7+ years of experience',
        'Strong leadership skills'
      ],
      pay: '£32,000 per year',
      googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
    },
    {
      id: 4,
      title: 'Bricklayer',
      occupationCode: '5312 (Bricklayers and Masons)',
      description: 'Skilled bricklayer needed for residential and commercial construction projects',
      image: require('../../assets/images/home/construction/images/bricklayer-img.jpg'),
      category: 'masonry',
      fullDescription: 'We are seeking a skilled Bricklayer to work on residential and commercial construction projects, handling brickwork, blockwork, and stonework with high-quality craftsmanship.',
      jobDetails: {
        type: 'Full-time',
        hours: '40 hours per week minimum',
        schedule: 'Monday to Friday, with Saturdays during peak trading times',
        hierarchyLevel: 'Level 1',
      },
      compensation: {
        salary: {
          annual: '£33,400',
          hourly: '£17.13'
        },
        benefits: [
          'Pension',
          '28 days annual leave',
          'Future development and career opportunities',
          'Access to employee assistance program',
          'Competitive overtime rate where applicable',
          'Opportunities for career advancement and skill development',
          'Training and mentoring programs'
        ]
      },
      qualifications: [
        'CSCS blue card – bricklaying',
        'NVQ level 2 or higher BTEC/City & Guilds or equivalent in bricklaying',
        'Formal apprenticeship or craft trained equivalent',
        'Minimum 2-3 years experience',
        'Experience with various types of brickwork and stonework',
        'Valid car driving license (UK) or international driving permit'
      ],
      personalQualities: [
        'Excellent attention to detail',
        'High-quality workmanship',
        'Punctual, hardworking, and trustworthy',
        'Able to work independently and as part of a team',
        'Good communication skills',
        'Able to follow safety guidelines'
      ],
      roles: [
        'Lay bricks, blocks, and stonework to create walls, foundations, and structures',
        'Interpret architectural drawings and plans',
        'Mix and apply mortar',
        'Cut and shape bricks to fit specific spaces',
        'Create decorative brickwork features',
        'Ensure vertical and horizontal alignment of structures',
        'Apply weatherproofing and finishes',
        'Repair and restore existing brickwork',
        'Maintain a clean and safe work environment',
        'Coordinate with other construction trades',
        'Follow industry standards and building codes',
        'Complete projects according to specifications and deadlines'
      ],
      requirements: [
        'Minimum 2-3 years of bricklaying experience',
        'Valid CSCS card',
        'NVQ level 2 or equivalent in bricklaying'
      ],
      additionalConsiderations: [
        'Ability to meet skilled worker visa requirements if applying from outside the UK',
        'IELTS certification may be required for international applicants'
      ],
      pay: '£30,960 per annum (£15.88 per hour)',
      googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
    },
    {
      id: 5,
      title: 'Painter and Decorator',
      occupationCode: '5323 (Painters and Decorators)',
      description: 'Skilled painter and decorator for interior and exterior painting and decorating projects',
      image: require('../../assets/images/home/construction/images/painter-decorator-img.jpg'),
      category: 'painting',
      fullDescription: 'We are seeking a skilled Painter and Decorator to provide high-quality painting and decorating services for residential and commercial properties, ensuring exceptional finishes and attention to detail.',
      jobDetails: {
        type: 'Full-time',
        hours: '40 hours per week minimum',
        schedule: 'Monday to Friday, with Saturdays during peak trading times',
        hierarchyLevel: 'Level 1',
      },
      compensation: {
        salary: {
          annual: '£33,400',
          hourly: '£17.13'
        },
        benefits: [
          'Pension',
          '28 days annual leave',
          'Future development and career opportunities',
          'Access to employee assistance program',
          'Competitive overtime rate where applicable',
          'Opportunities for career advancement and skill development',
          'Training and mentoring programs'
        ]
      },
      qualifications: [
        'CSCS blue card – painting and decorating',
        'NVQ level 2 or higher BTEC/City & Guilds or equivalent in painting and decorating',
        'Formal apprenticeship or craft trained equivalent',
        'Minimum 2-3 years experience in painting and decorating',
        'Experience with various paint types and application techniques',
        'Valid car driving license (UK) or international driving permit'
      ],
      personalQualities: [
        'Excellent attention to detail and colour coordination',
        'High-quality workmanship and finish',
        'Punctual, hardworking, and trustworthy',
        'Able to work independently and as part of a team',
        'Good communication skills with clients',
        'Able to follow health and safety guidelines',
        'Creative eye for design and aesthetics'
      ],
      roles: [
        'Prepare surfaces by cleaning, sanding, filling holes and cracks',
        'Apply primers, paints, stains, and other finishes to interior and exterior surfaces',
        'Mix and match paint colours according to specifications',
        'Apply wallpaper, vinyl coverings, and decorative finishes',
        'Use brushes, rollers, spray equipment, and other painting tools',
        'Protect surrounding areas and furniture during work',
        'Estimate material and time requirements for projects',
        'Inspect completed work and make necessary touch-ups',
        'Maintain and clean painting equipment and tools',
        'Follow safety procedures when working at heights or with chemicals',
        'Coordinate with other trades on construction sites',
        'Provide excellent customer service and professional advice'
      ],
      requirements: [
        'Minimum 2-3 years of painting and decorating experience',
        'Valid CSCS card for painting and decorating',
        'NVQ level 2 or equivalent in painting and decorating',
        'Knowledge of paint types, application techniques, and surface preparation',
        'Ability to work with ladders and scaffolding safely'
      ],
      additionalConsiderations: [
        'Ability to meet skilled worker visa requirements if applying from outside the UK',
        'IELTS certification may be required for international applicants',
        'Portfolio of previous work may be requested'
      ],
      pay: '£33,400 per annum (£17.13 per hour)',
      googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
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
    if (selectedJob && selectedJob.googleFormLink) {
      // Open Google Form in a new tab
      window.open(selectedJob.googleFormLink, '_blank');
      closeModal();
    } else {
      alert('Application form not available at the moment.');
    }
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
                <p>{selectedJob.fullDescription || selectedJob.description}</p>
              </section>

              <section>
                <h3>Key Responsibilities</h3>
                <ul>
                  {selectedJob.roles && selectedJob.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Compensation</h3>
                <p>{selectedJob.pay}</p>
              </section>

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <section>
                  <h3>Requirements</h3>
                  <ul>
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </section>
              )}
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




// import React, { useState } from 'react';
// import '../../styles/components/home/JobVacanciesAd.css';
// import '../../styles/components/home/Modal.css';

// const JobVacanciesAd = () => {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const jobVacancies = [
//     {
//       id: 1,
//       title: 'Plumber',
//       occupationCode: '531 (Plumbers, Heating and ventilation, installers and Repairs)',
//       description: 'Experienced plumber needed for commercial and private properties',
//       image: require('../../assets/images/home/construction/images/plumber-img.jpeg'),
//       category: 'plumbing',
//       fullDescription: 'We are seeking a skilled Plumber for 1st fix and second fix plumbing in bathrooms and kitchens, boiler and heating installations, repairs, and maintenance across commercial and private properties.',
//       jobDetails: {
//         type: 'Full-time',
//         hours: '40 hours per week minimum',
//         schedule: 'Monday to Friday, with Saturday during peak trading times',
//         hierarchyLevel: 'Level 1',
//       },
//       compensation: {
//         salary: {
//           annual: '£30,960',
//           hourly: '£15.88'
//         },
//         benefits: [
//           'Pension',
//           '28 days annual leave',
//           'Future development and career opportunities',
//           'Access to employee assistance program',
//           'Competitive overtime rate where applicable',
//           'Opportunities for career advancement and skill development',
//           'Training and mentoring programs'
//         ]
//       },
//       roles: [
//         '1st fix and second fix plumbing for bathrooms and kitchens',
//         'Boiler installations',
//         'Full heating installations',
//         'Repairs and maintenance',
//         'Working in commercial and private properties',
//         'Ordering correct equipment',
//         'Installing and maintaining all forms of plumbing',
//         'Drainage maintenance on customer commercial sites',
//         'Planned maintenance including jetting drains, interceptor servicing, pump station inspection',
//         'Cleaning gullies and ACO\'s',
//         'Maintaining and repairing urinals and toilets'
//       ],
//       requirements: [
//         'Plumbing expertise in commercial and residential settings'
//       ],
//       pay: '£30,960 per annum (£15.88 per hour)',
//       googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
//     },
//     {
//       id: 2,
//       title: 'Carpenter',
//       occupationCode: '5316 (Carpenter and Joiners)',
//       description: 'Skilled carpenter for high-quality woodworking and construction',
//       image: require('../../assets/images/home/construction/images/carpenter-img.jpeg'),
//       category: 'carpentry',
//       fullDescription: 'We are seeking a skilled Carpenter to create high-quality entrance gates, outdoor furniture, and support various construction projects.',
//       jobDetails: {
//         type: 'Full-time',
//         hours: '40 hours per week minimum',
//         schedule: 'Monday to Friday, with Saturdays during peak trading times',
//         hierarchyLevel: 'Level 1',
//       },
//       compensation: {
//         salary: {
//           annual: '£30,960',
//           hourly: '£15.88'
//         },
//         benefits: [
//           'Pension',
//           '28 days annual leave',
//           'Future development and career opportunities',
//           'Access to employee assistance program',
//           'Competitive overtime rate where applicable',
//           'Opportunities for career advancement and skill development',
//           'Training and mentoring programs'
//         ]
//       },
//       qualifications: [
//         'CSCS blue card – carpentry and formwork',
//         'NVQ level 2 or higher BTEC/City & Guilds or equivalent in carpentry',
//         'Formal apprenticeship or craft trained equivalent',
//         'Minimum 2-3 years experience',
//         'Experience making gates and garden furniture preferred',
//         'Valid car driving license (UK) or international driving permit'
//       ],
//       personalQualities: [
//         'Excellent attention to details',
//         'High-quality workmanship',
//         'Punctual, hardworking, and trustworthy',
//         'Able to work independently and as part of a team',
//         'Good communication skills',
//         'Able to follow safety guidelines'
//       ],
//       roles: [
//         'Make high-quality entrance gates and outdoor furniture',
//         'Use various saws and machinery',
//         'Ensure high standard of work and meet deadlines',
//         'Provide excellent customer service',
//         'Integrate with the team',
//         'Undergo training and development',
//         'Make measurements and prepare sites for woodwork',
//         'Prepare drawings for cabinetry, framing, and construction projects',
//         'Select and evaluate materials',
//         'Source timber by size, strength, and budget',
//         'Assess and review carpentry or joinery refurbishments',
//         'Perform finish carpentry including siding, flooring, and built-ins'
//       ],
//       requirements: [
//         'Minimum 2-3 years of carpentry experience',
//         'Valid CSCS card',
//         'NVQ level 2 or equivalent in carpentry'
//       ],
//       additionalConsiderations: [
//         'Ability to meet skilled worker visa requirements if applying from outside the UK',
//         'IELTS certification may be required for international applicants'
//       ],
//       pay: '£30,960 per annum (£15.88 per hour)',
//       googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
//     },
//     {
//       id: 3,
//       title: 'Construction Expert',
//       description: 'Leadership role overseeing large-scale building projects',
//       image: require('../../assets/images/home/construction/images/builder-img.jpeg'),
//       category: 'building',
//       fullDescription: 'We are seeking an experienced Construction Manager to lead and oversee large-scale building projects.',
//       roles: [
//         'Manage project timelines and budgets',
//         'Coordinate construction teams',
//         'Ensure compliance with safety regulations'
//       ],
//       requirements: [
//         'Construction management degree',
//         '7+ years of experience',
//         'Strong leadership skills'
//       ],
//       pay: '£32,000 per year',
//       googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
//     },
//     {
//       id: 4,
//       title: 'Bricklayer',
//       occupationCode: '5312 (Bricklayers and Masons)',
//       description: 'Skilled bricklayer needed for residential and commercial construction projects',
//       image: require('../../assets/images/home/construction/images/bricklayer-img.jpg'),
//       category: 'masonry',
//       fullDescription: 'We are seeking a skilled Bricklayer to work on residential and commercial construction projects, handling brickwork, blockwork, and stonework with high-quality craftsmanship.',
//       jobDetails: {
//         type: 'Full-time',
//         hours: '40 hours per week minimum',
//         schedule: 'Monday to Friday, with Saturdays during peak trading times',
//         hierarchyLevel: 'Level 1',
//       },
//       compensation: {
//         salary: {
//           annual: '£30,960',
//           hourly: '£15.88'
//         },
//         benefits: [
//           'Pension',
//           '28 days annual leave',
//           'Future development and career opportunities',
//           'Access to employee assistance program',
//           'Competitive overtime rate where applicable',
//           'Opportunities for career advancement and skill development',
//           'Training and mentoring programs'
//         ]
//       },
//       qualifications: [
//         'CSCS blue card – bricklaying',
//         'NVQ level 2 or higher BTEC/City & Guilds or equivalent in bricklaying',
//         'Formal apprenticeship or craft trained equivalent',
//         'Minimum 2-3 years experience',
//         'Experience with various types of brickwork and stonework',
//         'Valid car driving license (UK) or international driving permit'
//       ],
//       personalQualities: [
//         'Excellent attention to detail',
//         'High-quality workmanship',
//         'Punctual, hardworking, and trustworthy',
//         'Able to work independently and as part of a team',
//         'Good communication skills',
//         'Able to follow safety guidelines'
//       ],
//       roles: [
//         'Lay bricks, blocks, and stonework to create walls, foundations, and structures',
//         'Interpret architectural drawings and plans',
//         'Mix and apply mortar',
//         'Cut and shape bricks to fit specific spaces',
//         'Create decorative brickwork features',
//         'Ensure vertical and horizontal alignment of structures',
//         'Apply weatherproofing and finishes',
//         'Repair and restore existing brickwork',
//         'Maintain a clean and safe work environment',
//         'Coordinate with other construction trades',
//         'Follow industry standards and building codes',
//         'Complete projects according to specifications and deadlines'
//       ],
//       requirements: [
//         'Minimum 2-3 years of bricklaying experience',
//         'Valid CSCS card',
//         'NVQ level 2 or equivalent in bricklaying'
//       ],
//       additionalConsiderations: [
//         'Ability to meet skilled worker visa requirements if applying from outside the UK',
//         'IELTS certification may be required for international applicants'
//       ],
//       pay: '£30,960 per annum (£15.88 per hour)',
//       googleFormLink: 'https://forms.gle/oMNo4b8rA9BoTQAx9'
//     }
//   ];

//   const openJobModal = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedJob(null);
//     setIsModalOpen(false);
//   };

//   const handleApplyNow = () => {
//     if (selectedJob && selectedJob.googleFormLink) {
//       // Open Google Form in a new tab
//       window.open(selectedJob.googleFormLink, '_blank');
//       closeModal();
//     } else {
//       alert('Application form not available at the moment.');
//     }
//   };

//   return (
//     <>
//       <section className="job-vacancies-ad">
//         <div className="job-vacancies-container">
//           <h2 className="job-section-title">Current Job Vacancies</h2>
//           <div className="job-grid">
//             {jobVacancies.map((job) => (
//               <div 
//                 key={job.id} 
//                 className="job-card"
//                 onClick={() => openJobModal(job)}
//               >
//                 <div className="job-image-container">
//                   <img 
//                     src={job.image} 
//                     alt={job.title} 
//                     className="job-image"
//                   />
//                 </div>
//                 <div className="job-content">
//                   <h3 className="job-title">{job.title}</h3>
//                   <p className="job-description">{job.description}</p>
//                   <button 
//                     className="job-details-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openJobModal(job);
//                     }}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Modal */}
//       {isModalOpen && selectedJob && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div 
//             className="modal-container" 
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-header">
//               <h2>{selectedJob.title}</h2>
//               <button 
//                 className="modal-close-btn" 
//                 onClick={closeModal}
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body">
//               <section>
//                 <h3>Job Description</h3>
//                 <p>{selectedJob.fullDescription || selectedJob.description}</p>
//               </section>

//               <section>
//                 <h3>Key Responsibilities</h3>
//                 <ul>
//                   {selectedJob.roles && selectedJob.roles.map((role, index) => (
//                     <li key={index}>{role}</li>
//                   ))}
//                 </ul>
//               </section>

//               <section>
//                 <h3>Compensation</h3>
//                 <p>{selectedJob.pay}</p>
//               </section>

//               {selectedJob.requirements && selectedJob.requirements.length > 0 && (
//                 <section>
//                   <h3>Requirements</h3>
//                   <ul>
//                     {selectedJob.requirements.map((req, index) => (
//                       <li key={index}>{req}</li>
//                     ))}
//                   </ul>
//                 </section>
//               )}
//             </div>

//             <div className="modal-footer">
//               <button 
//                 className="modal-btn modal-btn-cancel"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn modal-btn-apply"
//                 onClick={handleApplyNow}
//               >
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default JobVacanciesAd;