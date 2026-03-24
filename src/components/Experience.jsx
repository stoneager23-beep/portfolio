import React, { useState } from 'react';
import './Experience.css';

const Experience = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus('loading');

        const payload = {
            ...formData,
            access_key: "8eb6ee6d-f765-4643-9d53-8249359212cc"
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
            setTimeout(() => setStatus(''), 5000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <section id="experience" className="experience-section">
            <div className="section-container">
                {/* Journey Timeline */}
                <div className="journey-header">
                    <span className="section-badge">Chronology</span>
                    <h2 className="section-heading">
                        THE <span className="accent">journey</span>
                    </h2>
                </div>

                <div className="experience-grid">
                    <div className="timeline-column">
                        <div className="timeline-container">
                            <div className="timeline-line">
                                <div className="timeline-line-glow"></div>
                            </div>

                            {/* Item 1 */}
                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon active">
                                    <span className="material-symbols-outlined">code</span>
                                </div>
                                <div className="timeline-card active">
                                    <div className="timeline-card-top">
                                        <span className="date-badge active">2024—PRESENT</span>
                                    </div>
                                    <h3 className="timeline-job-title">Full-Stack Laravel Developer</h3>
                                    <p className="timeline-company">Freelance <span className="serif-accent">Consultant</span></p>
                                    <p className="timeline-desc">
                                        Architecting premium web solutions with Laravel, React, Node.js, and specialized cloud infrastructure. Elevating user experiences through precision engineering and minimalist aesthetics.
                                    </p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon">
                                    <span className="material-symbols-outlined">movie_edit</span>
                                </div>
                                <div className="timeline-card">
                                    <div className="timeline-card-top">
                                        <span className="date-badge">2025—CURRENT</span>
                                    </div>
                                    <h3 className="timeline-job-title">Senior Video Editor</h3>
                                    <p className="timeline-company">Pulse Media <span className="serif-accent">Creative Lab</span></p>
                                    <p className="timeline-desc">
                                        Visual storytelling for global luxury brands. Specializing in high-end post-production, cinematic motion graphics, and narrative color grading.
                                    </p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon">
                                    <span className="material-symbols-outlined">brush</span>
                                </div>
                                <div className="timeline-card">
                                    <div className="timeline-card-top">
                                        <span className="date-badge">2023—2025</span>
                                    </div>
                                    <h3 className="timeline-job-title">UI/UX Designer</h3>
                                    <p className="timeline-company">Freelance <span className="serif-accent">Projects</span></p>
                                    <p className="timeline-desc">
                                        Crafting intuitive digital interfaces where form meets flawless function. Transforming complex requirements into elegant, user-centric prototypes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact / Terminal Form */}
                    <div className="contact-column">
                        <div className="terminal-panel">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                                <span className="terminal-title">contact_terminal</span>
                            </div>

                            <div className="terminal-body">
                                <div className="terminal-scanline"></div>
                                <h2 className="contact-title">Initialize Contact</h2>
                                <p className="contact-subtitle">Let's build something cinematic together.</p>

                                <form className="terminal-form" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="material-symbols-outlined form-label-icon">person</span>
                                            Your Name
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="terminal-input"
                                            placeholder="ENTER_NAME"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="material-symbols-outlined form-label-icon">mail</span>
                                            Email Address
                                        </label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="terminal-input"
                                            placeholder="ENTER_EMAIL"
                                            type="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="material-symbols-outlined form-label-icon">chat</span>
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="terminal-input terminal-textarea"
                                            placeholder="DESCRIBE_YOUR_VISION"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
                                    >
                                        <span className="material-symbols-outlined">send</span>
                                        <span>{status === 'loading' ? 'Transmitting...' : 'Transmit Message'}</span>
                                    </button>

                                    {status === 'success' && (
                                        <div className="status-msg success">
                                            <span className="material-symbols-outlined">check_circle</span>
                                            Message sent! I'll get back to you soon.
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="status-msg error">
                                            <span className="material-symbols-outlined">error</span>
                                            Something went wrong. Please try again.
                                        </div>
                                    )}
                                </form>

                                <div className="terminal-footer">
                                    <p className="terminal-status">
                                        <span className="status-dot online"></span>
                                        SYSTEM: ALL CHANNELS ACTIVE
                                    </p>
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
