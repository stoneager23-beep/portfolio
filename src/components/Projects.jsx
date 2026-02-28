import React from 'react';
import './Projects.css';

const projectsData = [
  {
    title: 'Factory Management System',
    category: 'Full-Stack Development',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2UAInvgsNolQvhltC-1VcQFyqoBwb3GJdFJJ6Iyfg7rnCN0gng5jPelYq_4MDrPskYPnQEtxDVo5SduuHvViNBIDdRyF4h7ePXRT5VvmhBrmHULZTqOJ1-c7NxoqCqFTri88JUROGEjYNw9Y4uSbCveW7touB-OAWKWvHltMqLCe0qh-CnRLfo57fqvqvt3nmebMiDbV1iaOd8Stxu2HXQNymcF4Uz8GbMFdftIrS5wH-KGSEf-iFA1EtCnNwG-4lFCAXYaXBw',
    desc: 'A Laravel-based system to manage articles, fabrics, inventory, invoices, and customers. Features role-based access control and RESTful APIs.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    demoLink: "https://github.com/stoneager23-beep/factory-management-system",
    codeLink: "https://github.com/stoneager23-beep/factory-management-system",
    icon: 'arrow_outward'
  },
  {
    title: 'Fast Motion Graphics Showreel',
    category: 'Motion Graphics',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcP3ed62JUidbotCyEiUeAj0He2IGlhHW7iE_1AdYU7XhZlwpVRsKdQoC5NvLxN5T7-bx-6JlrvOl21E7KnkNS9-MsLzIrw2LQ7EpbCzbXpPzczqydKEr7JLIWR0QjpWAYXRQ6yenjIbV4FVjVetupMyfCBlJoMh627Uc7d5MK3grOFTeIAO2ooIw1RwZaeus9DohfwlKlcuMFe6t9GNT1mLcCXts08iWrmdmOGbvX2ovVFxGpHyzCZDx8xs2VZNJeNEdqSIzM7Q',
    desc: 'A compilation of high-impact motion graphics, intros, and promotional videos created using Adobe After Effects and Premiere Pro.',
    tags: ['After Effects', 'Premiere Pro', '4K Editing'],
    demoLink: "https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax",
    codeLink: "https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax",
    icon: 'movie',
    isVideo: true
  },
  {
    title: 'Cinematic gaming Edit',
    category: 'Post Production',
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
  return (
    <section id="projects" className="projects-section">
      <div className="projects-header-area">
        <div className="projects-header-text">
          <span className="curated-badge bg-primary-5">Curated Selection</span>
          <h2 className="projects-title">
            Featured <br />
            <span className="text-gold-gradient italic serif-gold">Projects</span>
          </h2>
          <p className="projects-subtitle">
            A diverse collection of digital experiences, spanning high-performance software architecture to cinematic visual storytelling.
          </p>
        </div>

        <div className="stats-box">
          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">24</span>
              <span className="stat-unit" style={{ color: 'var(--color-gold)' }}>+</span>
            </div>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">98</span>
              <span className="stat-unit" style={{ color: 'var(--color-gold)' }}>%</span>
            </div>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="filter-buttons">
        <button className="filter-btn active-filter shadow-primary-20">All Works</button>
        <button className="filter-btn default-filter">Laravel Architecture</button>
        <button className="filter-btn default-filter">Cinematic Reels</button>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div key={index} className="glass-card project-card">
            <div className="project-image-wrapper">
              <img src={project.imgSrc} alt={project.title} className="project-img img-grayscale" />
              <div className="image-overlay"></div>
              {project.isVideo && (
                <div className="video-overlay">
                  <div className="play-button">
                    <span className="material-symbols-outlined play-icon" style={{ color: 'white' }}>play_arrow</span>
                  </div>
                </div>
              )}
            </div>

            <div className="project-info">
              <div className="project-info-header">
                <h3 className="project-card-title">{project.title}</h3>
                <span className="material-symbols-outlined project-icon">{project.icon}</span>
              </div>

              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
                {project.category}
              </p>

              <p className="project-desc">{project.desc}</p>

              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="pill-gold">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.demoLink} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                  Live Demo <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>open_in_new</span>
                </a>
                <a href={project.codeLink} className="project-link-btn secondary-btn" target="_blank" rel="noopener noreferrer">
                  Code <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
