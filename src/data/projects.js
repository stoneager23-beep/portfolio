/**
 * Single source of truth for the Projects section.
 *
 * Used by:
 *   - src/components/Projects.jsx           (cards + filter tabs)
 *   - vite.config.js                         (JSON-LD ItemList injected into index.html at build time)
 *   - scripts/capture-screenshots.mjs        (screenshots of each liveUrl into public/)
 *
 * Keep this file plain JavaScript (no imports, no import.meta.env) so Node can read it too.
 *
 * ADDING A PROJECT
 *   1. Copy an entry below and fill in the fields (see "Fields").
 *   2. Put a screenshot at public/<screenshot>, or run
 *        node scripts/capture-screenshots.mjs <id>
 *   3. Array order is display order; a project with `featured: true` is always shown first and larger.
 *
 * Fields
 *   id           unique kebab-case slug (used for keys, anchors and the screenshot file name)
 *   title        project name
 *   description  1-2 sentences
 *   highlights   2-3 short bullet points
 *   tags         tech stack shown as pills
 *   category     one of CATEGORIES (drives the filter tabs)
 *   liveUrl      live demo URL, or null (the "Live Demo" button is hidden when null)
 *   githubUrl    repo URL, GITHUB_PROFILE, or null (the "GitHub" button is hidden when null)
 *   screenshot   path relative to public/ (e.g. 'projects/my-app.jpg'), or an absolute URL
 *
 * Optional
 *   featured     true = first + larger card (use for one project)
 *   disclaimer   short warning shown on the card (e.g. "not medical advice")
 *   imageAlt     alt text override for the screenshot
 *   liveLabel    button text override (default "Live Demo")
 *   subtitle     small label shown on the image hover overlay (defaults to category)
 *   role         your role on the project
 *   style        one-line style note (used by the video projects)
 *
 * Projects hosted on *.streamlit.app automatically get the "may take a few seconds to wake up" note.
 */

export const GITHUB_PROFILE = 'https://github.com/stoneager23-beep';

export const ALL_CATEGORIES = 'All';

/** Filter tabs, in order. A tab only appears if at least one project uses that category. */
export const CATEGORIES = ['Full Stack', 'AI & Automation', 'Video & Motion'];

