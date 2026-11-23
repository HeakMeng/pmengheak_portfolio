/**
 * All personal content lives here. Sourced from the original ./portfolio site
 * and the design brief, so copy edits never require touching components.
 */

export const PROFILE = {
  name: "Pheng Mengheak",
  title: "Backend Developer",
  tagline: "Backend Developer • AI Engineer • Microservices & Distributed Systems",
  /** Second role from the CV, shown beside the title in the hero. */
  role2: "AI Engineer",
  city: "Phnom Penh",
  timezone: "UTC+7",
  location: "Phnom Penh, Cambodia (UTC+7)",
  email: "pmengheak168@gmail.com",
  resume: "/pmengheak.pdf",
  /** Editorial waist-up portrait; the hero falls back to `photoFallback` until this file exists. */
  photo: "/images/heak-editorial.png",
  photoFallback: "/images/heak-cutout.png",
  site: "https://pmengheak.vercel.app",
} as const;

export const BIO = [
  "I started on the infrastructure side: as an IT intern at Proseth Solutions I supported payment-integration infrastructure for Bakong-connected financial services, ran Linux servers behind Nginx, managed Docker containers, and kept PostgreSQL backed up and healthy. That work pointed me toward backend engineering, where I build the services that sit on top of that data.",
  "Today I build Java and Spring Boot microservices with a focus on PostgreSQL design, transactional concurrency, and secure APIs (OAuth2, JWT, Keycloak). I've integrated Bakong KHQR payments and engineered schema-validated local LLM and RAG workflows. After the Basic Course at Korea Software HRD Center I was selected for its Advanced Course in Spring microservices, Android, and local AI engineering, alongside my MIS degree at SETEC Institute.",
];

/** Candid photo shown under the "About me" heading. */
export const ABOUT_PHOTO = {
  src: "/pmegheak.jpg",
  alt: "Pheng Mengheak smiling and holding the KSHRD Champions trophy on a football pitch",
  caption: "KSHRD Champions · Winner of the month",
};

export const FACTS = [
  { value: "4", label: "Full-stack projects" },
  { value: "2025", label: "Systems internship" },
  { value: "UTC+7", label: "Phnom Penh" },
];

export type Channel = {
  id: "email" | "telegram" | "github" | "linkedin";
  label: string;
  handle: string;
  href: string;
};

export const CHANNELS: Channel[] = [
  { id: "email", label: "Email", handle: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { id: "telegram", label: "Telegram", handle: "@pmengheak", href: "https://t.me/pmengheak" },
  { id: "github", label: "GitHub", handle: "github.com/HeakMeng", href: "https://github.com/HeakMeng" },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/pheng-mengheak",
    href: "https://www.linkedin.com/in/pheng-mengheak-598442354/",
  },
];

export type EducationItem = {
  org: string;
  short: string;
  logo: string;
  role: string;
  period: string;
  current: boolean;
  note: string;
  tracks?: string[];
};

export const EDUCATION: EducationItem[] = [
  {
    org: "Korea Software HRD Center",
    short: "KSHRD",
    logo: "/logos/kshrd.png",
    role: "Full-Stack Software Engineering & AI Development",
    period: "02/2026 – Present",
    current: true,
    note: "Completed the 5-month full-time Basic Course and was selected for the Advanced Course.",
    tracks: ["Spring Microservices & Enterprise Java", "Android · Kotlin, Compose & MVVM", "Local AI · Ollama, vLLM & RAG"],
  },
  {
    org: "SETEC Institute",
    short: "SETEC",
    logo: "/logos/setec.png",
    role: "Bachelor of Management Information Systems",
    period: "2024 – Present",
    current: true,
    note: "Java & C#, data structures, relational database design (Oracle & SQL Server), system analysis, networking, and Linux administration.",
  },
  {
    org: "PUC Institute of Foreign Languages",
    short: "PUC",
    logo: "/logos/puc.png",
    role: "Diploma in Academic English",
    period: "2023 – 2025",
    current: false,
    note: "1,128-hour full-time programme: academic reading, structured writing, listening, and workplace communication.",
  },
];

