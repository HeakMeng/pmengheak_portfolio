"use client";

import React, { useState, useEffect } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Layers,
  Loader2,
  MapPin,
  Send,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import {
  SiSpringboot,
  SiFastapi,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiLinux,
  SiNginx,
  SiGit,
  SiJsonwebtokens,
  SiKeycloak,
  SiSpringsecurity,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGithub,
  SiTelegram,
  SiOllama,
  SiLangchain,
  SiNodedotjs,
} from "react-icons/si";
import { FaJava, FaKey, FaLinkedin } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";

interface MilestoneTrack {
  title: string;
  badge: string;
  description?: string;
  modules: string[];
}

interface MilestoneItem {
  id: string;
  year: string;
  organization: string;
  logo: string;
  role: string;
  location: string;
  locationIcon: string;
  status: string;
  statusType: "current" | "defense" | "completed" | "graduated";
  category: "EXPERIENCE & TRAINING" | "EDUCATION";
  achievement: string;
  skills: string[];
  tracks?: MilestoneTrack[];
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "kshrd",
    year: "2026 — PRESENT",
    organization: "Korea Software HRD Center",
    logo: "/hrd.png",
    role: "Software Development Trainee",
    location: "Phnom Penh, KH",
    locationIcon: "📍",
    status: "CURRENT",
    statusType: "current",
    category: "EXPERIENCE & TRAINING",
    achievement: "Intensive full-time engineering training focusing on enterprise Spring Boot microservices, high-throughput local LLM serving with Ollama/RAG, and reactive mobile application development.",
    skills: ["Java", "Spring Boot 3", "Microservices", "OAuth2 / Keycloak", "RabbitMQ", "Ollama & RAG", "Docker", "Kotlin"],
    tracks: [
      {
        title: "Spring Advanced & Microservices",
        badge: "CORE BACKEND",
        description: "Enterprise microservice architectures, cloud-native APIs, and message queues.",
        modules: [
          "Spring Boot 3, Spring Cloud & Microservices Architecture",
          "OAuth2, Keycloak & Distributed Security",
          "RabbitMQ & Apache Kafka Message Streaming",
          "Docker, Docker Compose & Spring AI Integration"
        ]
      },
      {
        title: "Mobile Development (Android)",
        badge: "KOTLIN & JETPACK",
        description: "Native Android applications built with declarative UI and clean architecture.",
        modules: [
          "Kotlin and Object-Oriented Foundations",
          "Modern UI Design & Layout with Jetpack Compose",
          "MVVM Architecture & Reactive State Management",
          "Networking Integration (Retrofit) & Hilt Dependency Injection"
        ]
      },
      {
        title: "AI Engineering: Local LLMs",
        badge: "AX SPECIALIST",
        description: "Private on-premise model serving and autonomous agent workflows.",
        modules: [
          "Linux GPU Setup, Ollama & vLLM High-Throughput Serving",
          "RAG Architectures with Vector DBs & Knowledge Retrieval",
          "LangChain & LlamaIndex Framework Orchestration",
          "Autonomous Agent Tool Calling, Quantization & Docker"
        ]
      }
    ]
  },
  {
    id: "setec",
    year: "2024 — PRESENT",
    organization: "SETEC Institute",
    logo: "/SETTTTTEC.png",
    role: "Bachelor of Science in MIS",
    location: "MIS Dept // Phnom Penh",
    locationIcon: "🏛️",
    status: "DEGREE DEFENSE",
    statusType: "defense",
    category: "EDUCATION",
    achievement: "Academic curriculum focused on system analysis defense, distributed relational database systems, schema optimization, and enterprise software architecture.",
    skills: ["System Analysis & Design", "Distributed Databases", "PostgreSQL", "MySQL", "Data Modeling", "Enterprise Architecture"],
    tracks: [
      {
        title: "Management Information Systems (MIS)",
        badge: "DEGREE PROGRAM",
        description: "Enterprise system modeling, distributed database architectures, and IT infrastructure defense.",
        modules: [
          "System Analysis, Process Engineering & Enterprise Architecture",
          "Distributed Relational Database Management (PostgreSQL & MySQL)",
          "Data Modeling, ER Diagrams & Business Logic Defense"
        ]
      }
    ]
  },
  {
    id: "proseth",
    year: "MAY 2025 — DEC 2025",
    organization: "PROSETH SOLUTIONS CO., LTD.",
    logo: "/prosethsolutions.jpg",
    role: "IT & Systems Intern",
    location: "Phnom Penh, KH",
    locationIcon: "📍",
    status: "COMPLETED",
    statusType: "completed",
    category: "EXPERIENCE & TRAINING",
    achievement: "Maintained client database integrity, monitored Linux server infrastructure uptime, executed scheduled backup routines, and supported network infrastructure operations.",
    skills: ["Linux Server Admin", "Database Backups", "Infrastructure Monitoring", "Network Troubleshooting"],
    tracks: [
      {
        title: "Systems, Infrastructure & Database Operations",
        badge: "INDUSTRY INTERNSHIP",
        description: "Operational system administration, server maintenance, and database continuity.",
        modules: [
          "Linux Server Environment Administration & Shell Utilities",
          "Relational Database Backup, Recovery & Maintenance",
          "Network Infrastructure Troubleshooting & Server Monitoring"
        ]
      }
    ]
  },
  {
    id: "puc",
    year: "2023 — 2025",
    organization: "PUC Institute of Foreign Languages",
    logo: "/images.png",
    role: "Diploma in English Communication",
    location: "Phnom Penh, KH",
    locationIcon: "📍",
    status: "GRADUATED",
    statusType: "graduated",
    category: "EDUCATION",
    achievement: "Comprehensive professional English training with an emphasis on technical documentation, cross-cultural engineering team collaboration, and architectural presentations.",
    skills: ["Technical Documentation", "Engineering Presentations", "Professional English Fluency"],
    tracks: [
      {
        title: "Professional English Communication",
        badge: "INSTITUTE DIPLOMA",
        description: "Advanced English proficiency tailored for engineering collaboration and presentations.",
        modules: [
          "Technical Documentation & Engineering System Specifications",
          "Professional Cross-Border Communication & Technical Writing",
          "Academic Presentation & Analytical Discussions"
        ]
      }
    ]
  }
];

