/**
 * All personal content lives here. Sourced from the original ./portfolio site
 * and the design brief, so copy edits never require touching components.
 */

export const PROFILE = {
  name: "Pheng Mengheak",
  title: "Backend Engineer",
  tagline: "Backend Engineer • Microservices & Distributed Systems",
  badgeId: "DEV-2026-KH",
  roleTag: "BACKEND / MICROSERVICES",
  location: "Phnom Penh, Cambodia (UTC+7)",
  email: "pmengheak168@gmail.com",
  resume: "/pmengheak.pdf",
  photo: "/images/heak-cutout.png",
  site: "https://pmengheak.vercel.app",
} as const;

export const BIO = [
  "I started on the infrastructure side: as an IT & Systems Intern at Proseth Solutions I maintained client database integrity, monitored Linux servers, and ran scheduled backups. That work pointed me toward backend engineering, where I build the services that sit on top of that data.",
  "Today I'm a Software Development Trainee at Korea Software HRD Center, building Java and Spring Boot microservices, secure RESTful APIs, and Dockerized deployments, while studying Management Information Systems at SETEC Institute. I care about clean architecture, relational data done right, and distributed systems that are simple to run.",
];

export const FACTS = [
  { value: "3", label: "Full-stack projects" },
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
    role: "Software Development Trainee",
    period: "2026 – Present",
    current: true,
    note: "Full-time engineering training across three tracks.",
    tracks: ["Spring Boot & Microservices", "Android · Kotlin & Compose", "Local LLMs · Ollama & RAG"],
  },
  {
    org: "SETEC Institute",
    short: "SETEC",
    logo: "/logos/setec.png",
    role: "Bachelor of Science in MIS",
    period: "2024 – Present",
    current: true,
    note: "System analysis, distributed relational databases, and enterprise architecture.",
  },
  {
    org: "PUC Institute of Foreign Languages",
    short: "PUC",
    logo: "/logos/puc.png",
    role: "Diploma in English Communication",
    period: "2023 – 2025",
    current: false,
    note: "Technical documentation, engineering presentations, and professional writing.",
  },
];

export const EXPERIENCE = [
  {
    org: "Proseth Solutions Co., Ltd.",
    logo: "/logos/proseth.jpg",
    role: "IT & Systems Intern",
    period: "05/2025 – 12/2025",
    location: "Phnom Penh, KH",
    highlights: [
      "Administered Linux server environments and shell utilities",
      "Maintained client database integrity with scheduled backup & recovery routines",
      "Monitored infrastructure uptime and supported network operations",
      "Troubleshot environment and connectivity issues for the team",
    ],
    tags: ["Linux", "Database Backups", "Monitoring", "Networking"],
  },
];

export const CORE_SKILLS = [
  "Java 21",
  "Spring Boot",
  "Microservices",
  "PostgreSQL",
  "Docker",
  "Keycloak / OAuth2",
  "REST APIs",
  "FastAPI",
  "Ollama",
  "Git",
  "Linux / Bash",
];

export type StackTile = {
  name: string;
  /** Image in /public; tiles without one render their brand mark inline. */
  src?: string;
  mark?: "postgresql" | "linux";
};

export const TECH_STACK: StackTile[] = [
  { name: "Java", src: "/images/java.svg" },
  { name: "Spring", src: "/images/spring.svg" },
  { name: "Docker", src: "/images/docker.svg" },
  { name: "PostgreSQL", mark: "postgresql" },
  { name: "Linux", mark: "linux" },
  { name: "Git", src: "/images/git.svg" },
  { name: "Ollama", src: "/images/ollama.png" },
  { name: "FastAPI", src: "/images/fastapi.svg" },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  imageAlt: string;
  /** Fill in with a public repo / live demo and the card renders the link. */
  repoUrl?: string;
  demoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "snappos",
    title: "SnapPOS",
    subtitle: "Retail POS engine & KHQR payments",
    description:
      "Multi-branch point-of-sale platform with real-time stock control, a responsive cashier checkout, KHQR payment integration, and role-based security.",
    highlights: [
      "Layered Spring Boot service with ACID inventory transactions and pessimistic locking on hot stock",
      "Bakong/KHQR payload generation with webhook verification",
    ],
    tech: ["Spring Boot", "PostgreSQL", "Docker", "Next.js", "Tailwind CSS"],
    image: "/projects/snappos.png",
    imageAlt: "SnapPOS cashier screen with a product grid and shopping cart",
  },
  {
    id: "cortex",
    title: "Cortex Platform",
    subtitle: "Academic copilot & learning platform",
    description:
      "Full-stack educational platform with structured knowledge navigation, curriculum indexing, and course material search.",
    highlights: [
      "Spring Boot REST backend on PostgreSQL with connection pooling, deployed with Docker",
      "Next.js client with type-safe validation and study-group workflows",
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
    highlights: [
      "Genre filtering and sorting by relevance, release date, and rating",
      "Decoupled client–server architecture over REST",
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

export const RECEIPT = [
  ["STATUS", "200 OK"],
  ["STACK", "Java 21 | Spring Boot 3.x | PostgreSQL | Docker"],
  ["SYSTEM", "Active Trainee @ KSHRD (3 tracks) | SETEC MIS"],
  ["UPTIME", "99.9%"],
] as const;
