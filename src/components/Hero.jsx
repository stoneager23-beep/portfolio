import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <section id="hero" className="hero-section grainy-bg">
      <div className="hero-background-glows">
        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />
        <div className="glow-circle glow-3" />
      </div>

      <div className="hero-content">
        <div className="hero-badge glass-card">
          <span className="ping-dot-container">
            <span className="ping-dot-animate"></span>
            <span className="ping-dot"></span>
          </span>
          <span className="badge-text">Bespoke Digital Experiences</span>
        </div>

        <h1 className="hero-title">
          Husnain <span className="text-gold-gradient italic serif-gold hero-title-highlight">Faisal</span>
        </h1>

        <p className="hero-subtitle">
          Full-Stack Developer <span className="subtitle-divider">|</span> Laravel Specialist <span className="subtitle-divider">|</span> Video Editor
        </p>

        <div className="hero-actions" ref={dropdownRef}>
          <div className={`dropdown-container ${activeDropdown === 'projects' ? 'active-dropdown' : ''}`}>
            <button
              className="primary-btn luxury-border gold-glow group"
              onClick={() => toggleDropdown('projects')}
            >
              <span className="relative z-10">View Projects</span>
              <span className={`material-symbols-outlined icon-arrow transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-90' : ''}`}>chevron_right</span>
            </button>

            <div className={`dropdown-menu glass-card ${activeDropdown === 'projects' ? 'show' : ''}`}>
              <a href="#projects" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">code</span>
                Web Development
              </a>
              <a href="#projects" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">movie</span>
                Video Editing
              </a>
            </div>
          </div>

          <div className={`dropdown-container ${activeDropdown === 'contact' ? 'active-dropdown' : ''}`}>
            <button
              className="secondary-btn glass-card group"
              onClick={() => toggleDropdown('contact')}
            >
              <span className="material-symbols-outlined text-gold">content_copy</span>
              <span>Contact Me</span>
              <span className={`material-symbols-outlined text-sm ml-2 transition-transform duration-300 ${activeDropdown === 'contact' ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            <div className={`dropdown-menu glass-card contact-menu ${activeDropdown === 'contact' ? 'show' : ''}`}>
              <a href="mailto:stoneager23@gmail.com" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">mail</span>
                Email directly
              </a>
              <a href="#experience" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">chat</span>
                Use inquiry form
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Discover</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
