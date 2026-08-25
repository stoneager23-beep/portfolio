import React, { useState } from 'react';
import './Header.css';


const Header = ({ onOpenResumeModal }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileCVClick = () => {
        setIsMobileMenuOpen(false);
        if (onOpenResumeModal) {
            onOpenResumeModal();
        }
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
                    <button 
                        type="button" 
                        onClick={onOpenResumeModal} 
                        className="cv-btn"
                        aria-label="Download CV options"
                    >
                        <span className="material-symbols-outlined cv-icon">download</span>
                        CV
                    </button>
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
                    <button 
                        type="button" 
                        className="mobile-cv-btn" 
                        onClick={handleMobileCVClick}
                    >
                        <span className="material-symbols-outlined">download</span> Download CV
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
