import React from 'react';
import { Code, Palette, Terminal, Database, Layout, Smartphone, PlayCircle, Globe } from 'lucide-react';

const skillsData = [
  {
    category: "Video & Motion",
    icon: <PlayCircle className="text-secondary" size={32} />,
    skills: ["Premier Pro", "After Effects", "Motion Graphics", "Color Grading", "Sound Design", "DaVinci Resolve"]
  },
  {
    category: "Web Development",
    icon: <Code className="text-primary" size={32} />,
    skills: ["PHP", "Laravel", "MySQL", "Rest APIs", "HTML/CSS", "Bootstrap", "Git"]
  },
  {
    category: "Languages & Tools",
    icon: <Globe className="text-accent" size={32} />,
    skills: ["English", "Urdu", "Korean", "VS Code", "Canva"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <h2 className="section-title text-center">My <span className="text-gradient">Skills</span></h2>
        <p className="section-subtitle text-center">Technologies I work with to bring ideas to life.</p>

        <div className="skills-grid">
          {skillsData.map((group, index) => (
            <div key={index} className="glass-card skill-card">
              <div className="skill-icon-wrapper">
                {group.icon}
              </div>
              <h3 className="skill-category">{group.category}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .section-padding {
          padding: 6rem 0;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          color: var(--color-text-muted);
          margin-bottom: 4rem;
        }

        .text-center {
          text-align: center;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          padding: 2rem;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .skill-card:hover {
          transform: translateY(-5px);
        }

        .skill-icon-wrapper {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        .skill-category {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .skill-tag:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: var(--color-primary);
          color: var(--color-text-main);
        }
      `}</style>
    </section>
  );
};

export default Skills;
