import React, { useState } from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle the section visibility
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src="/src/assets/Bank.png" alt="SmartBank Logo" className="footer-logo" />
          <p>&copy; 2025 DevSquadBank. All Rights Reserved.</p>
        </div>
        <div className="footer-middle">
          <ul className="footer-links">
            <li onClick={() => handleClick('privacy')}><a href="#privacy-policy">Privacy Policy</a></li>
            <li onClick={() => handleClick('terms')}><a href="#terms-of-service">Terms of Service</a></li>
            <li onClick={() => handleClick('aboutYourBank')}><a href="#about-your-bank">About Your DevSquad Bank</a></li> {/* Updated here */}
          </ul>

          {/* Show text content below the clicked tab */}
          <div className={`footer-details ${activeSection === 'privacy' ? 'active' : ''}`}>
            {activeSection === 'privacy' && (
              <p>Your privacy is very important to us. We ensure the protection of your personal data and comply with all regulations to keep it safe.</p>
            )}
          </div>

          <div className={`footer-details ${activeSection === 'terms' ? 'active' : ''}`}>
            {activeSection === 'terms' && (
              <p>By using our services, you agree to our terms. These terms cover your rights, obligations, and the services provided by us.</p>
            )}
          </div>

          <div className={`footer-details ${activeSection === 'aboutYourBank' ? 'active' : ''}`}> {/* Updated here */}
            {activeSection === 'aboutYourBank' && (
              <p>DevSquadBank is committed to providing innovative banking solutions with a focus on security, efficiency, and customer satisfaction. Our mission is to make banking simpler and more accessible to everyone.</p>
            )}
          </div>
        </div>

        <div className="footer-right">
          <div className="social-icons">
            <a href="#" onClick={(e) => e.preventDefault()}><FaFacebookF /></a> {/* Prevent navigation */}
            <a href="#" onClick={(e) => e.preventDefault()}><FaTwitter /></a> {/* Prevent navigation */}
            <a href="#" onClick={(e) => e.preventDefault()}><FaLinkedinIn /></a> {/* Prevent navigation */}
            <a href="#" onClick={(e) => e.preventDefault()}><FaInstagram /></a> {/* Prevent navigation */}
            <a href="#" onClick={(e) => e.preventDefault()}><FaYoutube /></a> {/* Prevent navigation */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
