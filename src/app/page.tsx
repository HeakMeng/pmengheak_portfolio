"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Server,
  Cpu,
  Database,
  ArrowRight,
  ArrowUpRight,
  Send,
  Check,
  Copy,
  ChevronUp,
  X,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layout,
  Boxes,
  ShieldCheck,
  Download,
  Play
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("Message dispatched successfully!");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Interactive System Case Study Modal State
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<"cortex" | "gamehub" | "snappos" | null>(null);

  // Interactive Milestones Tab State
  const [milestoneTab, setMilestoneTab] = useState<"EXPERIENCE & TRAINING" | "EDUCATION" | "ALL MILESTONES">("EXPERIENCE & TRAINING");

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
              <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300">
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
              <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300">
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
              <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300">
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
                        HIGH-THROUGHPUT BACKEND
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-1">
                        03 / HIGH-THROUGHPUT BACKEND
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#2563EB] transition-colors">
                        ENTERPRISE POS SYSTEM
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                        SnapPOS Retail Engine &amp; KHQR Gateway
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Multi-branch POS engine supporting real-time stock control, automated KHQR payment integrations, and role-based access tokens.
                    </p>

                    {/* Stack Badges: Java · Spring Boot · PostgreSQL · Docker */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Java", "Spring Boot", "PostgreSQL", "Docker"].map((tech) => (
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
        {/* SECTION 3: ENGINEERING MILESTONES (CONFERENCES & EVENTS) */}
        {/* ======================================================== */}
        <section id="milestones" className="py-24 px-6 relative border-t border-slate-200/80 bg-[#F1F5F9]">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-semibold tracking-wide">
                [ 03 // CAREER PATH &amp; EVENTS ]
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tight">
                    Conferences &amp; Events
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
                    Engineering milestones, academic research defense, and high-concurrency enterprise training trajectory.
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
              <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-full border border-slate-200/80 mb-10 overflow-x-auto max-w-full">
                {(["EXPERIENCE & TRAINING", "EDUCATION", "ALL MILESTONES"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setMilestoneTab(tab)}
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

            {/* Horizontal Data Table (Oskar Kadera Layout) */}
            <div className="divide-y divide-slate-200 border-y border-slate-200 transition-opacity duration-300">
              
              {/* ROW 1: Korea Software HRD Center (Shown in 'EXPERIENCE & TRAINING' and 'ALL MILESTONES') */}
              {(milestoneTab === "EXPERIENCE & TRAINING" || milestoneTab === "ALL MILESTONES") && (
                <div className="py-7 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center hover:bg-white/60 transition-colors rounded-xl">
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm font-bold text-[#2563EB] tracking-wider">
                      2026
                    </span>
                  </div>
                  
                  <div className="md:col-span-4">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                      Korea Software HRD Center
                    </h3>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-xs sm:text-sm text-slate-600 font-normal">
                      Software Development Trainee (Advanced Java, Spring Boot, Microservices)
                    </p>
                  </div>

                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-700 font-mono text-xs font-semibold border border-slate-200 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      CURRENT
                    </span>
                  </div>
                </div>
              )}

              {/* ROW 2: ACTIVE HIGHLIGHTED WHITE ROW (SETEC Institute - Shown in 'EDUCATION' and 'ALL MILESTONES') */}
              {(milestoneTab === "EDUCATION" || milestoneTab === "ALL MILESTONES") && (
                <div className="my-2 p-6 sm:p-8 bg-white text-slate-900 rounded-3xl shadow-lg border border-slate-200/90 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center transform hover:scale-[1.01] transition-all">
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm sm:text-base font-black text-[#FF5722] tracking-wider">
                      2024 - 2026
                    </span>
                  </div>
                  
                  <div className="md:col-span-4">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                      SETEC Institute
                    </h3>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      MIS Department // KH
                    </span>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      Bachelor&apos;s Degree in MIS (System Analysis Defense, Distributed DB)
                    </p>
                  </div>

                  <div className="md:col-span-2 flex justify-start md:justify-end items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#FF5722] text-white font-mono text-xs font-bold uppercase shadow-sm">
                      DEGREE DEFENSE
                    </span>
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}

              {/* ROW 3: PROSETH SOLUTIONS CO., LTD. (Shown in 'EXPERIENCE & TRAINING' and 'ALL MILESTONES') */}
              {(milestoneTab === "EXPERIENCE & TRAINING" || milestoneTab === "ALL MILESTONES") && (
                <div className="py-7 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center hover:bg-white/60 transition-colors rounded-xl">
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm font-bold text-[#2563EB] tracking-wider">
                      2025
                    </span>
                  </div>
                  
                  <div className="md:col-span-4">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                      PROSETH SOLUTIONS CO., LTD.
                    </h3>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-xs sm:text-sm text-slate-600 font-normal">
                      IT Intern (Database Systems, Server Operations, Infrastructure)
                    </p>
                  </div>

                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-700 font-mono text-xs font-medium border border-slate-200 shadow-xs">
                      COMPLETED
                    </span>
                  </div>
                </div>
              )}

              {/* ROW 4: PUC Institute of Foreign Languages (Shown in 'EDUCATION' and 'ALL MILESTONES') */}
              {(milestoneTab === "EDUCATION" || milestoneTab === "ALL MILESTONES") && (
                <div className="py-7 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center hover:bg-white/60 transition-colors rounded-xl">
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm font-bold text-[#2563EB] tracking-wider">
                      2022 - 2025
                    </span>
                  </div>
                  
                  <div className="md:col-span-4">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                      PUC Institute of Foreign Languages
                    </h3>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-xs sm:text-sm text-slate-600 font-normal">
                      Diploma in English Communication
                    </p>
                  </div>

                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    <span className="px-3.5 py-1 rounded-full bg-white text-slate-700 font-mono text-xs font-medium border border-slate-200 shadow-xs">
                      GRADUATED
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>
        </section>


        {/* ======================================================== */}
        {/* SECTION 4: ENGINEERING SKILLS & TECH STACK (6-CARD BENTO)*/}
        {/* ======================================================== */}
        <section id="capabilities" className="py-24 px-6 relative border-t border-slate-200/80 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-xs font-semibold tracking-wide">
                [ 04 // TECHNICAL TAXONOMY ]
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
                ENGINEERING SKILLS & TECH STACK
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal">
                Core technical proficiencies across backend microservices, REST APIs, and scalable infrastructure.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 01: Backend & API Engineering (Consolidated, Spans 2 Cols) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between space-y-5 shadow-xs md:col-span-2 lg:col-span-2">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                    <Server className="w-5 h-5" />
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

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {["Java", "Spring Boot", "FastAPI", "Python", "PostgreSQL", "REST APIs", "Microservices"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 text-slate-800 border border-slate-200 group-hover:border-blue-200 text-xs font-mono font-medium px-2.5 py-1 rounded-md transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 02: Database Systems */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      Database Systems
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Relational data modeling, ACID transactions, and optimized storage engines.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {["PostgreSQL", "MySQL", "Redis", "MongoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 text-slate-800 border border-slate-200 group-hover:border-blue-200 text-xs font-mono font-medium px-2.5 py-1 rounded-md transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 03: DevOps & Infrastructure */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      DevOps &amp; Infrastructure
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Containerization, continuous integration, and server configuration.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {["Docker", "Linux", "Nginx", "Jenkins", "Git"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 text-slate-800 border border-slate-200 group-hover:border-blue-200 text-xs font-mono font-medium px-2.5 py-1 rounded-md transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 04: Security & Authentication */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
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

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {["OAuth 2.0", "JWT", "Keycloak", "Spring Security", "RBAC"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 text-slate-800 border border-slate-200 group-hover:border-blue-200 text-xs font-mono font-medium px-2.5 py-1 rounded-md transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 05: Frontend Development */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                      Frontend Development
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Modern, type-safe, responsive client interfaces.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 text-slate-800 border border-slate-200 group-hover:border-blue-200 text-xs font-mono font-medium px-2.5 py-1 rounded-md transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ======================================================== */}
        {/* SECTION 5: HIGH-CONTRAST CONTACT TERMINAL / FORM         */}
        {/* ======================================================== */}
        <section id="contact" className="py-24 px-6 relative border-t border-slate-200/80 bg-[#F1F5F9]">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2563EB] font-mono text-xs font-bold tracking-wide shadow-sm">
                [ 05 // DIRECT COMMUNICATIONS ]
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
                Get in Touch
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl font-normal">
                Initiate a technical conversation regarding backend microservices, database optimizations, or scalable distributed systems.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Direct Links & Coordinates */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Email Direct Box */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-mono text-[10px] text-[#2563EB] uppercase tracking-wider block font-bold">
                    Direct Electronic Mail
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href="mailto:pmengheak168@gmail.com"
                      className="font-mono text-sm text-slate-900 font-bold hover:text-[#2563EB] transition-colors truncate"
                    >
                      pmengheak168@gmail.com
                    </a>
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Response time usually under 24 business hours.
                  </p>
                </div>

                {/* Location Box */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-mono text-[10px] text-[#2563EB] uppercase tracking-wider block font-bold">
                    Station Coordinates
                  </span>
                  <p className="font-bold text-slate-900 text-base">
                    Phnom Penh, Cambodia
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Timezone: UTC+07:00 (Indochina Time)
                  </p>
                </div>

                {/* Social Quick Links */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-mono text-[10px] text-[#2563EB] uppercase tracking-wider block font-bold">
                    Verified Channels
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {/* GitHub */}
                    <a
                      href="https://github.com/HeakMeng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#FF5722] hover:bg-white text-slate-700 hover:text-slate-900 transition-all group cursor-pointer shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current mb-1 text-slate-800 group-hover:text-[#FF5722] transition-colors" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="font-mono text-[10px] font-bold">GitHub</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/pheng-mengheak-598442354/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#FF5722] hover:bg-white text-slate-700 hover:text-slate-900 transition-all group cursor-pointer shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current mb-1 text-slate-800 group-hover:text-[#FF5722] transition-colors" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="font-mono text-[10px] font-bold">LinkedIn</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/pmengheak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#FF5722] hover:bg-white text-slate-700 hover:text-slate-900 transition-all group cursor-pointer shadow-sm"
                      aria-label="Telegram @pmengheak"
                    >
                      <Send className="w-5 h-5 mb-1 text-slate-800 group-hover:text-[#FF5722] transition-colors" />
                      <span className="font-mono text-[10px] font-bold">@pmengheak</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                        [ 01 // YOUR NAME ]
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/10 font-mono transition-all ${
                          errors.name ? "border-red-400" : "border-slate-200"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-red-500 font-mono">Please specify your name.</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                        [ 02 // EMAIL ADDRESS ]
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/10 font-mono transition-all ${
                          errors.email ? "border-red-400" : "border-slate-200"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-xs text-red-500 font-mono">Valid email address required.</span>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      [ 03 // TECHNICAL INQUIRY OR MESSAGE ]
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/10 font-mono transition-all resize-none ${
                        errors.message ? "border-red-400" : "border-slate-200"
                      }`}
                      placeholder="Discussing microservices architecture, FastAPI pipelines, or role availability..."
                    ></textarea>
                    {errors.message && <span className="text-xs text-red-500 font-mono">Please provide message details.</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-[#FF5722] hover:bg-[#FF6B2C] transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    DISPATCH TRANSMISSION
                    <Send className="w-4 h-4" />
                  </button>
                </form>
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
              // PORTFOLIO 2026
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
              href="/resume.pdf"
              download
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
                    SnapPOS Enterprise Retail Backend
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-mono">
                    High-Throughput Retail POS Engine
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
                      <span><strong className="text-slate-900">Spring Boot Engine:</strong> Layered MVC architecture with decoupled Service, Repository, and Security token filters.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">PostgreSQL Concurrency:</strong> Strict ACID transactions for inventory deductions with pessimistic locking on hot stock items.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span><strong className="text-slate-900">Automated KHQR Integrations:</strong> Dynamic Bakong/KHQR payload generator with webhook verification for cashier checkouts.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">Stack: Spring Boot, Java, PostgreSQL, Docker</span>
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
