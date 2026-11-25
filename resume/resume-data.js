/**
 * Resume content: single source for both PDFs built by scripts/build-resume.mjs
 *   public/Husnain_Faisal_Resume_ATS.pdf     plain, single-column, ATS-first
 *   public/Husnain_Faisal_Resume_Design.pdf  branded, still single-column so ATS can parse it
 *
 * ATS notes for future edits:
 * - Keep standard section names (Summary, Skills, Experience, Projects, Education).
 * - Write key terms both ways at least once, e.g. "Retrieval-Augmented Generation (RAG)".
 * - Start bullets with a strong verb; keep only facts you can talk about in an interview.
 * - Keep it to one page: rebuild and check the page count after edits.
 * - Rebuild: node scripts/build-resume.mjs
 */

const resume = {
  name: 'Husnain Faisal',
  headline: 'Full Stack Developer | Laravel | Node.js | React | AI Applications',

  contact: [
    { type: 'location', label: 'Lahore, Pakistan' },
    { type: 'phone', label: '+92 302 4149916', href: 'tel:+923024149916' },
    { type: 'email', label: 'stoneager23@gmail.com', href: 'mailto:stoneager23@gmail.com' },
    { type: 'website', label: 'husnainweb.online', href: 'https://www.husnainweb.online' },
    { type: 'github', label: 'github.com/stoneager23-beep', href: 'https://github.com/stoneager23-beep' },
    {
      type: 'linkedin',
      label: 'linkedin.com/in/husnain-faisal-530009216',
      href: 'https://www.linkedin.com/in/husnain-faisal-530009216/',
    },
  ],

  summary:
    'Full Stack Developer building production web apps with Laravel, PHP, MySQL, React and Node.js/Express.js, plus ' +
    'AI applications using LLMs, Retrieval-Augmented Generation (RAG), LangChain and the OpenAI API. Shipped Laravel ' +
    'apps serving 1,000+ users, RESTful APIs with JWT and RBAC, a live e-commerce platform and n8n automation, backed ' +
    'by hands-on ERP QA testing.',

  skills: [
    { label: 'Languages', items: ['PHP', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'] },
    {
      label: 'Frameworks & Libraries',
      items: ['Laravel', 'React', 'Node.js', 'Express.js', 'Streamlit', 'Tailwind CSS', 'Bootstrap', 'Chart.js'],
    },
    {
      label: 'AI & Automation',
      items: ['Large Language Models (LLMs)', 'RAG', 'LangChain', 'OpenAI API', 'n8n automation'],
    },
    {
      label: 'Backend & Databases',
      items: [
        'RESTful APIs',
        'JWT',
        'Role-Based Access Control (RBAC)',
        'MySQL',
        'Supabase',
        'Database design (ERD)',
        'Query optimization',
      ],
    },
    {
      label: 'CMS & Integrations',
      items: ['WordPress', 'WooCommerce', 'Clover POS', 'Smart Online Order', 'DoorDash Drive', 'SMTP', 'SEO'],
    },
    {
      label: 'Tools & Practices',
      items: ['Git', 'GitHub', 'Composer', 'npm', 'Postman', 'VS Code', 'Agile', 'QA testing', 'Client communication'],
    },
  ],

  experience: [
    {
      title: 'Laravel Developer',
      company: 'NetRoots Technologies (NRT)',
      location: 'Lahore, Pakistan',
      dates: 'Dec 2025 - Present',
      bullets: [
        'Develop Laravel/PHP pages and dynamic blog features for university clients, including UCL and BHS.',
        'Build admin CRUD panels for database-backed content, supporting record creation, viewing, updates and deletion.',
        'Maintain WordPress/WooCommerce websites, resolving plugin conflicts, SMTP email delivery failures and SEO/sitemap issues.',
        'QA-test Cornerstone, MCJ and OPF Laravel ERPs (Purchase Requisition, GRN, Inventory, Fee Management, HR): verify forms, permissions, reports and data flow, document defects with reproduction steps, and coordinate fixes with developers.',
      ],
    },
    {
      title: 'Full Stack Web Developer',
      company: 'Freelance / Contract',
      location: 'Remote',
      dates: 'Sep 2025 - Present',
      bullets: [
        'Build and deploy Laravel applications supporting 1,000+ users in production, with RESTful APIs secured by JWT authentication and role-based access control (RBAC).',
        'Optimize MySQL queries and indexing, and translate client requirements into working website and application features.',
        'Keep clients aligned through clear communication, regular progress updates and feedback-led revisions.',
      ],
    },
  ],

  projects: [
    {
      name: 'Northern Harvester',
      tech: ['React', 'Node.js', 'Express.js', 'Supabase'],
      link: { label: 'northern-harvester.com', href: 'https://northern-harvester.com' },
      bullets: [
        'Built a full-stack dry-fruits e-commerce store: React frontend and Express.js API backed by Supabase, deployed on Hostinger.',
        'Developed an admin panel with product CRUD, profit management and CRM, an SEO blog with custom meta titles and descriptions, and cash-on-delivery, wallet and bank-transfer payments.',
      ],
    },
    {
      name: 'AI Applications (LLM & RAG)',
      tech: ['Python', 'LangChain', 'OpenAI API', 'Streamlit'],
      link: { label: 'husnainweb.online/#projects', href: 'https://www.husnainweb.online/#projects' },
      bullets: [
        // supported file types and citations: taken from the live app
        'RAG Document Reader: Q&A over uploaded PDF, DOCX, PPTX, CSV and XLSX files, citing the exact page, slide or row.',
        // "answers from manuals and policies, with sources": taken from the live app
        "Pearlz Home AI: RAG support agent for an air purifier company, answering from its manuals and policies with sources.",
        'MarketMind AI (market research to business-plan recommendation), MediGuide AI (educational symptom guidance) and AuroraGPT (ChatGPT client with bring-your-own OpenAI API key and per-key chat history).',
      ],
    },
    {
      name: 'AI Resume Analyzer',
      tech: ['n8n', 'OpenAI', 'Gmail', 'Google Sheets'],
      bullets: [
        'n8n workflow that picks up resumes from Gmail, analyzes each candidate with OpenAI and writes a capability justification.',
      ],
    },
    {
      name: 'Learning Management System',
      tech: ['Laravel', 'React', 'MySQL', 'JWT', 'Chart.js'],
      link: { label: 'GitHub: lms-platform', href: 'https://github.com/stoneager23-beep/lms-platform' },
      bullets: [
        'Built course, lesson and enrollment management plus Admin/Instructor/Student dashboards on a Laravel REST API.',
      ],
    },
    {
      name: 'Factory Management System',
      tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
      link: {
        label: 'GitHub: factory-management-system',
        href: 'https://github.com/stoneager23-beep/factory-management-system',
      },
      bullets: [
        'Built ERP modules for fabrics, inventory, invoices and customers with automated invoicing, REST APIs and RBAC.',
      ],
    },
    {
      name: "America's Greatest Wings",
      tech: ['WordPress', 'WooCommerce', 'Clover POS', 'DoorDash Drive'],
      link: { label: 'americasgreatestwings.com', href: 'https://americasgreatestwings.com' },
      bullets: [
        'Integrated Clover POS + Smart Online Order on WordPress with custom location-popup and branch-routing code.',
      ],
    },
  ],

  education: [
    {
      degree: 'BSc Software Engineering Technology',
      school: 'Punjab Tianjin University of Technology',
      location: 'Lahore, Pakistan',
      dates: 'Expected 2026',
      details: 'GPA: 3.01/4.0',
    },
  ],

  // rendered together with languages under "Additional Information"
  achievements: [
    'Winner, internal NetRoots Technologies (NRT) competition: six-sheet Excel workload tool with live dashboards and self-updating indicators.',
    'Professional development: Advanced Laravel course (Udemy); ongoing project-based learning.',
  ],

  languages: ['English (Fluent)', 'Urdu (Fluent)', 'Korean (Conversational)'],
};

export default resume;
