import React, { useState } from 'react';
import './Projects.css';

const projectsData = [
  {
    title: 'Factory Management System',
    subtitle: 'ARCHITECTURAL SYSTEM',
    category: 'Full-Stack Development',
    filterTag: 'laravel',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2UAInvgsNolQvhltC-1VcQFyqoBwb3GJdFJJ6Iyfg7rnCN0gng5jPelYq_4MDrPskYPnQEtxDVo5SduuHvViNBIDdRyF4h7ePXRT5VvmhBrmHULZTqOJ1-c7NxoqCqFTri88JUROGEjYNw9Y4uSbCveW7touB-OAWKWvHltMqLCe0qh-CnRLfo57fqvqvt3nmebMiDbV1iaOd8Stxu2HXQNymcF4Uz8GbMFdftIrS5wH-KGSEf-iFA1EtCnNwG-4lFCAXYaXBw',
    desc: 'A Laravel-based system to manage articles, fabrics, inventory, invoices, and customers. Features role-based access control and RESTful APIs.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    demoLink: "https://github.com/stoneager23-beep/factory-management-system",
    codeLink: "https://github.com/stoneager23-beep/factory-management-system",
    icon: 'code',
  },
  {
    title: 'Fast Motion Graphics Showreel',
    subtitle: 'CINEMATIC REEL',
    category: 'Motion Graphics',
    filterTag: 'cinematic',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcP3ed62JUidbotCyEiUeAj0He2IGlhHW7iE_1AdYU7XhZlwpVRsKdQoC5NvLxN5T7-bx-6JlrvOl21E7KnkNS9-MsLzIrw2LQ7EpbCzbXpPzczqydKEr7JLIWR0QjpWAYXRQ6yenjIbV4FVjVetupMyfCBlJoMh627Uc7d5MK3grOFTeIAO2ooIw1RwZaeus9DohfwlKlcuMFe6t9GNT1mLcCXts08iWrmdmOGbvX2ovVFxGpHyzCZDx8xs2VZNJeNEdqSIzM7Q',
    desc: 'A compilation of high-impact motion graphics, intros, and promotional videos created using Adobe After Effects and Premiere Pro.',
    tags: ['After Effects', 'Premiere Pro', '4K Editing'],
    demoLink: "https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax",
    codeLink: "https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax",
    icon: 'movie',
    isVideo: true
  },
  {
    title: 'Cinematic Gaming Edit',
    subtitle: 'POST PRODUCTION',
    category: 'Post Production',
    filterTag: 'cinematic',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBorfHrziIWaemljFmw2GWXA6ouriOa4zOY38RK0t49SZxVuVdOIPWbpsQDCwnD3_OXtLMU84VWldHmMtqtOE_6_UANWvUUuN75SUHypzC6m80pRr409Hh30qvGEhTPLhnZ_jYkKetAJvtCHZwQx4zXR9BH6iWuT5lWd5kAMADHQyJxEYpeWh0raLU_IIGhh_nU5dWdhcCb9WLPUfOTYV9itRR6_6wTDO5j0Os3-o3PGCQmSuVxfMtNO_f-ED3AMerd_PK9VjYrHQ',
    desc: 'Example of color grading and sound design skills in a gaming content of a fiverr client.',
    tags: ['Color Grading', 'Sound Design', 'Storytelling'],
    demoLink: "https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6",
    codeLink: "https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6",
    icon: 'audiotrack',
    isVideo: true
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.filterTag === activeFilter;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="projects-header">
          <span className="section-badge">Featured Works</span>
          <h2 className="section-heading">
            THE <span className="accent">gallery</span>
          </h2>
        </div>

        <div className="filter-bar">
          <span className="filter-label">Navigate Portfolio</span>
          <div className="filter-buttons">
            {[
              { key: 'all', label: 'All Works' },
              { key: 'laravel', label: 'Laravel Architecture' },
              { key: 'cinematic', label: 'Cinematic Reels' },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <a
              key={index}
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-image-wrapper">
                <img src={project.imgSrc} alt={project.title} className="project-img" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <span className="overlay-subtitle">{project.subtitle}</span>
                    <h3 className="overlay-title">{project.title}</h3>
                    {project.isVideo && (
                      <span className="play-btn">
                        <span className="material-symbols-outlined">play_arrow</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="pill-gold">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="projects-footer">
          <a href="https://github.com/stoneager23-beep" target="_blank" rel="noopener noreferrer" className="see-more-link">
            <span>See More Projects</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
