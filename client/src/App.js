import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/admin/Navbar.js';
// import LandingPage from './pages/home/landingPage.js';
import LandingPage from './pages/home/landingPage.js'
import LoginPage from './pages/auth/login.js';
import SignupPage from './pages/auth/signUp.js';
import AdminScreen from './pages/admin/adminScreen.js';


function App() {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} 
          />
          <Route
            path="/admin"
            element={
              isAuthenticated && isAdmin ? <AdminScreen /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './App.css';
// import LandingPage from './pages/home/landingPage.js';
// import LoginPage from './pages/auth/login.js';
// import SignupPage from './pages/auth/signUp.js';
// import Navbar from './components/Navbar';
// import DashboardScreen from './pages/admin/dashboardScreen.js';

// function App() {
//   const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route 
//             path="/login" 
//             element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
//           />
//           <Route 
//             path="/signup" 
//             element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} 
//           />
//           <Route
//             path="/admin"
//             element={
//               // isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />
//               isAuthenticated && isAdmin ? <DashboardScreen /> : <Navigate to="/" />
//             }
//           />
//           {/* Catch-all route for undefined routes */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;