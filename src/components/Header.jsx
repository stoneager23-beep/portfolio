import React from 'react';
import './Header.css';
import CvFile from '../assets/resume.pdf';

const Header = () => {
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
                    <button className="mobile-menu-btn text-gold">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
