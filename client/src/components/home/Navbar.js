import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/components/home/Navbar.css";
import peemanLogo from "../../assets/peeman-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, isAdmin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  // Helper function to determine if a link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="navbar-container">
        <div className="logo mobile-logo">
          <Link to="/" className="navbar-logo">
            <img src={peemanLogo} alt="Real Estate Logo" />
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="sr-only">Toggle menu</span>
          <span className="hamburger"></span>
        </button>
        <div className="nav-content">
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={isLinkActive('/') ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/offers" 
                className={isLinkActive('/offers') ? 'active' : ''}
              >
                Offers
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className={isLinkActive('/blog') ? 'active' : ''}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={isLinkActive('/about') ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={isLinkActive('/contact') ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link 
                  to="/admin" 
                  className={`navbar-link ${isLinkActive('/admin') ? 'active' : ''}`}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <div className="navbar-welcome">
              <span>Welcome, {user?.username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={handleLogin}>Login</button>
              <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../styles/components/home/Navbar.css";
// import peemanLogo from "../../assets/peeman-logo.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../../redux/actions/authActions";  // assuming the action is imported here

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { isAuthenticated, isAdmin, user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/");  // Navigate to home after logout
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   const handleSignup = () => {
//     navigate("/signup");
//   };

//   return (
//     <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
//       <div className="navbar-container">
//         <div className="logo mobile-logo">
//           <Link to="/" className="navbar-logo">
//             <img src={peemanLogo} alt="Real Estate Logo" />
//           </Link>
//         </div>
//         <button className="menu-toggle" onClick={toggleMenu}>
//           <span className="sr-only">Toggle menu</span>
//           <span className="hamburger"></span>
//         </button>
//         <div className="nav-content">
//           <ul className="nav-links">
//             <li>
//               <Link to="/" className="active">Home</Link>
//             </li>
//             <li>
//               <Link to="/offers">Offers</Link>
//             </li>
//             <li>
//               <Link to="/blog">Blog</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//             {isAdmin && (
//               <li>
//                 <Link to="/admin" className="navbar-link">Admin Dashboard</Link>
//               </li>
//             )}
//           </ul>
//           {isAuthenticated ? (
//             <div className="navbar-welcome">
//               <span>Welcome, {user?.username}</span>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </div>
//           ) : (
//             <div className="auth-buttons">
//               <button className="login-btn" onClick={handleLogin}>Login</button>
//               <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }