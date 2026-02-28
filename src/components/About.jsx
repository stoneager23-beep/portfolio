import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">

        <div className="about-header">
          <span className="section-subtitle">Deep Dive Portfolio</span>
          <h2 className="section-title">About <span className="text-gold-gradient">Me</span></h2>
        </div>

        <div className="about-card glass-card gold-rim">
          <div className="about-image-container">
            {/* Note: I'm using the image from the stitch design */}
            <div className="about-image bg-workspace"></div>
            <div className="about-image-overlay"></div>
            <div className="about-image-border"></div>
          </div>

          <div className="about-content">
            <div className="about-role">
              <span className="material-symbols-outlined gold-icon role-icon">verified_user</span>
              <h3 className="role-title">Creative Full-Stack Developer</h3>
            </div>

            <p className="about-description">
              Architecting high-end digital solutions where technical precision meets artistic vision. Specializing in high-performance Laravel/React backends and cinematic 4K post-production storytelling.
            </p>

            <div className="about-skills-grid">
              <div className="skill-item group">
                <h4 className="skill-title">
                  <span className="material-symbols-outlined gold-icon">code_blocks</span>
                  Modern Development
                </h4>
                <p className="skill-description">Developing scalable, secure enterprise-grade systems with clean architecture.</p>
              </div>

              <div className="skill-item group">
                <h4 className="skill-title">
                  <span className="material-symbols-outlined gold-icon">movie</span>
                  Cinema Post-Pro
                </h4>
                <p className="skill-description">Visual storytelling using industry-standard tools for broadcast quality.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Mastery Section */}
        <div className="mastery-header">
          <h2 className="section-title">Technical <span className="text-gold-gradient">Mastery</span></h2>
          <div className="mastery-divider"></div>
          <p className="mastery-subtitle">A curated selection of my specialized technical stack and professional proficiency levels.</p>
        </div>

        <div className="mastery-grid">
          {/* Frontend */}
          <div className="mastery-card glass-card gold-rim">
            <div className="mastery-card-header">
              <div className="mastery-icon-box">
                <span className="material-symbols-outlined gold-icon text-3xl">developer_mode_tv</span>
              </div>
              <h3 className="mastery-card-title">Frontend</h3>
            </div>
            <div className="mastery-bars">
              <SkillBar name="React.js" percentage={95} />
              <SkillBar name="Tailwind CSS / CSS" percentage={98} />
              <SkillBar name="TypeScript" percentage={85} />
            </div>
          </div>

          {/* Backend */}
          <div className="mastery-card glass-card gold-rim border-primary-40">
            <div className="mastery-card-header">
              <div className="mastery-icon-box">
                <span className="material-symbols-outlined gold-icon text-3xl">terminal</span>
              </div>
              <h3 className="mastery-card-title">Backend</h3>
            </div>
            <div className="mastery-bars">
              <SkillBar name="Laravel & PHP" percentage={92} />
              <SkillBar name="MySQL / PostgreSQL" percentage={88} />
              <SkillBar name="REST API Architecture" percentage={94} />
            </div>
          </div>

          {/* Media Production */}
          <div className="mastery-card glass-card gold-rim">
            <div className="mastery-card-header">
              <div className="mastery-icon-box">
                <span className="material-symbols-outlined gold-icon text-3xl">video_settings</span>
              </div>
              <h3 className="mastery-card-title">Media Production</h3>
            </div>
            <div className="mastery-bars">
              <SkillBar name="After Effects" percentage={90} />
              <SkillBar name="Premiere Pro" percentage={95} />
              <SkillBar name="UI/UX Design" percentage={82} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillBar = ({ name, percentage }) => {
  return (
    <div className="skill-bar-container">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{percentage}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default About;
