import React, { useState } from 'react';
import './Experience.css';

const Experience = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus('loading');

        const payload = {
            ...formData,
            access_key: "8eb6ee6d-f765-4643-9d53-8249359212cc" // The user will need to add their key here, or we can use a test key
        };

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        }).then((res) => res.json());

        if (res.success) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 5000); // Reset after 5s
        } else {
            setStatus('error');
            setTimeout(() => setStatus(''), 5000); // Reset after 5s
        }
    };

    return (
        <section id="experience" className="experience-section">
            <div className="section-container">
                <div className="experience-grid">

                    {/* Timeline Column */}
                    <div className="timeline-column">
                        <div className="timeline-header">
                            <span className="subtitle-badge">Legacy & Trajectory</span>
                            <h1 className="timeline-title">
                                Professional <br /><span className="text-gold-gradient">Evolution</span>
                            </h1>
                            <div className="timeline-divider"></div>
                        </div>

                        <div className="timeline-container">
                            <div className="timeline-line">
                                <div className="timeline-line-glow glowing-gold-line"></div>
                            </div>

                            <div className="timeline-item group pb-16">
                                <div className="timeline-icon-box active-icon shadow-primary-20">
                                    <span className="material-symbols-outlined text-lg">code</span>
                                </div>
                                <div className="timeline-content glass-panel border-l-active">
                                    <div className="timeline-content-header">
                                        <h3 className="job-title">Full-Stack Laravel Developer</h3>
                                        <span className="current-badge">Present</span>
                                    </div>
                                    <p className="job-dates text-primary">2024 — Current</p>
                                    <p className="job-desc">
                                        Architecting premium web solutions with Laravel, React, Node.js, and specialized cloud infrastructure. Elevating user experiences through precision engineering and minimalist aesthetics.
                                    </p>
                                </div>
                            </div>

                            <div className="timeline-item group pb-16">
                                <div className="timeline-icon-box inactive-icon">
                                    <span className="material-symbols-outlined text-lg">movie_edit</span>
                                </div>
                                <div className="timeline-content glass-panel border-l-inactive">
                                    <div className="timeline-content-header">
                                        <h3 className="job-title">Senior Video Editor</h3>
                                    </div>
                                    <p className="job-dates text-slate-500">2025 — Current</p>
                                    <p className="job-desc">
                                        Visual storytelling for global luxury brands. Specializing in high-end post-production, cinematic motion graphics, and narrative color grading.
                                    </p>
                                </div>
                            </div>

                            <div className="timeline-item group">
                                <div className="timeline-icon-box inactive-icon">
                                    <span className="material-symbols-outlined text-lg">brush</span>
                                </div>
                                <div className="timeline-content glass-panel border-l-inactive">
                                    <div className="timeline-content-header">
                                        <h3 className="job-title">UI/UX Designer</h3>
                                    </div>
                                    <p className="job-dates text-slate-500">2023 — 2025</p>
                                    <p className="job-desc">
                                        Crafting intuitive digital interfaces where form meets flawless function. Transforming complex requirements into elegant, user-centric prototypes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Column */}
                    <div className="inquiry-column">
                        <div className="inquiry-panel glass-panel">
                            <div className="inquiry-glow"></div>
                            <div className="inquiry-content">
                                <h2 className="inquiry-title">Inquiry</h2>
                                <p className="inquiry-subtitle">Initiate a collaboration for your next high-tier project.</p>

                                <form className="inquiry-form" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Full Identity</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input gold-bottom-border"
                                            placeholder="NAME"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input gold-bottom-border"
                                            placeholder="EMAIL"
                                            type="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Message Body</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="form-textarea gold-bottom-border"
                                            placeholder="DESCRIBE YOUR VISION"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`submit-btn bg-gold-gradient shadow-primary-20 ${status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        <span>{status === 'loading' ? 'Transmitting...' : 'Transmit Message'}</span>
                                        {status !== 'loading' && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                                    </button>

                                    {status === 'success' && (
                                        <div className="mt-4 p-3 border border-green-500/30 bg-green-500/10 text-green-400 text-sm rounded text-center">
                                            Message safely transmitted. I will be in touch.
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="mt-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded text-center">
                                            Transmission failed. Please try again.
                                        </div>
                                    )}
                                </form>

                                <div className="social-footer">
                                    <p className="social-title">Global Presence</p>
                                    <div className="social-links">
                                        <a
                                            href="https://github.com/stoneager23-beep"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon social-icon-gold"
                                        >
                                            <svg className="social-svg" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                            </svg>
                                        </a>

                                        <a
                                            href="https://www.linkedin.com/in/husnain-faisal-530009216/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon social-icon-gold"
                                        >
                                            <svg className="social-svg" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                            </svg>
                                        </a>

                                        <a
                                            href="https://www.instagram.com/_husnain_here._._/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon social-icon-gold"
                                        >
                                            <svg className="social-svg" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.669-.072-4.948-.199-4.354-2.618-6.78-6.98-6.98-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
