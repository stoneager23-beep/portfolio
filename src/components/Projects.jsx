import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github } from 'lucide-react';
import { projects, CATEGORIES, ALL_CATEGORIES, GITHUB_PROFILE } from '../data/projects';
import './Projects.css';

const STREAMLIT_NOTE = 'Free-tier hosting, the app may take a few seconds to wake up.';
const VIDEO_CATEGORY = 'Video & Motion';

/** Local screenshots live in public/; absolute URLs are used as-is. */
const assetUrl = (path) => (/^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`);

const isStreamlitApp = (url) => {
  try {
    return new URL(url).hostname.endsWith('.streamlit.app');
  } catch {
    return false;
  }
};

/** "All" plus every category that has at least one project, in CATEGORIES order. */
const filters = [ALL_CATEGORIES, ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))];

/** Featured project first, everything else in data order (sort is stable). */
const orderedProjects = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

function ProjectCard({ project }) {
  const {
    id,
    title,
    subtitle,
    description,
    highlights = [],
    tags = [],
    category,
    role,
    style,
    liveUrl,
    liveLabel = 'Live Demo',
    githubUrl,
    screenshot,
    imageAlt,
    featured,
    disclaimer,
  } = project;

  const titleId = `project-${id}-title`;
  const isVideo = category === VIDEO_CATEGORY;
  const alt = imageAlt ?? (isVideo ? `Thumbnail for ${title}` : `Screenshot of ${title}`);

  return (
    <article className={`project-card${featured ? ' project-card--featured' : ''}`} aria-labelledby={titleId}>
      <div className="project-image-wrapper">
        <img
          src={assetUrl(screenshot)}
          alt={alt}
          className="project-img"
          width="1280"
          height="800"
          loading="lazy"
          decoding="async"
        />
        <div className="project-overlay" aria-hidden="true">
          <div className="overlay-content">
            <span className="overlay-subtitle">{subtitle ?? category}</span>
            <span className="overlay-title">{title}</span>
            {isVideo && (
              <span className="play-btn">
                <span className="material-symbols-outlined">play_arrow</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="project-info">
        <div className="project-info-top">
          <span className="project-category-label">{category}</span>
          {featured && <span className="project-featured-badge">Featured</span>}
          {role && <span className="project-role-label">{role}</span>}
        </div>

        <h3 id={titleId} className="project-card-title">
          {title}
        </h3>
        <p className="project-desc">{description}</p>

        {disclaimer && (
          <p className="project-note project-note--warning">
            <span className="material-symbols-outlined" aria-hidden="true">
              info
            </span>
            {disclaimer}
          </p>
        )}

        {highlights.length > 0 && (
          <ul className="project-detail-list" aria-label={`${title} highlights`}>
            {highlights.map((highlight) => (
              <li key={highlight} className="project-detail-item">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {style && (
          <p className="project-style">
            <span>Style:</span> {style}
          </p>
        )}

        <ul className="project-tags" aria-label={`${title} tech stack`}>
          {tags.map((tag) => (
            <li key={tag} className="pill-gold">
              {tag}
            </li>
          ))}
        </ul>

        {liveUrl && isStreamlitApp(liveUrl) && (
          <p className="project-note">
            <span className="material-symbols-outlined" aria-hidden="true">
              schedule
            </span>
            {STREAMLIT_NOTE}
          </p>
        )}

        {(liveUrl || githubUrl) && (
          <div className="project-actions">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn--primary"
              >
                {liveLabel}
                <span className="visually-hidden">: {title} (opens in a new tab)</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  open_in_new
                </span>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn--secondary"
              >
                <Github aria-hidden="true" focusable="false" />
                GitHub
                <span className="visually-hidden">
                  {githubUrl === GITHUB_PROFILE ? ": Husnain Faisal's profile" : `: ${title} source code`}
                  {' (opens in a new tab)'}
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

const Projects = ({ activeFilter, setActiveFilter }) => {
  const currentFilter = filters.includes(activeFilter) ? activeFilter : ALL_CATEGORIES;
  const visibleProjects =
    currentFilter === ALL_CATEGORIES ? orderedProjects : orderedProjects.filter((p) => p.category === currentFilter);

  // Filtering changes the page height; recompute scroll-reveal trigger positions for the sections below.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    ScrollTrigger.refresh();
  }, [currentFilter]);

  const count = visibleProjects.length;

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-heading">
      <div className="section-container">
        <div className="projects-header">
          <span className="section-badge">Featured Works</span>
          <h2 id="projects-heading" className="section-heading">
            THE <span className="accent">gallery</span>
          </h2>
        </div>

        <div className="filter-bar">
          <span className="filter-label">Navigate Portfolio</span>
          <div className="filter-buttons" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
                aria-pressed={currentFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <p className="visually-hidden" role="status">
          Showing {count} {count === 1 ? 'project' : 'projects'}
          {currentFilter !== ALL_CATEGORIES && ` in ${currentFilter}`}
        </p>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="projects-footer">
          <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="see-more-link">
            <span>See More Projects</span>
            <span className="visually-hidden"> on GitHub (opens in a new tab)</span>
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
