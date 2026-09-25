import React, { useState } from 'react';
import './Projects.css';

const projectsData = [
  {
    title: "America's Greatest Wings",
    subtitle: 'CLOVER POS + SMART ONLINE ORDER',
    category: 'E-Commerce & Systems',
    filterTag: 'laravel',
    imgSrc: `${import.meta.env.BASE_URL}agw_showcase.jpg`,
    desc: 'Implemented Clover POS + Smart Online Order integration on WordPress, featuring custom location popup, branch routing code, first-branch menu, and DoorDash Drive setup with delivery fee testing.',
    tags: ['WordPress', 'WooCommerce', 'Clover POS', 'Smart Online Order', 'DoorDash Drive'],
    features: ['Clover POS Integration', 'Smart Online Order', 'Branch Routing Code', 'DoorDash Drive Setup'],
    role: 'Full-Stack Integration Specialist',
    linkLabel: 'Visit Live Site',
    demoLink: 'https://americasgreatestwings.com',
    codeLink: 'https://americasgreatestwings.com',
    icon: 'storefront',
  },
  {
    title: 'HUJ Consulting',
    subtitle: 'CORPORATE WEBSITE DEVELOPMENT',
    category: 'Corporate Web Platform',
    filterTag: 'laravel',
    imgSrc: `${import.meta.env.BASE_URL}huj_showcase.jpg`,
    desc: 'Worked on hujconsulting.com, refining navigation, hero presentation, typography, and section spacing to improve layout consistency and readability for enterprise IT compliance & risk management.',
    tags: ['Web Design', 'UI/UX Layout', 'Responsive Design', 'Frontend Architecture', 'WordPress'],
    features: ['Navigation System', 'Hero Presentation', 'Layout Consistency', 'Readability Optimization'],
    role: 'Frontend & Web Developer',
    linkLabel: 'Visit Live Site',
    demoLink: 'https://hujconsulting.com',
    codeLink: 'https://hujconsulting.com',
    icon: 'business',
  },
  {
    title: 'Learning Management System',
    subtitle: 'EDTECH ARCHITECTURE',
    category: 'Full-Stack Development',
    filterTag: 'laravel',
    imgSrc: `${import.meta.env.BASE_URL}LMS.jpeg`,
    desc: 'Built course, lesson and enrollment management, Admin/Instructor/Student dashboards, JWT authentication and Chart.js analytics on a Laravel REST API, with persistent dark/light UI preferences.',
    tags: ['Laravel', 'React', 'MySQL', 'REST API', 'JWT', 'Chart.js'],
    features: ['Course & Lesson Flow', '3-Tier Role Dashboards', 'JWT Authentication', 'Chart.js Analytics'],
    role: 'Full-stack developer',
    linkLabel: 'GitHub Repository',
    demoLink: 'https://github.com/stoneager23-beep/lms-platform',
    codeLink: 'https://github.com/stoneager23-beep/lms-platform',
    icon: 'code',
  },
  {
    title: 'Factory Management System',
    subtitle: 'ERP & WORKFLOW AUTOMATION',
    category: 'Full-Stack Development',
    filterTag: 'laravel',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2UAInvgsNolQvhltC-1VcQFyqoBwb3GJdFJJ6Iyfg7rnCN0gng5jPelYq_4MDrPskYPnQEtxDVo5SduuHvViNBIDdRyF4h7ePXRT5VvmhBrmHULZTqOJ1-c7NxoqCqFTri88JUROGEjYNw9Y4uSbCveW7touB-OAWKWvHltMqLCe0qh-CnRLfo57fqvqvt3nmebMiDbV1iaOd8Stxu2HXQNymcF4Uz8GbMFdftIrS5wH-KGSEf-iFA1EtCnNwG-4lFCAXYaXBw',
    desc: 'Built modules for articles, fabrics, inventory, invoices and customers; implemented automated invoicing, normalized data models, REST APIs and role-based access control.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'REST APIs', 'RBAC'],
    features: ['Automated Invoicing', 'Inventory & Fabrics', 'Normalized Data Models', 'Role-Based Access'],
    role: 'Full-stack developer',
    linkLabel: 'GitHub Repository',
    demoLink: 'https://github.com/stoneager23-beep/factory-management-system',
    codeLink: 'https://github.com/stoneager23-beep/factory-management-system',
    icon: 'code',
  },
  {
    title: 'Fast Motion Graphics Showreel',
    subtitle: 'CINEMATIC REEL',
    category: 'Motion Graphics',
    filterTag: 'cinematic',
    imgSrc: `${import.meta.env.BASE_URL}Reel.jpeg`,
    desc: 'A compilation of high-impact motion graphics, intros, and promotional videos created using Adobe After Effects and Premiere Pro.',
    tags: ['After Effects', 'Premiere Pro', '4K Editing'],
    style: 'Motion graphics / cinematic showreel',
    role: 'Video editor and motion designer',
    linkLabel: 'Watch Reel',
    demoLink: 'https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax',
    codeLink: 'https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax',
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
    demoLink: 'https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6',
    codeLink: 'https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6',
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
              { key: 'laravel', label: 'Web & Systems' },
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
