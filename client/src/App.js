import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import LandingPage from './pages/home/landingPage.js';
import LoginPage from './pages/auth/login.js';
import AdminDashboard from './pages/admin/dashbaord.js';
import SignupPage from './pages/auth/signUp.js';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component

function App() {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/admin"
            element={
              isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
