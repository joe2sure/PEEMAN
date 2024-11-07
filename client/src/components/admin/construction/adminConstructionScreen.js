import React, { useState, useEffect } from 'react';
import '../../../styles/components/admin/construction/AdminConstruction.css';

// Sample construction project data
const sampleData = [
  {
    id: 1,
    name: 'Residential Complex',
    status: 'In Progress',
    startDate: '2023-04-01',
    endDate: '2024-12-31',
    budget: 5000000,
    spentAmount: 3200000
  },
  {
    id: 2,
    name: 'Commercial Office Building',
    status: 'Completed',
    startDate: '2022-07-15',
    endDate: '2023-06-30',
    budget: 8500000,
    spentAmount: 8200000
  },
  {
    id: 3,
    name: 'Mixed-Use Development',
    status: 'Planning',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    budget: 12000000,
    spentAmount: 500000
  }
];

const AdminConstructionScreen = () => {
  const [projects, setProjects] = useState(sampleData);
  const [newProject, setNewProject] = useState({
    name: '',
    status: 'Planning',
    startDate: '',
    endDate: '',
    budget: 0,
    spentAmount: 0
  });

  const handleCreateProject = () => {
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    setNewProject({
      name: '',
      status: 'Planning',
      startDate: '',
      endDate: '',
      budget: 0,
      spentAmount: 0
    });
  };

  const handleEditProject = (id) => {
    // Add logic to edit the selected project
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="construction-admin-screen">
      <div className="admin-construction-header">
        <h2>Construction Projects</h2>
        <button className="admin-construction-btn admin-construction-btn-primary" onClick={handleCreateProject}>+ Add New Project</button>
      </div>
      <div className="admin-construction-projects-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>£{project.budget.toLocaleString()}</td>
                <td>£{project.spentAmount.toLocaleString()}</td>
                <td>
                  <button className="admin-construction-btn admin-construction-btn-icon" onClick={() => handleEditProject(project.id)}>
                    <i className="admin-construction-edit-icon"></i>
                  </button>
                  <button className="admin-construction-btn admin-construction-btn-icon" onClick={() => handleDeleteProject(project.id)}>
                    <i className="admin-construction-delete-icon"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConstructionScreen;


// import React from 'react';
// import '../../../styles/components/admin/construction/AdminConstruction.css';


// const AdminConstructionScreen = ({ title }) => (
//   <div className="dummy-screen">
//     <h2>{title}</h2>
//     <p>This is a placeholder content for {title}.</p>
//   </div>
// );

// export default AdminConstructionScreen;