export const projects = [
  // ---------------------------------------------------------------- Full Stack
  {
    id: 'northern-harvester',
    title: 'Northern Harvester',
    description:
      'A full-stack e-commerce store for dry fruits, built with a React frontend and an Express.js API backed by Supabase, hosted on Hostinger.',
    highlights: [
      'Admin panel with product CRUD and profit management',
      'Built-in CRM and an SEO blog with custom meta titles and descriptions',
      'Cash on delivery, wallet and bank-transfer payments',
    ],
    tags: ['React', 'Express.js', 'Supabase', 'Hostinger'],
    category: 'Full Stack',
    liveUrl: 'https://northern-harvester.com',
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo URL if the code is public
    screenshot: 'projects/northern-harvester.jpg',
    imageAlt: 'Northern Harvester dry fruits online store homepage',
    featured: true,
  },

  // ---------------------------------------------------------------- AI & Automation
  {
    id: 'rag-document-reader',
    title: 'RAG Document Reader',
    description:
      "Upload documents and ask questions about them. Answers are generated from the documents' own content using retrieval-augmented generation (RAG).",
    highlights: ['Upload your own documents', 'Questions answered from the uploaded content'],
    tags: ['Python', 'Streamlit', 'RAG'],
    category: 'AI & Automation',
    liveUrl: 'https://ragdocreader-py.streamlit.app/',
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo URL if the code is public
    screenshot: 'projects/rag-document-reader.jpg',
  },
  {
    id: 'marketmind-ai',
    title: 'MarketMind AI',
    description: 'Researches a market and recommends the best business plan for it.',
    highlights: ['LLM-driven market research', 'Recommends the best-fit business plan'],
    tags: ['Python', 'Streamlit', 'LLM'],
    category: 'AI & Automation',
    liveUrl: 'https://marketmind-edu-ai.streamlit.app/',
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo URL if the code is public
    screenshot: 'projects/marketmind-ai.jpg',
  },
  {
    id: 'mediguide-ai',
    title: 'MediGuide AI',
    description:
      "An educational project that takes a patient's symptom information and suggests likely conditions.",
    highlights: ['Takes symptom information as input', 'Suggests likely conditions using an LLM'],
    tags: ['Python', 'Streamlit', 'LLM'],
    category: 'AI & Automation',
    liveUrl: 'https://mediguide-edu.streamlit.app/',
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo URL if the code is public
    screenshot: 'projects/mediguide-ai.jpg',
    disclaimer: 'Educational project, not medical advice.',
  },
  {
    id: 'auroragpt',
    title: 'AuroraGPT',
    description:
      'A custom ChatGPT client: users enter their own OpenAI API key, and chat history is stored per key.',
    highlights: ['Bring-your-own OpenAI API key', 'Chat history stored separately for each key'],
    tags: ['Python', 'Streamlit', 'OpenAI API'],
    category: 'AI & Automation',
    liveUrl: 'https://auroragpt.streamlit.app/',
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo URL if the code is public
    screenshot: 'projects/auroragpt.jpg',
  },
  {
    id: 'pearlz-home-ai',
    title: 'Pearlz Home AI',
    description: 'A RAG support agent that guides customers on behalf of an air purifier company.',
    highlights: [
      'Customer support agent for an air purifier company',
      'Retrieval-augmented answers built with LangChain and the OpenAI API',
    ],
    tags: ['Python', 'LangChain', 'OpenAI API', 'Streamlit'],
    category: 'AI & Automation',
    liveUrl: 'https://pearlz-home-ai.streamlit.app/',
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo URL if the code is public
    screenshot: 'projects/pearlz-home-ai.jpg',
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer (n8n)',
    description:
      'An n8n workflow that picks up resumes arriving by email, analyzes each candidate and writes a justification of their capabilities.',
    highlights: [
      'Picks up resumes from incoming emails',
      'Analyzes each candidate with OpenAI',
      "Writes a justification of each candidate's capabilities",
    ],
    tags: ['n8n', 'OpenAI', 'Gmail', 'Google Sheets'],
    category: 'AI & Automation',
    liveUrl: null, // TODO: no public demo; add a link (e.g. a demo video) if one exists
    githubUrl: GITHUB_PROFILE, // TODO: replace with the repo / exported workflow URL if public
    screenshot: 'projects/ai-resume-analyzer.jpg', // TODO: placeholder; replace with a screenshot of the n8n workflow canvas
    imageAlt: 'Placeholder image for the AI Resume Analyzer n8n workflow',
  },

  // ---------------------------------------------------------------- Existing projects (moved from Projects.jsx)
  {
    id: 'americas-greatest-wings',
    title: "America's Greatest Wings",
    subtitle: 'Clover POS + Smart Online Order',
    description:
      'Implemented Clover POS + Smart Online Order integration on WordPress, featuring custom location popup, branch routing code, first-branch menu, and DoorDash Drive setup with delivery fee testing.',
    highlights: ['Clover POS Integration', 'Smart Online Order', 'Branch Routing Code', 'DoorDash Drive Setup'],
    tags: ['WordPress', 'WooCommerce', 'Clover POS', 'Smart Online Order', 'DoorDash Drive'],
    category: 'Full Stack',
    role: 'Full-Stack Integration Specialist',
    liveUrl: 'https://americasgreatestwings.com',
    liveLabel: 'Live Site',
    githubUrl: null, // client project
    screenshot: 'agw_showcase.jpg',
  },
  {
    id: 'huj-consulting',
    title: 'HUJ Consulting',
    subtitle: 'Corporate Website Development',
    description:
      'Worked on hujconsulting.com, refining navigation, hero presentation, typography, and section spacing to improve layout consistency and readability for enterprise IT compliance & risk management.',
    highlights: ['Navigation System', 'Hero Presentation', 'Layout Consistency', 'Readability Optimization'],
    tags: ['Web Design', 'UI/UX Layout', 'Responsive Design', 'Frontend Architecture', 'WordPress'],
    category: 'Full Stack',
    role: 'Frontend & Web Developer',
    liveUrl: 'https://hujconsulting.com',
    liveLabel: 'Live Site',
    githubUrl: null, // client project
    screenshot: 'huj_showcase.jpg',
  },
  {
    id: 'learning-management-system',
    title: 'Learning Management System',
    subtitle: 'EdTech Architecture',
    description:
      'Built course, lesson and enrollment management, Admin/Instructor/Student dashboards, JWT authentication and Chart.js analytics on a Laravel REST API, with persistent dark/light UI preferences.',
    highlights: ['Course & Lesson Flow', '3-Tier Role Dashboards', 'JWT Authentication', 'Chart.js Analytics'],
    tags: ['Laravel', 'React', 'MySQL', 'REST API', 'JWT', 'Chart.js'],
    category: 'Full Stack',
    role: 'Full-stack developer',
    liveUrl: null,
    githubUrl: 'https://github.com/stoneager23-beep/lms-platform',
    screenshot: 'LMS.jpeg',
  },
  {
    id: 'factory-management-system',
    title: 'Factory Management System',
    subtitle: 'ERP & Workflow Automation',
    description:
      'Built modules for articles, fabrics, inventory, invoices and customers; implemented automated invoicing, normalized data models, REST APIs and role-based access control.',
    highlights: ['Automated Invoicing', 'Inventory & Fabrics', 'Normalized Data Models', 'Role-Based Access'],
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'REST APIs', 'RBAC'],
    category: 'Full Stack',
    role: 'Full-stack developer',
    liveUrl: null,
    githubUrl: 'https://github.com/stoneager23-beep/factory-management-system',
    // TODO: hotlinked image; download a real screenshot into public/projects/ and point to it
    screenshot:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2UAInvgsNolQvhltC-1VcQFyqoBwb3GJdFJJ6Iyfg7rnCN0gng5jPelYq_4MDrPskYPnQEtxDVo5SduuHvViNBIDdRyF4h7ePXRT5VvmhBrmHULZTqOJ1-c7NxoqCqFTri88JUROGEjYNw9Y4uSbCveW7touB-OAWKWvHltMqLCe0qh-CnRLfo57fqvqvt3nmebMiDbV1iaOd8Stxu2HXQNymcF4Uz8GbMFdftIrS5wH-KGSEf-iFA1EtCnNwG-4lFCAXYaXBw',
  },
  {
    id: 'motion-graphics-showreel',
    title: 'Fast Motion Graphics Showreel',
    subtitle: 'Cinematic Reel',
    description:
      'A compilation of high-impact motion graphics, intros, and promotional videos created using Adobe After Effects and Premiere Pro.',
    highlights: [],
    style: 'Motion graphics / cinematic showreel',
    tags: ['After Effects', 'Premiere Pro', '4K Editing'],
    category: 'Video & Motion',
    role: 'Video editor and motion designer',
    liveUrl: 'https://youtube.com/shorts/8TKrsVJ1unY?si=kV516jUrSO2sY7Ax',
    liveLabel: 'Watch Reel',
    githubUrl: null,
    screenshot: 'Reel.jpeg',
  },
  {
    id: 'cinematic-gaming-edit',
    title: 'Cinematic Gaming Edit',
    subtitle: 'Post Production',
    description:
      'A cinematic gaming edit focused on pacing, color grading, sound design, and visual storytelling for client content.',
    highlights: [],
    style: 'Cinematic edit / color grading',
    tags: ['Color Grading', 'Sound Design', 'Storytelling'],
    category: 'Video & Motion',
    role: 'Video editor and post-production artist',
    liveUrl: 'https://youtu.be/2E3YIuUHpVQ?si=Sg1MMF8o07y08aO6',
    liveLabel: 'Watch Edit',
    githubUrl: null,
    // TODO: hotlinked image; download a real thumbnail into public/projects/ and point to it
    screenshot:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBorfHrziIWaemljFmw2GWXA6ouriOa4zOY38RK0t49SZxVuVdOIPWbpsQDCwnD3_OXtLMU84VWldHmMtqtOE_6_UANWvUUuN75SUHypzC6m80pRr409Hh30qvGEhTPLhnZ_jYkKetAJvtCHZwQx4zXR9BH6iWuT5lWd5kAMADHQyJxEYpeWh0raLU_IIGhh_nU5dWdhcCb9WLPUfOTYV9itRR6_6wTDO5j0Os3-o3PGCQmSuVxfMtNO_f-ED3AMerd_PK9VjYrHQ',
  },
];