export const EXPERIENCE = [
  {
    org: "Proseth Solutions Co., Ltd.",
    logo: "/logos/proseth.jpg",
    logoSize: { width: 899, height: 222 },
    /** Shown as the open file in the card's editor title bar. */
    file: "proseth.log",
    role: "IT Intern · Systems & Infrastructure Support",
    period: "05/2025 – 12/2025",
    location: "Phnom Penh, KH",
    highlights: [
      "Supported payment-integration infrastructure and transaction-monitoring workflows for Bakong-connected financial services",
      "Administered Linux servers, configuring Nginx reverse proxies and managing Docker containers for application hosting",
      "Maintained PostgreSQL databases: automated backups, query verification, and performance monitoring",
    ],
    tags: ["Linux", "Nginx", "Docker", "PostgreSQL", "Bakong"],
  },
  {
    org: "Korea Software HRD Center",
    logo: "/logos/kshrd.png",
    logoSize: { width: 728, height: 890 },
    file: "kshrd.log",
    role: "Full-Stack Software Engineering & AI · Advanced Course",
    period: "02/2026 – Present",
    location: "Phnom Penh, KH",
    highlights: [
      "Spring microservices: API Gateway, Service Discovery, OpenFeign, Config Server, Circuit Breaker, and distributed tracing",
      "Event-driven messaging with Kafka and RabbitMQ, plus WebSocket real-time features",
      "Local AI engineering: Ollama & vLLM serving, LangChain, LlamaIndex, Spring AI, RAG evaluation, and agent tool-calling",
      "Native Android with Kotlin, Jetpack Compose, and MVVM; Docker Compose deployments",
    ],
    tags: ["Spring Cloud", "Kafka", "Spring AI", "Android"],
  },
];

export const LANGUAGES = [
  { name: "Khmer", level: "Native", percent: 100 },
  { name: "English", level: "Working", percent: 80 },
  { name: "Korean", level: "Elementary", percent: 30 },
];

export const AI_ARCHITECTURE = [
  {
    id: "ollama",
    title: "Local LLMs & RAG",
    summary: "Ollama-served models, RAG pipelines, and schema-validated tool-calling that keep data on your own hardware.",
  },
  {
    id: "spring-cloud",
    title: "Spring Cloud / Microservices",
    summary: "Gateways, discovery, circuit breakers, and OAuth2-secured services that scale independently.",
  },
  {
    id: "messaging",
    title: "Event-Driven Messaging",
    summary: "Kafka and RabbitMQ for decoupled, resilient services that communicate through events.",
  },
] as const;

export const CORE_SKILLS = [
  "Java",
  "Spring Boot",
  "Spring Security",
  "JPA / Hibernate",
  "Microservices",
  "REST APIs",
  "PostgreSQL",
  "Kafka",
  "RabbitMQ",
  "Keycloak",
  "JWT / OAuth2",
  "Docker",
  "AWS",
  "Nginx",
  "GitHub Actions",
  "Linux / Bash",
  "Ollama",
  "FastAPI",
  "Kotlin / Compose",
  "Git",
];

/** Rendered as app-icon tiles in the capabilities bar. */
export const STACK = ["Java", "Spring", "PostgreSQL", "Docker", "Linux", "Git"] as const;

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  /** Short uppercase tag shown beside the card number. */
  category: string;
  description: string;
  /** Where the project came from, e.g. a programme or team context. */
  context?: string;
  /** Case-study bullets: my own work on a team project. */
  contributions?: string[];
  /** Case-study bullets: how the system is put together. */
  architecture?: string[];
  /** Case-study bullets: persistence, transactions, and API surface. */
  dataApi?: string[];
  tech: string[];
  image: string;
  imageAlt: string;
  /** Fill in with a public repo / live demo and the card renders the link. */
  repoUrl?: string;
  demoUrl?: string;
};

