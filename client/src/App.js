import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
// import Navbar from './components/admin/Navbar.js';
// import LandingPage from './pages/home/landingPage.js';
import LandingPage from './pages/home/landingPage.js'
import LoginPage from './pages/auth/login.js';
import SignupPage from './pages/auth/signUp.js';
import AdminScreen from './pages/admin/adminScreen.js';
import OfferPage from './pages/home/OfferPage.js';
import Footer from './components/home/Footer.js';
import PropertyDetailPage from './pages/home/PropertyDetail.js';
import Newsletter from './components/home/Newsletter.js';
import Navbar from './components/home/Navbar.js';
import MainDashboard from './pages/newAdmin/mainDashboard.js';


function App() {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/offers" element={<OfferPage />} /> 
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          {/* <Route path="/blog" element={<BlogPage />} />     
          <Route path="/about" element={<AboutPage />} />   
          <Route path="/contact" element={<ContactPage />} /> */}
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
          {/* <Route
            path="/admin"
            element={
              isAuthenticated && isAdmin ? <MainDashboard /> : <Navigate to="/" />
            }
          /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Newsletter />
        <Footer/>
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