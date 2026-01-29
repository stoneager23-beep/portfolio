import React from 'react';
import { BookOpen, Award, Languages } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="section-padding">
            <div className="container">
                <h2 className="section-title text-center">About <span className="text-gradient">Me</span></h2>

                <div className="about-grid">
                    {/* Professional Summary */}
                    <div className="about-card glass-card">
                        <h3><Award className="icon-inline" size={24} /> Professional Summary</h3>
                        <p>
                            Creative <strong>Video Editor & Motion Graphics Designer</strong> with a strong technical background in web development.
                            Skilled in crafting engaging video content, motion graphics, and cinematic edits using Adobe Premiere Pro and After Effects,
                            alongside experience in 4K editing, color correction, and visual storytelling.
                            Detail-oriented, reliable, and capable of delivering professional-grade content for digital platforms.
                        </p>
                    </div>

                    {/* Education */}
                    <div className="about-card glass-card">
                        <h3><BookOpen className="icon-inline" size={24} /> Education</h3>
                        <div className="timeline-item">
                            <h4>BS Computer Science & Engineering Technology (BSCSET)</h4>
                            <p className="institution">Punjab Tianjin University of Technology</p>
                            <p className="location">Lahore, Pakistan</p>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="about-card glass-card">
                        <h3><Languages className="icon-inline" size={24} /> Languages</h3>
                        <ul className="language-list">
                            <li>English <span className="level">(Professional)</span></li>
                            <li>Urdu <span className="level">(Native)</span></li>
                            <li>Korean <span className="level">(Basic)</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .about-card {
          padding: 2rem;
        }

        .about-card h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }

        .about-card p {
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .icon-inline {
          color: var(--color-secondary);
        }

        .institution {
          font-weight: 600;
          color: var(--color-text-main) !important;
          margin-bottom: 0.25rem !important;
        }
        
        .location {
          font-size: 0.9rem;
        }

        .language-list {
          list-style: none;
        }

        .language-list li {
          margin-bottom: 0.75rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 0.5rem;
        }

        .level {
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
      `}</style>
        </section>
    );
};

export default About;
