import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../redux/actions/authActions';
import '../../styles/components/admin/Navbar.css';
import { logoutUser } from '../../redux/actions/authActions';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    // Optionally navigate to the home page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.svg" alt="Logo" className="navbar-logo-image" />
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <span className="navbar-welcome">Welcome, {user?.username}</span>
              {isAdmin && (
                <Link to="/admin" className="navbar-link">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="navbar-button navbar-button-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-button navbar-button-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;