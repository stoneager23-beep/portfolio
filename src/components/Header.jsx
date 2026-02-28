import React, { useState } from 'react';
import './Header.css';
import CvFile from '../assets/resume.pdf';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-section">
                    <div className="logo-icon luxury-border gold-glow">
                        <span className="material-symbols-outlined">temp_preferences_custom</span>
                    </div>
                    <h2 className="logo-text">Husnain Faisal</h2>
                </div>

                <nav className="main-nav glass-card">
                    <a href="#hero">Home</a>
                    <a href="#about">About</a>
                    <a href="#projects">Portfolio</a>
                    <a href="#experience">Experience</a>
                </nav>

                <div className="action-section">
                    <a href={CvFile} download="Husnain-Faisal-CV.pdf" className="cv-btn glass-card group">
                        <span className="material-symbols-outlined text-gold mr-2 text-sm group-hover:animate-bounce">download</span>
                        CV
                    </a>
                    <a href="#experience" className="inquiry-btn luxury-border gold-glow" style={{ textDecoration: 'none' }}>
                        Inquiry
                    </a>
                    <button className="mobile-menu-btn text-gold" onClick={toggleMobileMenu}>
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-links">
                    <a href="#hero" onClick={toggleMobileMenu}>Home</a>
                    <a href="#about" onClick={toggleMobileMenu}>About</a>
                    <a href="#projects" onClick={toggleMobileMenu}>Portfolio</a>
                    <a href="#experience" onClick={toggleMobileMenu}>Experience</a>
                    <a href={CvFile} download="Husnain-Faisal-CV.pdf" className="mobile-cv-btn" onClick={toggleMobileMenu}>
                        <span className="material-symbols-outlined text-sm mr-2">download</span> Download CV
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
