import React, { useState } from 'react';
import './Projects.css';

const projectsData = [
  {
    title: 'Factory Management System',
    subtitle: 'FULL-STACK SYSTEM',
    category: 'Full-Stack Development',
    filterTag: 'laravel',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2UAInvgsNolQvhltC-1VcQFyqoBwb3GJdFJJ6Iyfg7rnCN0gng5jPelYq_4MDrPskYPnQEtxDVo5SduuHvViNBIDdRyF4h7ePXRT5VvmhBrmHULZTqOJ1-c7NxoqCqFTri88JUROGEjYNw9Y4uSbCveW7touB-OAWKWvHltMqLCe0qh-CnRLfo57fqvqvt3nmebMiDbV1iaOd8Stxu2HXQNymcF4Uz8GbMFdftIrS5wH-KGSEf-iFA1EtCnNwG-4lFCAXYaXBw',
    desc: 'A Laravel-based system to manage articles, fabrics, inventory, invoices, and customers. Features role-based access control and RESTful APIs.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    features: ['Inventory workflows', 'Invoice management', 'Customer records', 'Role-based access'],
    role: 'Full-stack developer',
    linkLabel: 'GitHub Repository',
    demoLink: "https://github.com/stoneager23-beep/factory-management-system",
    codeLink: "https://github.com/stoneager23-beep/factory-management-system",
    icon: 'code',
  },
  {
    title: 'LMS_Platform',
    subtitle: 'LEARNING MANAGEMENT SYSTEM',
    category: 'Full-Stack Development',
    filterTag: 'laravel',
    imgSrc: '/LMS.jpeg',
    desc: 'A Laravel-based LMS for student enrollment, instructor registration, and admin approval workflows.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Tailwind'],
    features: ['Student enrollment', 'Instructor registration', 'Admin approvals', 'Role-based dashboard'],
    role: 'Full-stack developer',
    linkLabel: 'GitHub Repository',
    demoLink: "https://github.com/stoneager23-beep/lms-platform",
    codeLink: "https://github.com/stoneager23-beep/lms-platform",
    icon: 'code',
  },

  {
    title: 'Fast Motion Graphics Showreel',
    subtitle: 'CINEMATIC REEL',
    category: 'Motion Graphics',
    filterTag: 'cinematic',
    imgSrc: '/Reel.jpeg',
    desc: 'A compilation of high-impact motion graphics, intros, and promotional videos created using Adobe After Effects and Premiere Pro.',
    tags: ['After Effects', 'Premiere Pro', '4K Editing'],
    style: 'Motion graphics / cinematic showreel',
    role: 'Video editor and motion designer',
    linkLabel: 'Watch Reel',
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
    desc: 'A cinematic gaming edit focused on pacing, color grading, sound design, and visual storytelling for client content.',
    tags: ['Color Grading', 'Sound Design', 'Storytelling'],
    style: 'Cinematic edit / color grading',
    role: 'Video editor and post-production artist',
    linkLabel: 'Watch Edit',
    demoLink: "https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6",
    codeLink: "https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6",
    icon: 'audiotrack',
    isVideo: true
  }
];

const Projects = ({ activeFilter, setActiveFilter }) => {
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
                <div className="project-info-top">
                  <span className="project-category-label">{project.category}</span>
                  <span className="project-role-label">{project.role}</span>
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                {project.features && (
                  <div className="project-detail-list">
                    {project.features.map((feature) => (
                      <span key={feature} className="project-detail-item">{feature}</span>
                    ))}
                  </div>
                )}
                {project.style && (
                  <p className="project-style">
                    <span>Style:</span> {project.style}
                  </p>
                )}
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="pill-gold">{tag}</span>
                  ))}
                </div>
                <span className="project-link-label">
                  {project.linkLabel}
                  <span className="material-symbols-outlined">open_in_new</span>
                </span>
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
