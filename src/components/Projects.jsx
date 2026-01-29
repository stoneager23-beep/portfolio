import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Factory Management System",
    description: "A Laravel-based system to manage articles, fabrics, inventory, invoices, and customers. Features role-based access control and RESTful APIs.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    demoLink: "https://github.com/stoneager23-beep/factory-management-system",
    codeLink: "https://github.com/stoneager23-beep/factory-management-system",
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Fast Motion Graphics Showreel",
    description: "A compilation of high-impact motion graphics, intros, and promotional videos created using Adobe After Effects and Premiere Pro.",
    tags: ["After Effects", "Premiere Pro", "4K Editing"],
    demoLink: "https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax",
    codeLink: "https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Cinematic gaming Edit",
    description: "Example of color grading and sound design skills in a gaming content of a fiverr client.",
    tags: ["Color Grading", "Sound Design", "Storytelling"],
    demoLink: "https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6",
    codeLink: "https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6",
    color: "from-orange-500 to-red-500"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="glass-card project-card">
              <div className="project-image-placeholder">
                <div className={`overlay-gradient overlay-${index}`}></div>
                <span className="project-title-overlay">{project.title}</span>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.demoLink} className="link-btn primary" target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink size={16} />
                  </a>
                  <a href={project.codeLink} className="link-btn secondary" target="_blank" rel="noopener noreferrer">
                    Code <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .project-card {
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .project-image-placeholder {
          height: 200px;
          background: #2a2a2a;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        /* Gradients for placeholders */
        .overlay-gradient {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        
        .overlay-0 { background: linear-gradient(45deg, #3b82f6, #06b6d4); }
        .overlay-1 { background: linear-gradient(45deg, #a855f7, #ec4899); }
        .overlay-2 { background: linear-gradient(45deg, #f97316, #ef4444); }

        .project-card:hover .overlay-gradient {
          opacity: 0.8;
          transform: scale(1.1);
        }

        .project-title-overlay {
          font-weight: 700;
          font-size: 1.5rem;
          color: white;
          z-index: 10;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .project-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .project-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
          line-height: 1.5;
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          font-weight: 500;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .link-btn.primary {
          color: var(--color-primary);
        }

        .link-btn.secondary {
          color: var(--color-text-muted);
        }
        
        .link-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default Projects;
