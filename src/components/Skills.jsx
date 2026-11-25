import { Code, Server, Database, Wrench, ClipboardCheck, PlayCircle, Bot } from 'lucide-react';
import { projects } from '../data/projects';
import './Skills.css';

const AI_CATEGORY = 'AI & Automation';
const aiProjectCount = projects.filter((p) => p.category === AI_CATEGORY).length;

// Tech stack by area. The AI & Automation tags come from the projects in src/data/projects.js.
// `wide: true` makes a card span two columns on larger screens.
const skillsData = [
  {
    category: 'Languages & Frameworks',
    Icon: Code,
    skills: ['PHP', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3', 'Laravel', 'React', 'Node.js', 'Express.js', 'Bootstrap', 'Chart.js'],
  },
  {
    category: AI_CATEGORY,
    Icon: Bot,
    wide: true,
    note: 'Retrieval-augmented assistants, LLM-powered research and guidance tools, and n8n workflow automation.',
    projectsFilter: AI_CATEGORY,
    skills: ['LLM Apps', 'RAG', 'LangChain', 'OpenAI API', 'Streamlit', 'n8n Workflows'],
  },
  {
    category: 'Backend & Data',
    Icon: Server,
    skills: ['REST APIs', 'JWT Auth', 'RBAC', 'CRUD Panels', 'MySQL', 'Supabase', 'Database Design', 'ERD Modeling'],
  },
  {
    category: 'Web Platforms & Integrations',
    Icon: Database,
    skills: ['WordPress', 'WooCommerce', 'Clover POS', 'Smart Online Order', 'DoorDash Drive', 'SMTP Config'],
  },
  {
    category: 'Tools & Practices',
    Icon: Wrench,
    skills: ['Git', 'GitHub', 'Composer', 'npm', 'VS Code', 'Agile', 'Postman'],
  },
  {
    category: 'ERP QA & Testing',
    Icon: ClipboardCheck,
    skills: ['Cornerstone ERP QA', 'MCJ & OPF Testing', 'Bug Reporting', 'Form & Permission Verification'],
  },
  {
    category: 'Creative Craft & Languages',
    Icon: PlayCircle,
    skills: ['Adobe Premiere Pro', 'After Effects', 'Motion Graphics', 'English (Fluent)', 'Urdu (Fluent)', 'Korean (Conversational)'],
  },
];

const Skills = ({ onSelectProjectFilter }) => {
  return (
    <section id="skills" className="toolkit-section" aria-labelledby="toolkit-heading">
      <div className="section-container">
        <div className="toolkit-header">
          <span className="section-badge">Tech Stack</span>
          <h2 id="toolkit-heading" className="section-heading">
            THE <span className="accent">toolkit</span>
          </h2>
          <p className="toolkit-subtitle">
            Full-stack and AI tooling, backed by testing discipline and cinematic visual craft.
          </p>
        </div>

        <div className="toolkit-grid">
          {skillsData.map(({ category, Icon, wide, note, projectsFilter, skills }) => (
            <article key={category} className={`toolkit-card${wide ? ' toolkit-card--wide' : ''}`}>
              <div className="toolkit-card-head">
                <span className="toolkit-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="toolkit-title">{category}</h3>
              </div>
              {note && <p className="toolkit-note">{note}</p>}
              <ul className="toolkit-tags" aria-label={`${category} skills`}>
                {skills.map((skill) => (
                  <li key={skill} className="toolkit-tag">
                    {skill}
                  </li>
                ))}
              </ul>
              {projectsFilter && onSelectProjectFilter && (
                <a href="#projects" className="toolkit-link" onClick={() => onSelectProjectFilter(projectsFilter)}>
                  See {aiProjectCount} AI projects
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_forward
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
