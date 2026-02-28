import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">

                {/* Top section */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <h1 className="footer-logo-text serif-gold">Husnain Faisal</h1>
                        </div>
                        <p className="footer-desc">
                            Crafting high-end digital solutions for visionary brands. Let's create something extraordinary together.
                        </p>

                        <div className="footer-socials">
                            <a href="#" className="footer-link">GitHub</a>
                            <a href="#" className="footer-link">LinkedIn</a>
                            <a href="#" className="footer-link">Instagram</a>
                        </div>
                    </div>

                    <div className="footer-meta">
                        <p className="meta-text">© 2024 Collection</p>
                        <p className="meta-version text-gold-gradient">v4.1.0 — Gold Standard</p>
                        <p className="meta-tagline">Designed with unwavering precision</p>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="footer-bottom">
                    <div className="footer-bottom-links">
                        <a href="#" className="footer-bottom-link">Privacy</a>
                        <a href="#" className="footer-bottom-link">Legal</a>
                    </div>
                    <p className="footer-copyright">
                        © 2024 Husnain Faisal. Architectural precision for the digital age.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
