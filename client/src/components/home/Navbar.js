import React, { useState, useEffect } from 'react';
import '../../styles/components/home/Navbar.css';
import peemanLogo from '../../assets/peeman-logo.svg'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="logo mobile-logo">
          <img src={peemanLogo} alt="Real Estate Logo" />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="sr-only">Toggle menu</span>
          <span className="hamburger"></span>
        </button>
        <div className="nav-content">
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
        </div>
      </div>
    </nav>
  );
}