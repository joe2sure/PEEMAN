import React, { useState, useEffect } from 'react';
import '../../styles/components/home/Navbar.css';
import peemanLogo from '../../assets/peeman-logo.svg'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        {/* Replace with your logo */}
        <img src={peemanLogo} alt="Real Estate Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#offers">Offers</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

// import React from 'react';
// import '../../styles/components/home/Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">RealEstate</div>
//       <ul className="navbar-links">
//         <li><a href="#" className="nav-link active">Home</a></li>
//         <li><a href="#">Offers</a></li>
//         <li><a href="#">Blog</a></li>
//         <li><a href="#">About</a></li>
//         <li><a href="#">Contact</a></li>
//       </ul>
//       <div className="navbar-buttons">
//         <button className="login-btn">Login</button>
//         <button className="signup-btn">Sign Up</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;