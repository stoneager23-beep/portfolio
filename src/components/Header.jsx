import React, { useState } from 'react';
import './Header.css';
import CvFile from '../assets/resume-faisal-husnain.pdf';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-section">
                    <a href="#hero" className="logo-mark">
                        <span className="logo-letter">H</span>
                    </a>
                    <a href="#hero" className="logo-text">Husnain Faisal</a>
                </div>

                <nav className="main-nav">
                    <a href="#projects">Work</a>
                    <a href="#about">Skills</a>
                    <a href="#experience">Experience</a>
                </nav>

                <div className="action-section">
                    <a href={CvFile} download="resume-faisal-husnain.pdf" className="cv-btn">
                        <span className="material-symbols-outlined cv-icon">download</span>
                        CV
                    </a>
                    <a href="#experience" className="inquiry-btn">
                        Inquiry
                    </a>
                    <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-links">
                    <a href="#hero" onClick={toggleMobileMenu}>Home</a>
                    <a href="#projects" onClick={toggleMobileMenu}>Work</a>
                    <a href="#about" onClick={toggleMobileMenu}>Skills</a>
                    <a href="#experience" onClick={toggleMobileMenu}>Experience</a>
                    <a href={CvFile} download="resume-faisal-husnain.pdf" className="mobile-cv-btn" onClick={toggleMobileMenu}>
                        <span className="material-symbols-outlined">download</span> Download CV
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
