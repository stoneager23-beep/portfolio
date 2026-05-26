import React, { Suspense, lazy, useState, useRef, useEffect } from 'react';
import CinematicIntro from './visuals/CinematicIntro';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import './Hero.css';

const Hero3DStage = lazy(() => import('./visuals/Hero3DStage'));

const techItems = [
  'MANAGEMENT SYSTEM', 'ADOBE PREMIERE PRO', 'AFTER EFFECTS VISUALS',
  'TAILWIND CSS', 'LARAVEL FRAMEWORK', 'REACT.JS', 'REST API',
  'COLOR GRADING', 'MOTION GRAPHICS', 'MYSQL DATABASE'
];

const canRenderWebGL = () => {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
};

const getHeroVisualMode = (prefersReducedMotion = false) => {
  if (typeof window === 'undefined') {
    return { compact: false, shouldLoad3D: false };
  }

  const compact = window.matchMedia('(max-width: 640px)').matches;
  const saveData = navigator.connection?.saveData;

  return {
    compact,
    shouldLoad3D: !compact && !saveData && !prefersReducedMotion && canRenderWebGL(),
  };
};

const Hero = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visualMode, setVisualMode] = useState(() => getHeroVisualMode(prefersReducedMotion));
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

  useEffect(() => {
    const updateHeroVisualMode = () => {
      setVisualMode(getHeroVisualMode(prefersReducedMotion));
    };

    updateHeroVisualMode();
    window.addEventListener('resize', updateHeroVisualMode);

    return () => window.removeEventListener('resize', updateHeroVisualMode);
  }, [prefersReducedMotion]);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <section id="hero" className="hero-section hero-intro-pending">
      <CinematicIntro compact={visualMode.compact || !visualMode.shouldLoad3D} />

      {/* Golden arc decorations */}
      <div className="hero-arcs">
        <svg viewBox="0 0 600 600" className="arc-svg">
          <circle cx="300" cy="300" r="250" className="arc-ring arc-1" />
          <circle cx="300" cy="300" r="200" className="arc-ring arc-2" />
          <circle cx="300" cy="300" r="150" className="arc-ring arc-3" />
        </svg>
      </div>

      <div className="hero-visual-layer" aria-hidden="true">
        <div className="hero-visual-inner">
          {visualMode.shouldLoad3D ? (
            <Suspense fallback={<div className="hero-3d-fallback" />}>
              <Hero3DStage />
            </Suspense>
          ) : (
            <div className="hero-3d-static" />
          )}
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="ping-dot-container">
            <span className="ping-dot-animate"></span>
            <span className="ping-dot"></span>
          </span>
          <span className="label-text" style={{ color: 'var(--primary)', marginBottom: 0 }}>Open to Work &amp; Freelance</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line1">CREATIVE</span>
          <span className="hero-title-line2 serif-accent">Architect</span>
        </h1>

        <p className="hero-role">CINEMATIC POST-EDITOR</p>

        <p className="hero-tagline">
          Architecting high-fidelity digital ecosystems where full-stack precision meets the artistry of cinematic storytelling.
        </p>

        <div className="hero-actions" ref={dropdownRef}>
          <div className={`dropdown-container ${activeDropdown === 'projects' ? 'active-dropdown' : ''}`}>
            <button
              className="primary-btn"
              onClick={() => toggleDropdown('projects')}
            >
              <span>View Projects</span>
              <span className={`material-symbols-outlined icon-arrow ${activeDropdown === 'projects' ? 'rotate-90' : ''}`}>chevron_right</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'projects' ? 'show' : ''}`}>
              <a href="#projects" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">code</span> Web Development
              </a>
              <a href="#projects" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">movie</span> Video Editing
              </a>
            </div>
          </div>

          <div className={`dropdown-container ${activeDropdown === 'contact' ? 'active-dropdown' : ''}`}>
            <button
              className="secondary-btn"
              onClick={() => toggleDropdown('contact')}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>mail</span>
              <span>Contact Me</span>
              <span className={`material-symbols-outlined text-sm ${activeDropdown === 'contact' ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'contact' ? 'show' : ''}`}>
              <a href="mailto:stoneager23@gmail.com" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">mail</span> Email directly
              </a>
              <a href="#experience" className="dropdown-item" onClick={() => setTimeout(() => setActiveDropdown(null), 150)}>
                <span className="material-symbols-outlined">terminal</span> Use inquiry form
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tech ticker marquee */}
      <div className="hero-marquee">
        <div className="marquee-track">
          {[...techItems, ...techItems].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot"></span>
              {item}
            </span>
          ))}
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
