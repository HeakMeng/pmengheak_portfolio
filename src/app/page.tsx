"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Server,
  Database,
  ArrowRight,
  Send,
  Check,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  X,
  Layout,
  Boxes,
  ShieldCheck,
  Download,
  Play,
  Mail,
  Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
  SiTelegram
} from "react-icons/si";
import { FaJava, FaKey, FaShieldHalved, FaNetworkWired, FaLinkedin } from "react-icons/fa6";
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
  tracks?: MilestoneTrack[];
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "kshrd",
    year: "2026",
    organization: "Korea Software HRD Center",
    logo: "/hrd.png",
    role: "Software Development Trainee (Advanced Spring, Android Kotlin & Local LLM)",
    location: "Phnom Penh, KH",
    locationIcon: "📍",
    status: "CURRENT",
    statusType: "current",
    category: "EXPERIENCE & TRAINING",
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
    year: "2024 – PRESENT",
    organization: "SETEC Institute",
    logo: "/SETTTTTEC.png",
    role: "Bachelor's Degree in MIS (System Analysis Defense, Distributed DB)",
    location: "MIS Dept // Phnom Penh",
    locationIcon: "🏛️",
    status: "DEGREE DEFENSE",
    statusType: "defense",
    category: "EDUCATION",
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
    year: "MAY 2025 – DEC 2025",
    organization: "PROSETH SOLUTIONS CO., LTD.",
    logo: "/prosethsolutions.jpg",
    role: "IT Intern (Database Systems, Server Operations, Infrastructure)",
    location: "Phnom Penh, KH",
    locationIcon: "📍",
    status: "COMPLETED",
    statusType: "completed",
    category: "EXPERIENCE & TRAINING",
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
    year: "2023 – 2025",
    organization: "PUC Institute of Foreign Languages",
    logo: "/images.png",
    role: "Diploma in English Communication",
    location: "Phnom Penh, KH",
    locationIcon: "📍",
    status: "GRADUATED",
    statusType: "graduated",
    category: "EDUCATION",
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

