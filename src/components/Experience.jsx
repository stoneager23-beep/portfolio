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

                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon active">
                                    <span className="material-symbols-outlined">terminal</span>
                                </div>
                                <div className="timeline-card active">
                                    <div className="timeline-card-top">
                                        <span className="date-badge active">DEC 2025 - PRESENT</span>
                                    </div>
                                    <h3 className="timeline-job-title">Laravel Developer</h3>
                                    <p className="timeline-company">NetRoots Technologies (NRT) <span className="serif-accent">Lahore</span></p>
                                    <p className="timeline-desc">
                                        Engineering core web features, database CRUD architecture, and conducting ERP enterprise testing for academic and commercial platforms.
                                    </p>
                                    <ul className="timeline-bullets">
                                        <li className="timeline-bullet-item">Develop Laravel/PHP pages and dynamic blog features for university clients including UCL and BHS.</li>
                                        <li className="timeline-bullet-item">Build admin CRUD panels for database-backed content, supporting record creation, viewing, updates and deletion.</li>
                                        <li className="timeline-bullet-item">Maintain WordPress/WooCommerce websites; resolve plugin conflicts, SMTP delivery failures and SEO/sitemap issues.</li>
                                        <li className="timeline-bullet-item">Test Cornerstone, MCJ and OPF Laravel ERPs: Purchase Requisition, GRN, Inventory, Fee Management and HR.</li>
                                        <li className="timeline-bullet-item">Verify forms, permissions, reports and data flow; document reproduction steps and expected/actual results, coordinating fixes with developers.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon">
                                    <span className="material-symbols-outlined">code</span>
                                </div>
                                <div className="timeline-card">
                                    <div className="timeline-card-top">
                                        <span className="date-badge">SEP 2025 - PRESENT</span>
                                    </div>
                                    <h3 className="timeline-job-title">Full-Stack Web Developer</h3>
                                    <p className="timeline-company">Freelance / Contract <span className="serif-accent">Remote</span></p>
                                    <p className="timeline-desc">
                                        Architecting production-ready web applications, secure RESTful APIs, and tailored database solutions for diverse client initiatives.
                                    </p>
                                    <ul className="timeline-bullets">
                                        <li className="timeline-bullet-item">Build and deploy Laravel applications supporting 1,000+ users in production; develop RESTful APIs with JWT authentication and role-based access control.</li>
                                        <li className="timeline-bullet-item">Optimize MySQL queries and indexing; translate client requirements into working website and application features.</li>
                                        <li className="timeline-bullet-item">Prioritize client satisfaction through clear communication, progress updates and responsive, feedback-led revisions.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <div className="timeline-card">
                                    <div className="timeline-card-top">
                                        <span className="date-badge">EXPECTED 2026</span>
                                    </div>
                                    <h3 className="timeline-job-title">BSc, Software Engineering Technology</h3>
                                    <p className="timeline-company">Punjab Tianjin University of Technology <span className="serif-accent">Lahore</span></p>
                                    <p className="timeline-desc">
                                        Degree candidate with a 3.01 / 4.0 GPA, specializing in software engineering, database modeling, and scalable web architectures.
                                    </p>
                                    <ul className="timeline-bullets">
                                        <li className="timeline-bullet-item">Won internal NRT competition with a six-sheet Excel workload tool featuring live dashboards and self-updating indicators.</li>
                                        <li className="timeline-bullet-item">Completed Advanced Laravel engineering curriculum on Udemy; committed to ongoing project-based learning.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="timeline-item">
                                <div className="timeline-icon hex-icon">
                                    <span className="material-symbols-outlined">movie_edit</span>
                                </div>
                                <div className="timeline-card">
                                    <div className="timeline-card-top">
                                        <span className="date-badge">CREATIVE LAB</span>
                                    </div>
                                    <h3 className="timeline-job-title">Senior Video Editor &amp; Motion Artist</h3>
                                    <p className="timeline-company">Pulse Media &amp; Freelance <span className="serif-accent">Visuals</span></p>
                                    <p className="timeline-desc">
                                        Visual storytelling for client campaigns and digital media. Specializing in high-end post-production, cinematic motion graphics, and narrative color grading with Premiere Pro &amp; After Effects.
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

