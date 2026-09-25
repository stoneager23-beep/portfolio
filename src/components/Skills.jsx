import React from 'react';
import { Code, Server, Database, Wrench, ClipboardCheck, PlayCircle } from 'lucide-react';

const skillsData = [
  {
    category: "Languages & Frameworks",
    icon: <Code className="text-secondary" size={32} />,
    skills: ["PHP", "JavaScript", "SQL", "HTML5", "CSS3", "Laravel", "React", "Bootstrap", "Chart.js"]
  },
  {
    category: "Backend & Data",
    icon: <Server className="text-primary" size={32} />,
    skills: ["REST APIs", "JWT Auth", "RBAC", "CRUD Panels", "MySQL", "Database Design", "ERD Modeling"]
  },
  {
    category: "Web Platforms & Integrations",
    icon: <Database className="text-accent" size={32} />,
    skills: ["WordPress", "WooCommerce", "Clover POS", "Smart Online Order", "DoorDash Drive", "SMTP Config"]
  },
  {
    category: "Tools & Practices",
    icon: <Wrench className="text-secondary" size={32} />,
    skills: ["Git", "GitHub", "Composer", "npm", "VS Code", "Agile", "Postman"]
  },
  {
    category: "ERP QA & Testing",
    icon: <ClipboardCheck className="text-primary" size={32} />,
    skills: ["Cornerstone ERP QA", "MCJ & OPF Testing", "Bug Reporting", "Form & Permission Verification"]
  },
  {
    category: "Creative Craft & Languages",
    icon: <PlayCircle className="text-accent" size={32} />,
    skills: ["Adobe Premiere Pro", "After Effects", "Motion Graphics", "English (Fluent)", "Urdu (Fluent)", "Korean (Conversational)"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <h2 className="section-title text-center">My <span className="text-gradient">Skills</span></h2>
        <p className="section-subtitle text-center">A developer-first toolkit, supported by testing discipline and cinematic visual craft.</p>

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

        .container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 2.5rem;
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
