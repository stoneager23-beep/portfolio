import React from 'react';
import './About.css';

const skillCategories = [
  {
    title: 'Full-Stack Engineering',
    icon: 'terminal',
    skills: [
      { name: 'Laravel', level: 'Expert' },
      { name: 'React', level: 'Advanced' },
      { name: 'Tailwind', level: 'Expert' },
      { name: 'SQL', level: 'Senior' },
    ],
  },
  {
    title: 'Cinematic Production',
    icon: 'movie',
    skills: [
      { name: 'After Effects', level: 'Advanced' },
      { name: 'Premiere Pro', level: 'Advanced' },
      { name: 'DaVinci Resolve', level: 'Learning' },
    ],
  },
];

const levelStyles = {
  Expert: { bg: 'rgba(212, 175, 55, 0.25)', color: '#f2ca50' },
  Advanced: { bg: 'rgba(162, 231, 255, 0.15)', color: '#a2e7ff' },
  Senior: { bg: 'rgba(212, 175, 55, 0.15)', color: '#d4af37' },
  Learning: { bg: 'rgba(255, 255, 255, 0.08)', color: '#9ca3af' },
};

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="about-header">
          <span className="section-badge">Capability Matrix</span>
          <h2 className="section-heading">
            THE <span className="accent">skillset</span>
          </h2>
        </div>

        <div className="about-layout">
          {/* Portrait */}
          <div className="portrait-column">
            <div className="hex-portrait-wrapper">
              <div className="hex-portrait">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxiolcTM6xwxYKB9OidYRC7EstH58Lkr4IhT-3oQlcsxQR5NBLbn4QlDowM1SYKGXQWIDX8m2xuHhx_jEbp02oR-JstFWkNqQlJroz1GDzciahLCn0g0GukZXVq_Gl2l4dgx1bkhS8AAM01NlZxMKFSvPiqgNCGLp6TuZs5utUy6LKEI7Zt2IQ9G9EZsYm4fri7LjjD9AfGP52O_V3RxfLAGbkGq0saFs2rFCkTdfurnniZhnk7Rw1hQ2PPlawM-DkMVRZ-te2ZA"
                  alt="Husnain Faisal"
                  className="hex-img"
                />
              </div>
              <div className="hex-border"></div>
            </div>
            <div className="portrait-stats">
              <div className="stat-bubble">
                <span className="stat-number">3+</span>
                <span className="stat-text">Years</span>
              </div>
              <div className="stat-bubble">
                <span className="stat-number">24+</span>
                <span className="stat-text">Projects</span>
              </div>
            </div>
          </div>

          {/* Skills Categories */}
          <div className="skills-column">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="skill-category">
                <div className="skill-category-header">
                  <div className="skill-category-line"></div>
                  <h3 className="skill-category-title">
                    <span className="material-symbols-outlined skill-cat-icon">{cat.icon}</span>
                    {cat.title}
                  </h3>
                </div>
                <div className="skill-cards">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="skill-card">
                      <span className="skill-name">{skill.name}</span>
                      <span
                        className="skill-level"
                        style={{
                          background: levelStyles[skill.level].bg,
                          color: levelStyles[skill.level].color,
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