/** The first entry is rendered as the full-width featured card. */
export const PROJECTS: Project[] = [
  {
    id: "insighthub",
    title: "InsightHub",
    subtitle: "AI-Powered Learning Assistant",
    category: "AI Learning",
    context: "Final Project · KSHRD 14th Generation",
    description:
      "Private B2B AI learning platform for schools that turns lecture material—PPTX, PDF, Word, audio, and video/YouTube—into cited summaries, quizzes, flashcards, and a multilingual AI tutor, powered by a fully local RAG pipeline across web and Android clients.",
    contributions: [
      "Architected the multi-module Spring Boot backend and its Keycloak (OAuth2/OIDC, JWT) security: MFA/2-step verification, password policies, and audit logs",
      "Engineered the Admin Dashboard frontend (Next.js/TypeScript) and backend APIs, including bulk Excel student import with validation, preview, and automated welcome emails",
      "Engineered the local RAG pipeline (FastAPI + Ollama) on PostgreSQL/pgvector, with strict classroom/workspace scope filtering and slide, page, and timestamp source citations",
    ],
    tech: ["Java", "Spring Boot", "Keycloak", "PostgreSQL / pgvector", "FastAPI", "Ollama", "Next.js", "Android"],
    image: "/projects/InsightHub.png",
    imageAlt: "InsightHub landing page with a teacher dashboard of classrooms, students, and courses",
    demoUrl: "https://insighthub.kshrd.app",
  },
  {
    id: "snappos",
    title: "SnapPOS",
    subtitle: "Retail POS engine & KHQR payments",
    description:
      "Multi-branch point-of-sale and inventory platform with real-time stock control, Bakong KHQR payments, role-based security, and SnapTrack—a mobile PWA for branch stock transfers and supplier receiving. I led the backend architecture.",
    category: "Retail POS",
    architecture: [
      "Layered Spring Boot service (controller → service → repository) behind a Next.js + Tailwind cashier client",
      "Multi-branch model with role-based security for cashiers and managers",
      "SnapTrack PWA for branch-to-branch stock transfers and supplier receiving",
      "Dockerized services for repeatable local and server deployments",
    ],
    dataApi: [
      "PostgreSQL inventory with ACID transactions and pessimistic locking on hot stock",
      "Real-time stock control across branches",
      "Bakong/KHQR payment payload generation with webhook verification",
    ],
    tech: ["Spring Boot", "PostgreSQL", "Docker", "Next.js", "Tailwind CSS"],
    image: "/projects/snappos.png",
    imageAlt: "SnapPOS cashier screen with a product grid and shopping cart",
  },
  {
    id: "cortex",
    title: "Cortex Platform",
    subtitle: "EdTech community & AI study assistant",
    description:
      "Full-stack EdTech learning community where students ask technical questions, collaborate through real-time group chat and video calls, and get help from a conversational AI study assistant.",
    category: "EdTech",
    architecture: [
      "Spring Boot REST backend consumed by a Next.js client",
      "Real-time group chat and video calls for study groups",
      "Conversational AI study assistant built into the learning flow",
      "Containerized with Docker",
    ],
    dataApi: [
      "PostgreSQL with connection pooling",
      "Curriculum indexing and structured knowledge navigation",
      "Course-material search endpoints",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Next.js"],
    image: "/projects/cortex.png",
    imageAlt: "Cortex platform home page showing the learning dashboard",
  },
  {
    id: "gamehub",
    title: "GameHub",
    subtitle: "Video game discovery & catalog",
    description:
      "Game discovery app with a React client consuming a custom Spring Boot REST API for genres, catalog search, and game details.",
    category: "Catalog",
    architecture: [
      "React + TypeScript client decoupled from a custom Spring Boot REST API",
      "Tailwind CSS UI for browsing genres, search results, and game details",
    ],
    dataApi: [
      "REST endpoints for genres, catalog search, and game details",
      "Genre filtering and sorting by relevance, release date, and rating",
    ],
    tech: ["React", "TypeScript", "Spring Boot", "REST API", "Tailwind CSS"],
    image: "/projects/gamehub.png",
    imageAlt: "GameHub catalog showing a grid of video game cards",
  },
];

export const ACHIEVEMENTS = [
  { period: "2023 – 2025", title: "PUC English Diploma", detail: "English Communication" },
  { period: "2024 – Present", title: "SETEC MIS Degree", detail: "B.Sc. Management Information Systems" },
  { period: "2026", title: "KSHRD Trainee Scholarship", detail: "Software Development · 3 tracks" },
];

