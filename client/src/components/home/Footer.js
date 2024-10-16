import React from 'react';
import '../../styles/components/home/Footer.css';
import peemanLogo from '../../assets/peeman-logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <img src={peemanLogo} alt="Real Estate Logo" className="footer-logo" />
          <p>
            Feedback and insight from our customers and website visitors are used 
            by UX designers, researchers and marketers to improve user experience.
          </p>
          <p className="copyright">2024© All rights reserved by PEEMAN & Joe</p>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#mobile">Mobile</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#how-we-work">How we work</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#questions">Questions</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Others</h3>
          <ul>
            <li><a href="#terms">Terms of Use</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#cookie">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;