export default function Home() {
  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("Message dispatched successfully!");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Interactive System Case Study Modal State
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<"cortex" | "gamehub" | "snappos" | null>(null);

  // Interactive Milestones Tab & Active Row State
  const [milestoneTab, setMilestoneTab] = useState<"ALL MILESTONES" | "EXPERIENCE & TRAINING" | "EDUCATION">("ALL MILESTONES");
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);

  const toggleMilestone = (id: string) => {
    setActiveMilestoneId((prev) => (prev === id ? null : id));
  };

  const handleTabChange = (tab: "ALL MILESTONES" | "EXPERIENCE & TRAINING" | "EDUCATION") => {
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

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: false, email: false, message: false };

    if (formData.name.trim() === "") {
      newErrors.name = true;
      hasError = true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = true;
      hasError = true;
    }
    if (formData.message.trim() === "") {
      newErrors.message = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setToastMessage("Thank you! Your message has been received.");
      setToastOpen(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setToastOpen(false), 5000);
    }
  };

  // Copy email utility
  const copyEmail = () => {
    navigator.clipboard.writeText("pmengheak168@gmail.com");
    setCopiedEmail(true);
    setToastMessage("Email copied to clipboard: pmengheak168@gmail.com");
    setToastOpen(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setToastOpen(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#FF5722] selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Subtle Ambient Radial Glows */}
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* ======================================================== */}
      {/* TOP NAVIGATION BAR (OSKAR KADERA COBALT EDITORIAL NAV)   */}
      {/* ======================================================== */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10">

        {/* ======================================================== */}
        {/* SECTION 1: HERO SECTION (2-COLUMN EDITORIAL + ISOMETRIC) */}
        {/* ======================================================== */}
        <Hero />


        {/* ======================================================== */}
        {/* SECTION 2: FEATURED PROJECT CARDS (3 VERTICAL CARDS)     */}
        {/* ======================================================== */}
        <section id="systems" className="py-24 px-6 relative border-t border-slate-200/80 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-semibold tracking-wide">
                [ 02 // ARCHITECTURE &amp; SYSTEMS ]
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tight">
                    Featured Systems
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
                    Full-stack web applications, asynchronous bot gateways, and enterprise retail engines designed for resilience and performance.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-500 font-medium">
                  03 PRODUCTION SYSTEMS DEPLOYED
                </span>
              </div>
            </div>

            {/* 3 Prominent Vertical Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* CARD 01: CORTEX */}
              <div id="project-01" className="scroll-mt-24 bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300">
                <div>
                  {/* Card Media Preview with Subtle Diagonal Striping */}
                  <div className="relative aspect-[16/10] bg-diagonal-stripes-light border-b border-slate-200 overflow-hidden">
                    <Image
                      src="/assets/Cortex.png"
                      alt="Cortex Academic Platform"
                      fill
                      className="object-cover object-top opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Top Pill Tag & Numbering */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white text-slate-900 font-mono text-xs font-bold shadow-sm border border-slate-200/60">
                        01
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#FF5722] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        ACADEMIC PLATFORM
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-1">
                        01 / ACADEMIC PLATFORM
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#2563EB] transition-colors">
                        CORTEX
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                        Autonomous Academic Copilot &amp; Learning Platform
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Full-stack educational platform with intuitive knowledge navigation, structured course indexing, and responsive user interfaces.
                    </p>

                    {/* Stack Badges: Java · Spring Boot · PostgreSQL · Docker · Next.js */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Java", "Spring Boot", "PostgreSQL", "Docker", "Next.js"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-wider">
                    EXPLORE CASE STUDY
                  </span>
                  <button
                    onClick={() => setSelectedCaseStudy("cortex")}
                    className="w-11 h-11 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white flex items-center justify-center transition-all group/btn shadow-md hover:shadow-lg shadow-orange-500/25 cursor-pointer"
                    aria-label="Explore Cortex Academic Platform"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* CARD 02: GAMEHUB — VIDEO GAME DISCOVERY & CATALOG */}
              <div id="project-02" className="scroll-mt-24 bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300">
                <div>
                  {/* Card Media Preview with Subtle Diagonal Striping */}
                  <div className="relative aspect-[16/10] bg-diagonal-stripes-light border-b border-slate-200 overflow-hidden">
                    <Image
                      src="/assets/gamehub.png"
                      alt="GameHub — Video Game Discovery & Catalog"
                      fill
                      className="object-cover object-top opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Top Pill Tag & Numbering */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white text-slate-900 font-mono text-xs font-bold shadow-sm border border-slate-200/60">
                        02
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#FF5722] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        FULL-STACK WEB APP
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-1">
                        02 / FULL-STACK WEB APP
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#2563EB] transition-colors">
                        GAMEHUB
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                        Video Game Discovery &amp; Catalog
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Interactive game discovery platform built while mastering React client architecture, powered by a Java Spring Boot REST API for genres, dynamic search, sorting by platform/relevance, and detailed game views.
                    </p>

                    {/* Stack Badges: React · TypeScript · Spring Boot · REST API · Tailwind CSS */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["React", "TypeScript", "Spring Boot", "REST API", "Tailwind CSS"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-wider">
                    EXPLORE CASE STUDY
                  </span>
                  <button
                    onClick={() => setSelectedCaseStudy("gamehub")}
                    className="w-11 h-11 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white flex items-center justify-center transition-all group/btn shadow-md hover:shadow-lg shadow-orange-500/25 cursor-pointer"
                    aria-label="Explore GameHub Case Study"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* CARD 03: ENTERPRISE POS SYSTEM */}
              <div id="project-03" className="scroll-mt-24 bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300">
                <div>
                  {/* Card Media Preview with Subtle Diagonal Striping */}
                  <div className="relative aspect-[16/10] bg-diagonal-stripes-light border-b border-slate-200 overflow-hidden">
                    <Image
                      src="/assets/SnapPOS.png"
                      alt="Enterprise POS System"
                      fill
                      className="object-cover object-top opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Top Pill Tag & Numbering */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white text-slate-900 font-mono text-xs font-bold shadow-sm border border-slate-200/60">
                        03
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#FF5722] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        FULL-STACK APPLICATION
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-1">
                        03 / FULL-STACK APPLICATION
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#2563EB] transition-colors">
                        ENTERPRISE POS SYSTEM
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                        SnapPOS Retail Platform &amp; KHQR Gateway
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Full-stack multi-branch POS platform with real-time stock control, responsive cashier checkout UI, automated KHQR payment integration, and role-based security.
                    </p>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Next.js", "React", "Tailwind CSS", "Spring Boot", "PostgreSQL", "Docker"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-wider">
                    VIEW LIVE PLATFORM
                  </span>
                  <button
                    onClick={() => setSelectedCaseStudy("snappos")}
                    className="w-11 h-11 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white flex items-center justify-center transition-all group/btn shadow-md hover:shadow-lg shadow-orange-500/25 cursor-pointer"
                    aria-label="View Enterprise POS Specs"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ======================================================== */}
        {/* SECTION 3: CAREER & MILESTONES                           */}
        {/* ======================================================== */}
        <section id="milestones" className="py-24 px-6 relative border-t border-slate-200/80 bg-[#F1F5F9]">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-semibold tracking-wide">
                [ 03 // CAREER &amp; MILESTONES ]
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tight">
                    CAREER &amp; MILESTONES
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
                    Engineering journey, professional milestones, and technical training.
                  </p>
                </div>
                <div className="font-mono text-xs text-slate-500 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse"></span>
                  UPDATED 2026 AUDIT
                </div>
              </div>
            </div>

            {/* Interactive Segmented Tab Switcher */}
            <div className="flex justify-center">
              <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-full border border-slate-200/80 mb-10 overflow-x-auto max-w-full shadow-xs">
                {(["ALL MILESTONES", "EXPERIENCE & TRAINING", "EDUCATION"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-5 sm:px-6 py-2 text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      milestoneTab === tab
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/60 font-bold"
                        : "font-semibold text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Framing Container Card with Diagonal Stripes */}
            <div className="relative rounded-3xl border border-slate-200/90 bg-white/50 p-3 sm:p-5 md:p-6 shadow-sm overflow-hidden">
              {/* Architectural 45-degree diagonal pattern background */}
              <div className="absolute inset-0 bg-diagonal-stripes-light opacity-60 pointer-events-none" />

              {/* Milestone Rows */}
              <div className="relative z-10 space-y-3">
                {MILESTONES.filter((item) => {
                  if (milestoneTab === "ALL MILESTONES") return true;
                  return item.category === milestoneTab;
                }).map((item) => {
                  const isElevated = activeMilestoneId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`transition-all duration-300 group/row ${
                        isElevated
                          ? "bg-white rounded-2xl shadow-md sm:shadow-lg border border-slate-200/90 p-4 sm:p-5 ring-1 ring-slate-900/5 my-1"
                          : "bg-white/50 hover:bg-white border border-transparent hover:border-slate-200/80 border-b-slate-200/70 rounded-2xl p-4 sm:p-5 hover:shadow-sm"
                      }`}
                    >
                      {/* Clickable Header Row to toggle open / close */}
                      <div
                        onClick={() => toggleMilestone(item.id)}
                        className="cursor-pointer select-none"
                      >
                        {/* Desktop 5-Column Grid (>= lg) */}
                        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-5 lg:items-center">
                          {/* Col 1: Year tag */}
                          <div className="lg:col-span-2">
                            <span
                              className={`font-mono text-xs sm:text-sm uppercase tracking-wide ${
                                isElevated
                                  ? "font-bold text-[#2563EB]"
                                  : "font-semibold text-slate-500"
                              }`}
                            >
                              {item.year}
                            </span>
                          </div>

                          {/* Col 2: Organization Logo + Name */}
                          <div className="lg:col-span-3 flex items-center gap-3.5 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-xs">
                              <Image
                                src={item.logo}
                                alt={item.organization}
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <h3 className="font-extrabold text-slate-900 text-base tracking-tight leading-snug">
                              {item.organization}
                            </h3>
                          </div>

                          {/* Col 3: Role & Core Responsibilities */}
                          <div className="lg:col-span-3">
                            <p className="text-sm text-slate-600 font-normal leading-relaxed">
                              {item.role}
                            </p>
                          </div>

                          {/* Col 4: Location / Context Tag */}
                          <div className="lg:col-span-2">
                            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-600 font-medium px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 whitespace-nowrap">
                              <span className="text-sm">{item.locationIcon}</span>
                              <span>{item.location}</span>
                            </div>
                          </div>

                          {/* Col 5: Interactive Status Pill or Action Button */}
                          <div className="lg:col-span-2 flex items-center justify-end gap-2.5">
                            {item.statusType === "current" && (
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/90 font-mono text-xs font-bold flex items-center gap-1.5 shadow-xs whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                CURRENT
                              </span>
                            )}
                            {item.statusType === "defense" && (
                              <span className="px-3 py-1 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200/90 font-mono text-xs font-bold uppercase shadow-xs whitespace-nowrap">
                                DEGREE DEFENSE
                              </span>
                            )}
                            {item.statusType === "completed" && (
                              <span className="px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 font-mono text-xs font-medium shadow-xs whitespace-nowrap">
                                COMPLETED
                              </span>
                            )}
                            {item.statusType === "graduated" && (
                              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 font-mono text-xs font-medium shadow-xs whitespace-nowrap">
                                GRADUATED
                              </span>
                            )}

                            {isElevated ? (
                              <div
                                className="w-10 h-10 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white flex items-center justify-center shadow-md shadow-orange-500/25 shrink-0 group-hover/row:scale-105 transition-all"
                                aria-label={`Collapse ${item.organization}`}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </div>
                            ) : (
                              <div
                                className="w-9 h-9 rounded-full bg-slate-100 group-hover/row:bg-slate-200 border border-slate-200 text-slate-500 group-hover/row:text-slate-900 flex items-center justify-center transition-all shrink-0"
                                aria-label={`Expand ${item.organization}`}
                              >
                                <ChevronRight className="w-4 h-4 group-hover/row:translate-x-0.5 transition-transform" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Mobile / Tablet Responsive Layout (< lg) */}
                        <div className="lg:hidden space-y-3">
                          {/* Top Line: Year + Status Pill */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-mono text-xs sm:text-sm uppercase tracking-wide ${
                                isElevated
                                  ? "font-bold text-[#2563EB]"
                                  : "font-semibold text-slate-500"
                              }`}
                            >
                              {item.year}
                            </span>
                            {item.statusType === "current" && (
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold flex items-center gap-1.5 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                CURRENT
                              </span>
                            )}
                            {item.statusType === "defense" && (
                              <span className="px-3 py-1 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200 font-mono text-xs font-bold uppercase shadow-xs">
                                DEGREE DEFENSE
                              </span>
                            )}
                            {item.statusType === "completed" && (
                              <span className="px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 font-mono text-xs font-medium shadow-xs">
                                COMPLETED
                              </span>
                            )}
                            {item.statusType === "graduated" && (
                              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 font-mono text-xs font-medium shadow-xs">
                                GRADUATED
                              </span>
                            )}
                          </div>

                          {/* Brand: Logo Badge + Org Name */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-xs">
                              <Image
                                src={item.logo}
                                alt={item.organization}
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-snug">
                                {item.organization}
                              </h3>
                              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 mt-1">
                                <span>{item.locationIcon}</span>
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom: Role + Circle arrow button */}
                          <div className="flex items-end justify-between gap-4 pt-1">
                            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                              {item.role}
                            </p>
                            {isElevated ? (
                              <div className="w-9 h-9 rounded-full bg-[#FF5722] text-white flex items-center justify-center shadow-md shadow-orange-500/25 shrink-0">
                                <ChevronUp className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                                <ChevronRight className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Interactive Curriculum & Details Drawer */}
                      {isElevated && item.tracks && item.tracks.length > 0 && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-5 pt-5 border-t border-slate-200/80 space-y-4"
                        >
                          <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-[#FF5722]" />
                            <span>Curricular Tracks &amp; Specialization Modules</span>
                          </div>
                          <div
                            className={`grid grid-cols-1 ${
                              item.tracks.length >= 3
                                ? "md:grid-cols-2 lg:grid-cols-3"
                                : "md:grid-cols-2"
                            } gap-4`}
                          >
                            {item.tracks.map((track, idx) => (
                              <div
                                key={idx}
                                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3.5 hover:bg-white hover:shadow-xs transition-all"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                                    {track.title}
                                  </h5>
                                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 uppercase tracking-wider shrink-0">
                                    {track.badge}
                                  </span>
                                </div>
                                {track.description && (
                                  <p className="text-xs text-slate-500 leading-relaxed">
                                    {track.description}
                                  </p>
                                )}
                                <ul className="space-y-2 pt-2 border-t border-slate-200/70">
                                  {track.modules.map((m, mIdx) => (
                                    <li
                                      key={mIdx}
                                      className="text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] shrink-0 mt-1.5"></span>
                                      <span className="font-medium">{m}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Subtle Collapse button at bottom for easy closing */}
                          <div className="flex justify-end pt-2">
                            <button
                              type="button"
                              onClick={() => toggleMilestone(item.id)}
                              className="text-xs font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <ChevronUp className="w-3.5 h-3.5 text-[#FF5722]" />
                              <span>Collapse details</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>


        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* SECTION 4: ENGINEERING SKILLS & TECH STACK (TAXONOMY)   */}
        {/* ======================================================== */}
        <section id="capabilities" className="py-24 px-6 relative border-t border-slate-200/80 bg-white">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-semibold tracking-wide">
                [ 04 // TECHNICAL TAXONOMY ]
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
                ENGINEERING SKILLS & TECH STACK
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal">
                Core technical proficiencies structured across backend microservices, database systems, and infrastructure.
              </p>
            </div>

            {/* High-Density Tech Taxonomy Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Layer 01: Core Backend & API Engineering (Spans 2 Cols) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between space-y-5 shadow-xs md:col-span-2 lg:col-span-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 flex items-center justify-center font-bold shadow-2xs group-hover:bg-blue-50 group-hover:text-[#2563EB] group-hover:border-blue-200 transition-all">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      LAYER 01 // RUNTIME &amp; ARCHITECTURE
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      Backend &amp; API Engineering
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Clean service layer architecture, enterprise microservices, and high-concurrency RESTful APIs.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {[
                    { name: "Java", icon: FaJava, color: "text-[#E11D48]" },
                    { name: "Spring Boot", icon: SiSpringboot, color: "text-[#6DB33F]" },
                    { name: "FastAPI", icon: SiFastapi, color: "text-[#009688]" },
                    { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
                    { name: "REST APIs", icon: TbApi, color: "text-[#2563EB]" },
                    { name: "Microservices", icon: FaNetworkWired, color: "text-[#6366F1]" }
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-white border border-slate-200/80 text-xs font-mono font-medium text-slate-700 hover:text-slate-900 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-default group/badge"
                    >
                      <tech.icon className={`w-3.5 h-3.5 shrink-0 ${tech.color} group-hover/badge:scale-110 transition-transform`} />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 02: Database Systems */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 flex items-center justify-center font-bold shadow-2xs group-hover:bg-blue-50 group-hover:text-[#2563EB] group-hover:border-blue-200 transition-all">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      LAYER 02 // PERSISTENCE
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      Database Systems
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Relational data modeling, ACID transactions, and optimized schema design.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {[
                    { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
                    { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
                    { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" }
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-white border border-slate-200/80 text-xs font-mono font-medium text-slate-700 hover:text-slate-900 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-default group/badge"
                    >
                      <tech.icon className={`w-3.5 h-3.5 shrink-0 ${tech.color} group-hover/badge:scale-110 transition-transform`} />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 03: DevOps & Infrastructure */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 flex items-center justify-center font-bold shadow-2xs group-hover:bg-blue-50 group-hover:text-[#2563EB] group-hover:border-blue-200 transition-all">
                      <Boxes className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      LAYER 03 // INFRASTRUCTURE
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      DevOps &amp; Infrastructure
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Containerization, Linux system administration, and web server configuration.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {[
                    { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
                    { name: "Linux", icon: SiLinux, color: "text-[#FCC624]" },
                    { name: "Nginx", icon: SiNginx, color: "text-[#009639]" },
                    { name: "Git", icon: SiGit, color: "text-[#F05032]" }
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-white border border-slate-200/80 text-xs font-mono font-medium text-slate-700 hover:text-slate-900 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-default group/badge"
                    >
                      <tech.icon className={`w-3.5 h-3.5 shrink-0 ${tech.color} group-hover/badge:scale-110 transition-transform`} />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 04: Security & Authentication */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 flex items-center justify-center font-bold shadow-2xs group-hover:bg-blue-50 group-hover:text-[#2563EB] group-hover:border-blue-200 transition-all">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      LAYER 04 // SECURITY &amp; AUTH
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      Security &amp; Authentication
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Distributed access control, identity flows, and token-based authorization.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {[
                    { name: "OAuth 2.0", icon: FaKey, color: "text-[#3B82F6]" },
                    { name: "JWT", icon: SiJsonwebtokens, color: "text-[#D63AFF]" },
                    { name: "Keycloak", icon: SiKeycloak, color: "text-[#008A87]" },
                    { name: "Spring Security", icon: SiSpringsecurity, color: "text-[#6DB33F]" },
                    { name: "RBAC", icon: FaShieldHalved, color: "text-[#8B5CF6]" }
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-white border border-slate-200/80 text-xs font-mono font-medium text-slate-700 hover:text-slate-900 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-default group/badge"
                    >
                      <tech.icon className={`w-3.5 h-3.5 shrink-0 ${tech.color} group-hover/badge:scale-110 transition-transform`} />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 05: Frontend Development */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200/80 text-slate-700 flex items-center justify-center font-bold shadow-2xs group-hover:bg-blue-50 group-hover:text-[#2563EB] group-hover:border-blue-200 transition-all">
                      <Layout className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      LAYER 05 // CLIENT INTERFACE
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      Frontend Development
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Modern, type-safe, responsive client interfaces and reactive state.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {[
                    { name: "Next.js", icon: SiNextdotjs, color: "text-slate-900" },
                    { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
                    { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
                    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" }
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-white border border-slate-200/80 text-xs font-mono font-medium text-slate-700 hover:text-slate-900 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-default group/badge"
                    >
                      <tech.icon className={`w-3.5 h-3.5 shrink-0 ${tech.color} group-hover/badge:scale-110 transition-transform`} />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ==========================        {/* ======================================================== */}
        {/* SECTION 5: ARCHITECTURAL CONTACT DISPATCH TERMINAL      */}
        {/* ======================================================== */}
        <section id="contact" className="py-24 px-6 relative border-t border-slate-200/80 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-semibold tracking-wide">
                [ 05 // GET IN TOUCH ]
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Let&apos;s Build Something Reliable.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                Whether you have an inquiry about backend architecture, Spring microservices, or want to discuss an engineering opportunity, my inbox is open.
              </p>
            </div>

            {/* Architectural Framing Container Card with Diagonal Pattern */}
            <div className="relative rounded-3xl border border-slate-200/90 bg-white/50 p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              {/* Architectural 45-degree diagonal pattern background */}
              <div className="absolute inset-0 bg-diagonal-stripes-light opacity-40 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Direct Communication Channels */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        DIRECT CHANNELS
                      </span>
                      <span className="font-mono text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        AVAILABLE
                      </span>
                    </div>

                    {/* Direct Email Row (Interactive copy-to-clipboard row) */}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                        Direct Email
                      </span>
                      <div
                        onClick={copyEmail}
                        className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group/email"
                        title="Click to copy email address"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 group-hover/email:text-blue-600 group-hover/email:border-blue-200 shadow-2xs shrink-0 transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900 group-hover/email:text-blue-600 transition-colors truncate">
                              pmengheak168@gmail.com
                            </p>
                            <p className="text-xs text-slate-500">
                              Click to copy to clipboard
                            </p>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-slate-200/90 text-slate-600 group-hover/email:text-blue-600 group-hover/email:border-blue-200 shadow-2xs shrink-0 transition-colors">
                          {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Subtle Divider */}
                    <div className="h-px bg-slate-100" />

                    {/* Location Row */}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                        Location &amp; Availability
                      </span>
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 shadow-2xs shrink-0 mt-0.5">
                          <span className="text-base leading-none">📍</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-900">
                              Phnom Penh, Cambodia
                            </p>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono">
                            Timezone: UTC+07:00 (Indochina Time)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Divider */}
                    <div className="h-px bg-slate-100" />

                    {/* Social Channels Badges */}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5 block">
                        Verified Channels
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {/* GitHub */}
                        <a
                          href="https://github.com/HeakMeng"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50/90 hover:bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-2xs hover:shadow-xs hover:scale-105 transition-all cursor-pointer group/soc"
                        >
                          <SiGithub className="w-4 h-4 text-slate-800 group-hover/soc:scale-110 transition-transform shrink-0" />
                          <span>GitHub</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/in/pheng-mengheak-598442354/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-200 text-xs font-semibold text-slate-700 hover:text-[#0A66C2] shadow-2xs hover:shadow-xs hover:scale-105 transition-all cursor-pointer group/soc"
                        >
                          <FaLinkedin className="w-4 h-4 text-[#0A66C2] group-hover/soc:scale-110 transition-transform shrink-0" />
                          <span>LinkedIn</span>
                        </a>

                        {/* Telegram */}
                        <a
                          href="https://t.me/pmengheak"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sky-200 text-xs font-semibold text-slate-700 hover:text-[#26A5E4] shadow-2xs hover:shadow-xs hover:scale-105 transition-all cursor-pointer group/soc"
                        >
                          <SiTelegram className="w-4 h-4 text-[#26A5E4] group-hover/soc:scale-110 transition-transform shrink-0" />
                          <span>@pmengheak</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right Column: Dispatch Console Form */}
                <div className="lg:col-span-7">
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
                  >
                    {/* Console Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                        DISPATCH CONSOLE
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        DIRECT INBOX ROUTING
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Your Name */}
                      <div>
                        <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2 block">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm ${
                            errors.name ? "border-red-400" : "border-slate-200"
                          }`}
                          placeholder="e.g. Alex Morgan"
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1 block">Please enter your name.</span>}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm ${
                            errors.email ? "border-red-400" : "border-slate-200"
                          }`}
                          placeholder="alex@company.com"
                        />
                        {errors.email && <span className="text-xs text-red-500 mt-1 block">Valid email address required.</span>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2 block">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none ${
                          errors.message ? "border-red-400" : "border-slate-200"
                        }`}
                        placeholder="Tell me about your project, architecture goals, or engineering inquiry..."
                      ></textarea>
                      {errors.message && <span className="text-xs text-red-500 mt-1 block">Please enter your message details.</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer group/btn"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      <span>Dispatch Message</span>
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 relative z-10 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <a href="#overview" className="flex items-center gap-3">
            <span className="w-7 h-7 rounded border border-slate-300 bg-slate-50 flex items-center justify-center font-bold text-xs text-slate-900 shadow-sm">
              PM
            </span>
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">
              PHENG MENGHEAK
            </span>
            <span className="font-mono text-xs text-slate-500">
              {"// PORTFOLIO 2026"}
            </span>
          </a>

          {/* Social Channels & Direct Resume Button */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/HeakMeng"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#FF5722] border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/pheng-mengheak-598442354/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#FF5722] border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <a
              href="https://t.me/pmengheak"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#FF5722] border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              aria-label="Telegram (@pmengheak)"
            >
              <Send className="w-4 h-4" />
            </a>

            <a
              href="/pmengheak.pdf"
              download="pmengheak.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-mono text-xs font-bold transition-all shadow-md"
            >
              <span>RESUME.PDF</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          <a
            href="#overview"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </a>
        </div>
      </footer>

      {/* Interactive Case Study Modal Popups */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content - CORTEX */}
            {selectedCaseStudy === "cortex" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200 font-mono text-[10px] font-bold uppercase">
                    SYSTEM CASE STUDY 01
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                    Cortex Academic Platform
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-mono">
                    Autonomous Academic Copilot &amp; Learning Platform
                  </p>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-diagonal-stripes-light">
                  <Image
                    src="/assets/Cortex.png"
                    alt="Cortex Interface"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                    Architectural Highlights
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Structured Knowledge Navigation:</strong> Full-stack educational platform with intuitive curriculum indexing, course material search, and responsive user interfaces.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Robust Java Spring Boot Backend:</strong> Enterprise RESTful service architecture backed by PostgreSQL database persistence, connection pooling, and Docker deployment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Interactive Client Interface:</strong> Next.js frontend with fast static routing, type-safe data validation, and clean study group workflows.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">Stack: Java, Spring Boot, PostgreSQL, Docker, Next.js</span>
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-mono text-xs font-bold cursor-pointer shadow-md"
                  >
                    CLOSE SPECS
                  </button>
                </div>
              </div>
            )}

            {/* Modal Content - GAMEHUB */}
            {selectedCaseStudy === "gamehub" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 font-mono text-[10px] font-bold uppercase">
                    SYSTEM CASE STUDY 02
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                    GameHub — Video Game Discovery &amp; Catalog
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-mono">
                    Full-Stack Web App · React &amp; Spring Boot Architecture
                  </p>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-diagonal-stripes-light">
                  <Image
                    src="/assets/gamehub.png"
                    alt="GameHub Interface"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                    Key Features &amp; Architectural Highlights
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Dynamic Filtering &amp; Multi-Platform Sorting:</strong> Real-time genre filtering and multi-platform query sorting by relevance, release date, and Metacritic rating scores.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Decoupled Full-Stack Architecture:</strong> Clean client-server separation consuming custom Java Spring Boot REST backend endpoints for genres, catalog search, and game details.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Interactive Responsive Client:</strong> Modern game card grid featuring Metacritic score badges, system/platform icons, instant dark mode toggle, and detail routing.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">Stack: React, TypeScript, Spring Boot, REST API, Tailwind CSS</span>
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-mono text-xs font-bold cursor-pointer shadow-md"
                  >
                    CLOSE SPECS
                  </button>
                </div>
              </div>
            )}

            {/* Modal Content - SNAPPOS */}
            {selectedCaseStudy === "snappos" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-mono text-[10px] font-bold uppercase">
                    SYSTEM CASE STUDY 03
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                    SnapPOS Enterprise Full-Stack POS Platform
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-mono">
                    Full-Stack Retail Platform &amp; Real-Time Checkout UI
                  </p>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-diagonal-stripes-light">
                  <Image
                    src="/assets/SnapPOS.png"
                    alt="SnapPOS Interface"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                    Architecture Highlights
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Next.js &amp; React Frontend:</strong> Modern, high-speed cashier terminal interface with live catalog search, dynamic shopping cart, discount calculators, and Tailwind CSS responsive styling.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Spring Boot Engine:</strong> Layered MVC backend architecture with decoupled Service, Repository, and JWT/role-based security token filters.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">PostgreSQL Concurrency:</strong> Strict ACID transactions for multi-branch inventory deductions with pessimistic locking on high-velocity stock items.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Automated KHQR Integrations:</strong> Dynamic Bakong/KHQR QR payload generation with real-time payment webhook verification for cashier checkouts.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">Stack: Next.js, React, Tailwind CSS, Spring Boot, PostgreSQL, Docker</span>
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-mono text-xs font-bold cursor-pointer shadow-md"
                  >
                    CLOSE SPECS
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Status / Action Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 bg-white border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3 transition-all duration-300 transform font-mono text-xs ${
          toastOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722] animate-ping"></span>
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}