type CaseStudyId = "cortex" | "gamehub" | "snappos";

interface ProjectCard {
  id: CaseStudyId;
  anchor: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  imageAlt: string;
  imageFit: string;
  /** Add a verified public repository / demo URL and the card renders the link. */
  repoUrl?: string;
  demoUrl?: string;
  /** Content of the case study dialog. */
  caseStudy: {
    title: string;
    subtitle: string;
    heading: string;
    points: { title: string; text: string }[];
    stack: string;
    imageFit: string;
  };
}

const PROJECT_CARDS: ProjectCard[] = [
  {
    id: "cortex",
    anchor: "project-01",
    number: "01",
    category: "Academic platform",
    title: "Cortex Platform",
    subtitle: "Academic copilot & learning platform",
    description:
      "Full-stack educational platform with intuitive knowledge navigation, structured course indexing, and responsive user interfaces.",
    highlights: [
      "Curriculum indexing and course material search",
      "Spring Boot REST backend with PostgreSQL, deployed with Docker",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Next.js"],
    image: "/assets/Cortex.png",
    imageAlt: "Cortex Academic Platform home page showing the learning dashboard",
    imageFit: "object-cover object-top",
    caseStudy: {
      title: "Cortex Academic Platform",
      subtitle: "Autonomous Academic Copilot & Learning Platform",
      heading: "Architectural Highlights",
      points: [
        {
          title: "Structured Knowledge Navigation",
          text: "Full-stack educational platform with intuitive curriculum indexing, course material search, and responsive user interfaces.",
        },
        {
          title: "Robust Java Spring Boot Backend",
          text: "Enterprise RESTful service architecture backed by PostgreSQL database persistence, connection pooling, and Docker deployment.",
        },
        {
          title: "Interactive Client Interface",
          text: "Next.js frontend with fast static routing, type-safe data validation, and clean study group workflows.",
        },
      ],
      stack: "Java, Spring Boot, PostgreSQL, Docker, Next.js",
      imageFit: "object-cover object-top",
    },
  },
  {
    id: "gamehub",
    anchor: "project-02",
    number: "02",
    category: "Full-stack web app",
    title: "GameHub",
    subtitle: "Video game discovery & catalog",
    description:
      "Game discovery platform built while mastering React client architecture, powered by a Java Spring Boot REST API for genres, search and game details.",
    highlights: [
      "Genre filtering and sorting by relevance, release date and rating",
      "React client consuming a custom Spring Boot REST API",
    ],
    tech: ["React", "TypeScript", "Spring Boot", "REST API", "Tailwind CSS"],
    image: "/assets/gamehub.png",
    imageAlt: "GameHub catalog showing a grid of video game cards with platform icons",
    imageFit: "object-cover object-top",
    caseStudy: {
      title: "GameHub — Video Game Discovery & Catalog",
      subtitle: "Full-Stack Web App · React & Spring Boot Architecture",
      heading: "Key Features & Architectural Highlights",
      points: [
        {
          title: "Dynamic Filtering & Multi-Platform Sorting",
          text: "Real-time genre filtering and multi-platform query sorting by relevance, release date, and Metacritic rating scores.",
        },
        {
          title: "Decoupled Full-Stack Architecture",
          text: "Clean client-server separation consuming custom Java Spring Boot REST backend endpoints for genres, catalog search, and game details.",
        },
        {
          title: "Interactive Responsive Client",
          text: "Modern game card grid featuring Metacritic score badges, system/platform icons, instant dark mode toggle, and detail routing.",
        },
      ],
      stack: "React, TypeScript, Spring Boot, REST API, Tailwind CSS",
      imageFit: "object-cover object-top",
    },
  },
  {
    id: "snappos",
    anchor: "project-03",
    number: "03",
    category: "Full-stack application",
    title: "SnapPOS Retail Engine",
    subtitle: "POS platform & KHQR payment gateway",
    description:
      "Multi-branch POS platform with real-time stock control, a responsive cashier checkout UI, KHQR payment integration, and role-based security.",
    highlights: [
      "Layered Spring Boot service with ACID inventory transactions",
      "Bakong/KHQR payload generation with webhook verification",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Spring Boot", "PostgreSQL", "Docker"],
    image: "/assets/SnapPOS.png",
    imageAlt: "SnapPOS cashier screen showing a product grid and shopping cart",
    imageFit: "object-cover object-top",
    caseStudy: {
      title: "SnapPOS Enterprise Retail Backend",
      subtitle: "High-Throughput Retail POS Engine",
      heading: "Architecture Highlights",
      points: [
        {
          title: "Spring Boot Engine",
          text: "Layered MVC architecture with decoupled Service, Repository, and Security token filters.",
        },
        {
          title: "PostgreSQL Concurrency",
          text: "Strict ACID transactions for inventory deductions with pessimistic locking on hot stock items.",
        },
        {
          title: "Automated KHQR Integrations",
          text: "Dynamic Bakong/KHQR payload generator with webhook verification for cashier checkouts.",
        },
      ],
      stack: "Spring Boot, Java, PostgreSQL, Docker",
      imageFit: "object-cover",
    },
  },
];

interface SkillItem {
  name: string;
  category: string;
  icon?: ComponentType<{ className?: string; style?: CSSProperties }>;
  svgSrc?: string;
  color: string;
}

// Brand colors; monochrome marks use the ink colour.
const SKILL_GROUPS: { label: string; items: SkillItem[] }[] = [
  {
    label: "Backend core",
    items: [
      { name: "Java", category: "Core language", icon: FaJava, color: "#ED8B00" },
      { name: "Spring Boot", category: "Backend engine", icon: SiSpringboot, color: "#6DB33F" },
      { name: "REST APIs", category: "API design", icon: TbApi, color: "#0B1220" },
      { name: "Microservices", category: "Architecture", icon: Boxes, color: "#0B1220" },
      { name: "Python", category: "AI & scripting", icon: SiPython, color: "#5A9FD4" },
      { name: "FastAPI", category: "API framework", icon: SiFastapi, color: "#05A88F" },
      { name: "Node.js", category: "JS runtime", icon: SiNodedotjs, color: "#5FA04E" },
    ],
  },
  {
    label: "Security & identity",
    items: [
      { name: "Spring Security", category: "App security", icon: SiSpringsecurity, color: "#6DB33F" },
      { name: "Keycloak", category: "Identity & SSO", icon: SiKeycloak, color: "#0B1220" },
      { name: "OAuth 2.0", category: "Authorization", icon: FaKey, color: "#0B1220" },
      { name: "JWT", category: "Token auth", icon: SiJsonwebtokens, color: "#0B1220" },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", category: "Relational DB", icon: SiPostgresql, color: "#7C9CF0" },
      { name: "MySQL", category: "Relational DB", icon: SiMysql, color: "#5B9BD5" },
      { name: "MongoDB", category: "Document DB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Docker", category: "Containers", icon: SiDocker, color: "#2496ED" },
      { name: "Linux", category: "OS & servers", icon: SiLinux, color: "#FCC624" },
      { name: "Nginx", category: "Reverse proxy", icon: SiNginx, color: "#1FB955" },
      { name: "Git", category: "Version control", icon: SiGit, color: "#F05032" },
    ],
  },
  {
    label: "Local AI",
    items: [
      { name: "Ollama", category: "Local LLMs", icon: SiOllama, color: "#0B1220" },
      { name: "LangChain", category: "RAG framework", icon: SiLangchain, color: "#0B1220" },
      { name: "ChromaDB", category: "Vector store", svgSrc: "/images/chroma.svg", color: "#FFDE2D" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "Next.js", category: "Web framework", icon: SiNextdotjs, color: "#0B1220" },
      { name: "React", category: "Frontend UI", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", category: "Type system", icon: SiTypescript, color: "#4A90E2" },
      { name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
];

const SKILL_COUNT = SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const CHANNELS = [
  { href: "https://github.com/HeakMeng", label: "GitHub", handle: "HeakMeng", icon: SiGithub },
  { href: "https://www.linkedin.com/in/pheng-mengheak-598442354/", label: "LinkedIn", handle: "Pheng Mengheak", icon: FaLinkedin },
  { href: "https://t.me/pmengheak", label: "Telegram", handle: "@pmengheak", icon: SiTelegram },
];

const MILESTONE_TABS = [
  { value: "ALL MILESTONES", label: "All" },
  { value: "EXPERIENCE & TRAINING", label: "Experience & training" },
  { value: "EDUCATION", label: "Education" },
] as const;

type MilestoneTab = (typeof MILESTONE_TABS)[number]["value"];

const EMAIL = "pmengheak168@gmail.com";

/** Arrow that slides out and back in when the surrounding `.group` is hovered. */
function SwapArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="arrow-swap" aria-hidden="true">
      <ArrowUpRight className={className} />
      <ArrowUpRight className={className} />
    </span>
  );
}

function ProjectTags({ project }: { project: ProjectCard }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
      {project.tech.map((tech) => (
        <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ProjectActions({ project, onOpen }: { project: ProjectCard; onOpen: (id: CaseStudyId) => void }) {
  const linkClass =
    "inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.15em] text-muted underline-offset-4 transition-colors hover:text-accent-ink hover:underline";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-fg px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-bg transition-colors hover:bg-accent hover:text-white"
      >
        Case study
        <SwapArrow className="h-3.5 w-3.5" />
      </button>
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          GitHub<span className="sr-only"> repository for {project.title} (opens in new tab)</span>
        </a>
      )}
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live demo<span className="sr-only"> of {project.title} (opens in new tab)</span>
        </a>
      )}
    </div>
  );
}

/** Screenshot in a browser window, lifted off a tilted accent card that straightens on hover. */
function BrowserFrame({ project, flip }: { project: ProjectCard; flip: boolean }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-2xl bg-accent/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 ${
          flip ? "-translate-x-4 translate-y-4 -rotate-2" : "translate-x-4 translate-y-4 rotate-2"
        }`}
      />
      <div
        data-parallax
        className="relative overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_60px_-30px_rgba(11,18,32,0.35)] transition-[translate,box-shadow] duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_40px_70px_-30px_rgba(11,18,32,0.45)]"
      >
        <div className="flex items-center gap-3 border-b border-line bg-panel-2 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </span>
          <span className="mx-auto truncate rounded-md bg-panel px-3 py-1 font-mono text-[10px] text-muted">
            ~/projects/{project.id}
          </span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
            className={`${project.imageFit} shot`}
          />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ type }: { type: MilestoneItem["statusType"] }) {
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]";
  switch (type) {
    case "current":
      return (
        <span className={`${base} border-signal/40 bg-signal/10 text-signal`}>
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          Current
        </span>
      );
    case "defense":
      return <span className={`${base} border-accent/40 bg-accent/10 text-accent-ink`}>Degree defense</span>;
    case "completed":
      return <span className={`${base} border-line text-muted`}>Completed</span>;
    case "graduated":
      return <span className={`${base} border-line text-muted`}>Graduated</span>;
  }
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-lg border bg-bg px-4 py-3.5 text-[15px] text-fg outline-none transition-colors placeholder:text-muted/50 hover:border-[#C3CDDC] focus:border-accent ${
    invalid ? "border-red-400" : "border-line"
  }`;

export default function PortfolioClient({ hero, about }: { hero: ReactNode; about: ReactNode }) {
  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "", hp_company: "" });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("Message sent successfully!");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Case study dialog
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyId | null>(null);
  const activeProject = PROJECT_CARDS.find((project) => project.id === selectedCaseStudy) ?? null;

  // Milestone filter & expanded row
  const [milestoneTab, setMilestoneTab] = useState<MilestoneTab>("ALL MILESTONES");
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);

  const toggleMilestone = (id: string) => {
    setActiveMilestoneId((prev) => (prev === id ? null : id));
  };

  const handleTabChange = (tab: MilestoneTab) => {
    setMilestoneTab(tab);
    setActiveMilestoneId(null);
  };

  // Keyboard escape handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCaseStudy(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Form submit handler with real Next.js route handler dispatch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: false, email: false, message: false };

    if (formData.name.trim().length < 2) {
      newErrors.name = true;
      hasError = true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = true;
      hasError = true;
    }
    if (formData.message.trim().length < 5) {
      newErrors.message = true;
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch message.");
      }

      setSubmitStatus("success");
      setToastMessage(data.message || "Your message has been received! I will respond within 24 hours.");
      setToastOpen(true);
      setFormData({ name: "", email: "", message: "", hp_company: "" });
      setTimeout(() => setToastOpen(false), 6000);
    } catch (err: unknown) {
      setSubmitStatus("error");
      const msg = err instanceof Error ? err.message : "Error dispatching message. Please email directly.";
      setErrorMessage(msg);
      setToastMessage(msg);
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy email utility
  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setToastMessage(`Email copied to clipboard: ${EMAIL}`);
    setToastOpen(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setToastOpen(false);
    }, 3500);
  };

  const visibleMilestones = MILESTONES.filter(
    (item) => milestoneTab === "ALL MILESTONES" || item.category === milestoneTab,
  );

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg font-sans text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        {hero}

        {about}

        {/* ============ PROJECTS ============ */}
        <section
          id="systems"
          aria-labelledby="systems-heading"
          className="relative scroll-mt-20 border-t border-line bg-bg-2 px-6 py-28 sm:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              index="02"
              label="Projects"
              titleId="systems-heading"
              title={
                <>
                  Selected projects<span className="text-accent-ink">.</span>
                </>
              }
              intro="Three full-stack projects built around Java and Spring Boot backends."
            />

            {/* One editorial row per project; screenshots alternate sides */}
            <div className="mt-20 space-y-24 lg:space-y-32">
              {PROJECT_CARDS.map((project, i) => (
                <article
                  key={project.id}
                  id={project.anchor}
                  data-reveal-item
                  aria-labelledby={`${project.anchor}-title`}
                  className="group grid scroll-mt-24 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
                >
                  <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                    <BrowserFrame project={project} flip={i % 2 === 1} />
                  </div>

                  <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span className="display text-6xl leading-none text-accent sm:text-7xl" aria-hidden="true">
                        {project.number}
                      </span>
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                      <span className="eyebrow text-muted">{project.category}</span>
                    </div>
                    <h3 id={`${project.anchor}-title`} className="mt-7 text-4xl text-fg sm:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-accent-ink">{project.subtitle}</p>
                    <p className="mt-5 text-base leading-relaxed text-muted">{project.description}</p>

                    <ul className="mt-6 space-y-2.5 border-l-2 border-accent/40 pl-4 text-sm text-fg/80">
                      {project.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <ProjectTags project={project} />
                    </div>
                    <div className="mt-8">
                      <ProjectActions project={project} onOpen={setSelectedCaseStudy} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section
          id="milestones"
          aria-labelledby="milestones-heading"
          className="relative scroll-mt-20 border-t border-line px-6 py-28 sm:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              index="03"
              label="Experience"
              titleId="milestones-heading"
              title={
                <>
                  Experience &amp; milestones<span className="text-accent-ink">.</span>
                </>
              }
              intro="Engineering journey, industry internships, technical training, and academic background."
              aside={
                <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-line bg-panel p-1">
                  {MILESTONE_TABS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleTabChange(value)}
                      aria-pressed={milestoneTab === value}
                      className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors sm:px-5 ${
                        milestoneTab === value ? "bg-accent text-white" : "text-muted hover:text-fg"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              }
            />

            <ol className="relative mt-16 space-y-5 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-line sm:before:left-[15px]">
              {visibleMilestones.map((item) => {
                const open = activeMilestoneId === item.id;
                return (
                  <li key={item.id} className="relative pl-10 sm:pl-14">
                    <span
                      aria-hidden="true"
                      className={`absolute left-[5px] top-9 h-[13px] w-[13px] rounded-full border-2 transition-colors sm:left-[9px] ${
                        item.statusType === "current"
                          ? "pulse-dot border-signal bg-signal"
                          : open
                            ? "border-accent bg-accent"
                            : "border-[#C3CDDC] bg-bg"
                      }`}
                    />
                    <div
                      data-parallax
                      className={`spotlight rounded-2xl border bg-panel transition-colors duration-300 ${
                        open ? "border-accent/50" : "border-line hover:border-[#C3CDDC]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMilestone(item.id)}
                        aria-expanded={open}
                        aria-controls={`tracks-${item.id}`}
                        className="w-full cursor-pointer rounded-2xl p-5 text-left sm:p-7"
                      >
                        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-line">
                              <Image
                                src={item.logo}
                                alt={item.organization}
                                width={48}
                                height={48}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div className="min-w-0 space-y-2">
                              <p className="font-mono text-[11px] text-accent-ink">{item.year}</p>
                              <h3 className="text-xl text-fg sm:text-2xl">{item.role}</h3>
                              <p className="text-sm text-fg/70">
                                {item.organization}
                                <span className="text-muted"> · {item.location}</span>
                              </p>
                              <p className="max-w-3xl pt-1 text-sm leading-relaxed text-muted">{item.achievement}</p>
                              <div className="flex flex-wrap gap-1.5 pt-2">
                                {item.skills.map((skill) => (
                                  <span key={skill} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-muted">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line pt-4 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                            <StatusBadge type={item.statusType} />
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                              {open ? "Hide tracks" : "View tracks"}
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180 text-accent-ink" : ""}`}
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                      </button>

                      {item.tracks && item.tracks.length > 0 && (
                        <div id={`tracks-${item.id}`} className="drawer" data-open={open} inert={!open}>
                          <div>
                            <div className="mx-5 border-t border-line pb-6 pt-6 sm:mx-7">
                              <p className="eyebrow flex items-center gap-2 text-muted">
                                <Layers className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                                Curricular tracks &amp; modules
                              </p>
                              <div
                                className={`mt-4 grid grid-cols-1 gap-4 ${
                                  item.tracks.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
                                }`}
                              >
                                {item.tracks.map((track) => (
                                  <div key={track.title} className="space-y-3 rounded-xl border border-line bg-bg p-5">
                                    <div className="flex items-start justify-between gap-3">
                                      <h4 className="text-base text-fg">{track.title}</h4>
                                      <span className="shrink-0 rounded border border-accent/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-ink">
                                        {track.badge}
                                      </span>
                                    </div>
                                    {track.description && (
                                      <p className="text-xs leading-relaxed text-muted">{track.description}</p>
                                    )}
                                    <ul className="space-y-1.5 border-t border-line pt-3 text-xs text-muted">
                                      {track.modules.map((mod) => (
                                        <li key={mod} className="flex items-start gap-2">
                                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-ink" aria-hidden="true" />
                                          <span>{mod}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section
          id="capabilities"
          aria-labelledby="capabilities-heading"
          className="relative scroll-mt-20 border-t border-line bg-bg-2 px-6 py-28 sm:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              index="04"
              label="Skills"
              titleId="capabilities-heading"
              title={
                <>
                  Technology stack &amp; skills<span className="text-accent-ink">.</span>
                </>
              }
              intro="Technologies, frameworks, and architecture practices I use to build scalable backend systems, microservices, and practical local AI applications."
              aside={
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                  <span>{SKILL_COUNT} skills &amp; tools</span>
                </p>
              }
            />

            <div className="mt-16 grid grid-cols-1 border-t border-line">
              {SKILL_GROUPS.map((group, gi) => (
                <div key={group.label} className="grid grid-cols-1 gap-5 border-b border-line py-8 md:grid-cols-12 md:items-center">
                  <div className="flex items-baseline gap-4 md:col-span-4">
                    <span className="font-mono text-[11px] text-accent-ink">0{gi + 1}</span>
                    <h3 className="text-2xl text-fg sm:text-3xl">{group.label}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2.5 md:col-span-8" aria-label={`${group.label} skills`}>
                    {group.items.map((tech) => (
                      <li
                        key={tech.name}
                        className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel py-1.5 pl-1.5 pr-4 text-sm text-fg transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/60"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg">
                          {tech.svgSrc ? (
                            <Image src={tech.svgSrc} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                          ) : tech.icon ? (
                            <tech.icon className="h-4 w-4" style={{ color: tech.color }} />
                          ) : null}
                        </span>
                        {tech.name}
                        <span className="hidden font-mono text-[9px] uppercase tracking-wider text-muted sm:inline">
                          {tech.category}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative scroll-mt-20 overflow-hidden border-t border-line px-6 py-28 sm:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              index="05"
              label="Contact"
              titleId="contact-heading"
              title={
                <>
                  Let&apos;s build something reliable<span className="text-accent-ink">.</span>
                </>
              }
              intro="Whether you have an inquiry about backend architecture, Spring microservices, or want to discuss an engineering opportunity, my inbox is open."
            />

            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="space-y-12 lg:col-span-5">
                <div>
                  <p className="eyebrow text-muted">Direct email</p>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="group mt-4 flex w-full cursor-pointer items-center justify-between gap-4 border-b border-line pb-5 text-left transition-colors hover:border-accent"
                    aria-label={`Copy email address ${EMAIL}`}
                  >
                    <span className="display min-w-0 break-all text-2xl text-fg transition-colors group-hover:text-accent-ink sm:text-3xl">
                      {EMAIL}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent-ink">
                      {copiedEmail ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
                    </span>
                  </button>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    <span>{copiedEmail ? "Copied" : "Click to copy"}</span>
                    <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1 hover:text-accent-ink">
                      Open in mail
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="eyebrow text-muted">Location &amp; availability</p>
                  <div className="mt-4 flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="display text-xl text-fg">Phnom Penh, Cambodia</p>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">
                          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                          Available
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-muted">UTC+07:00 (Indochina Time)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="eyebrow text-muted">Channels</p>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {CHANNELS.map(({ href, label, handle, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 py-4 transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent-ink" aria-hidden="true" />
                            <span className="display text-xl text-fg transition-transform duration-300 group-hover:translate-x-1">
                              {label}
                            </span>
                          </span>
                          <span className="flex items-center gap-3 font-mono text-[11px] text-muted">
                            <span className="hidden sm:inline">{handle}</span>
                            <span className="text-accent-ink">
                              <SwapArrow />
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-2xl border border-line bg-panel p-6 sm:p-9">
                  <div className="flex items-center justify-between border-b border-line pb-5">
                    <span className="eyebrow text-fg">Send a message</span>
                    <span className="font-mono text-[10px] text-muted">
                      <span className="text-accent-ink">POST</span> /api/contact
                    </span>
                  </div>

                  {/* Honeypot anti-spam field (hidden from assistive devices and UI) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="hp_company"
                      value={formData.hp_company}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div role="status" className="flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 p-4 text-sm text-signal">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>Message sent. Thank you, I will review your inquiry and follow up shortly.</span>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-700">
                      {errorMessage || `Failed to dispatch message. Please email directly at ${EMAIL}.`}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="eyebrow mb-2.5 block text-muted">
                        Your name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-invalid={errors.name}
                        className={inputClass(errors.name)}
                        placeholder="e.g. Alex Morgan"
                      />
                      {errors.name && <span className="mt-1.5 block text-xs text-red-700">Please enter your name.</span>}
                    </div>

                    <div>
                      <label htmlFor="email" className="eyebrow mb-2.5 block text-muted">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-invalid={errors.email}
                        className={inputClass(errors.email)}
                        placeholder="alex@company.com"
                      />
                      {errors.email && <span className="mt-1.5 block text-xs text-red-700">Valid email address required.</span>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="eyebrow mb-2.5 block text-muted">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      aria-invalid={errors.message}
                      className={`${inputClass(errors.message)} resize-none`}
                      placeholder="Tell me about your project, architecture goals, or engineering inquiry..."
                    />
                    {errors.message && (
                      <span className="mt-1.5 block text-xs text-red-700">Please enter your message details.</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-[background-color,box-shadow] duration-300 hover:bg-fg hover:text-bg hover:shadow-[0_0_40px_-8px_rgba(47,91,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 overflow-hidden border-t border-line bg-bg-2">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-muted">Got a backend to build?</p>
              <a href="#contact" className="group mt-3 inline-flex items-center gap-3 text-3xl text-fg transition-colors hover:text-accent-ink sm:text-4xl">
                <span className="display">Get in touch</span>
                <SwapArrow className="h-7 w-7" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {CHANNELS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="/pmengheak.pdf"
                download="pmengheak.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-accent/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-ink transition-colors hover:bg-accent hover:text-white"
              >
                Résumé (PDF)
                <Download className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <p className="wordmark mt-16 select-none whitespace-nowrap uppercase" aria-hidden="true">
            Mengheak
          </p>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-muted sm:flex-row sm:items-center">
            <span>© 2026 Pheng Mengheak · Phnom Penh</span>
            <a href="#overview" className="inline-flex items-center gap-2 transition-colors hover:text-accent-ink">
              Back to top
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      {/* ============ CASE STUDY DIALOG ============ */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-study-title"
          className="modal-backdrop fixed inset-0 z-[65] flex items-center justify-center bg-fg/40 p-4 backdrop-blur-sm sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCaseStudy(null);
          }}
        >
          <div className="modal-panel relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line bg-panel p-6 text-fg sm:p-9">
            <button
              type="button"
              onClick={() => setSelectedCaseStudy(null)}
              aria-label="Close case study"
              autoFocus
              className="absolute right-5 top-5 cursor-pointer rounded-full border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-7">
              <div className="space-y-3 pr-12">
                <p className="eyebrow text-accent-ink">Case study {activeProject.number}</p>
                <h3 id="modal-case-study-title" className="text-3xl text-fg sm:text-4xl">
                  {activeProject.caseStudy.title}
                </h3>
                <p className="font-mono text-xs text-muted">{activeProject.caseStudy.subtitle}</p>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line">
                <Image
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className={activeProject.caseStudy.imageFit}
                />
              </div>

              <div>
                <h4 className="eyebrow text-muted">{activeProject.caseStudy.heading}</h4>
                <ul className="mt-4 space-y-4">
                  {activeProject.caseStudy.points.map((point) => (
                    <li key={point.title} className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                      <span>
                        <strong className="font-medium text-fg">{point.title}:</strong> {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[11px] text-muted">Stack: {activeProject.caseStudy.stack}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="cursor-pointer rounded-full bg-accent px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-fg hover:text-bg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-[65] flex max-w-[calc(100vw-3rem)] items-center gap-3 rounded-xl border border-line bg-panel px-5 py-3.5 font-mono text-[11px] text-fg shadow-2xl transition-[opacity,translate] duration-500 ${
          toastOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
