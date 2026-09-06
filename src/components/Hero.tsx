"use client";

import React, { useRef, useState, useCallback } from "react";
import { Play, ArrowRight, ArrowUpRight, Send } from "lucide-react";

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // Subtle cursor-based tilt: rotateX ±2°, rotateY ±2.5°
    const rotateX = Math.max(-2, Math.min(2, -normY * 2));
    const rotateY = Math.max(-2.5, Math.min(2.5, normX * 2.5));

    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#F8FAFC] text-slate-900 pt-20 sm:pt-24 pb-10 px-6 flex flex-col justify-between overflow-hidden"
    >
      <div id="overview" className="absolute top-0 left-0 pointer-events-none"></div>

      {/* Main 2-Column Editorial Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto z-10 py-4 sm:py-6">
        
        {/* Left Column (Text & Positioning - lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Category Pre-title: BACKEND DEVELOPER */}
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#2563EB] uppercase">
            BACKEND DEVELOPER
          </div>

          {/* Clean Solid Dark Navy Headline: PHENG MENGHEAK (Space Grotesk) */}
          <h1 className="hero-name font-bold my-5 select-none uppercase text-left">
            PHENG <br />
            MENGHEAK
          </h1>

          {/* Strengthened Role Statement with widened max-width to avoid awkward wrapping */}
          <p className="text-slate-600 max-w-[540px] text-sm sm:text-[15px] font-normal leading-relaxed">
            Backend Engineer specializing in Java, Spring Boot microservices, high-performance APIs, and scalable distributed systems.
          </p>

          {/* Action CTAs: Primary [ VIEW PROJECTS ] + Secondary [ Download Résumé ] + Telegram [@pmengheak] */}
          <div className="pt-2 flex flex-wrap items-center gap-5">
            <a
              href="#systems"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-bold text-xs tracking-wider uppercase shadow-[0_10px_24px_rgba(255,92,38,0.25)] hover:shadow-[0_12px_28px_rgba(255,92,38,0.35)] transition-all group cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-white text-[#FF5722] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </span>
              <span>VIEW PROJECTS</span>
            </a>

            <a
              href="/pmengheak.pdf"
              download="pmengheak.pdf"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#2563EB] tracking-wide transition-colors group cursor-pointer py-2"
            >
              <span>Download Résumé</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://t.me/pmengheak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#2563EB] tracking-wide transition-colors group cursor-pointer py-2"
              aria-label="Telegram @pmengheak"
            >
              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>@pmengheak</span>
            </a>
          </div>

        </div>

        {/* Right Column (Visual Anchor - lg:col-span-6 with visible negative space >= 64px) */}
        <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end relative lg:pl-10">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl animate-hero-entrance">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="border border-slate-200/90 rounded-3xl overflow-visible relative p-8 cursor-default flex items-center justify-center bg-white"
              style={{
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 30px 70px rgba(15, 35, 70, 0.10), 0 8px 24px rgba(15, 35, 70, 0.06)",
                transform: `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 250ms ease, box-shadow 250ms ease",
              }}
            >
              {/* Subtle Ambient Grounding Shadow underneath */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-slate-900/10 rounded-full blur-xl pointer-events-none -z-10"
                style={{ transform: "translateZ(-10px)" }}
              ></div>

              {/* 3D Illustration with breathing room & translateZ */}
              <img 
                src="/images/heak-isometric.png?v=2" 
                alt="HEAK 3D Setup" 
                className="heak-artwork w-full h-auto object-contain select-none drop-shadow-2xl scale-[0.96] mx-auto relative z-10 hover:scale-[0.98] transition-transform duration-300"
                style={{ transform: "translateZ(30px)" }}
              />

              {/* Badge 1 (Top Left): Spring Boot */}
              <div
                className="absolute -top-2.5 -left-2 sm:-top-4 sm:-left-4 z-20 flex"
                style={{ transform: "translateZ(35px)" }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-full text-[11px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap select-none hover:scale-105 hover:border-blue-400 transition-all cursor-pointer">
                  <img src="/images/spring.svg" alt="Spring Boot" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
                  <span>Spring Boot</span>
                </div>
              </div>

              {/* Badge 2 (Top Right): FastAPI */}
              <div
                className="absolute -top-2.5 -right-2 sm:-top-4 sm:-right-4 z-20 flex"
                style={{ transform: "translateZ(35px)" }}
              >
                <div className="flex items-center gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-full text-[11px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap select-none hover:scale-105 hover:border-blue-400 transition-all cursor-pointer">
                  <img src="/images/fastapi.svg" alt="FastAPI" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
                  <span>FastAPI</span>
                </div>
              </div>

              {/* Badge 3 (Bottom Left): Docker & Linux */}
              <div
                className="absolute -bottom-2.5 -left-2 sm:-bottom-4 sm:-left-4 z-20 flex"
                style={{ transform: "translateZ(35px)" }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-full text-[11px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap select-none hover:scale-105 hover:border-blue-400 transition-all cursor-pointer">
                  <img src="/images/docker.svg" alt="Docker & Linux" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
                  <span>Docker &amp; Linux</span>
                </div>
              </div>

              {/* Badge 4 (Bottom Right): Next.js */}
              <div
                className="absolute -bottom-2.5 -right-2 sm:-bottom-4 sm:-right-4 z-20 flex"
                style={{ transform: "translateZ(35px)" }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-full text-[11px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap select-none hover:scale-105 hover:border-blue-400 transition-all cursor-pointer">
                  <img src="/images/nextjs.svg" alt="Next.js" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
                  <span>Next.js</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Project Teaser Cards (Enhanced Contrast & Category Labels) */}
      <div className="max-w-7xl mx-auto w-full z-10 pt-2 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 01 Teaser */}
          <a
            href="#project-01"
            className="group block p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200/60 uppercase tracking-wider">
                ACADEMIC SYSTEM
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h3 className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase group-hover:text-[#2563EB] transition-colors">
              01 / CORTEX PLATFORM
            </h3>
            <p className="text-[12px] text-slate-500 mt-1 truncate font-medium">
              Interactive Learning &amp; Course Management System
            </p>
          </a>

          {/* Card 02 Teaser */}
          <a
            href="#project-02"
            className="group block p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200/60 uppercase tracking-wider">
                REACT &amp; SPRING
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h3 className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase group-hover:text-[#2563EB] transition-colors">
              02 / GAMEHUB
            </h3>
            <p className="text-[12px] text-slate-500 mt-1 truncate font-medium">
              Video Game Discovery Engine &amp; REST API Catalog
            </p>
          </a>

          {/* Card 03 Teaser */}
          <a
            href="#project-03"
            className="group block p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200/60 uppercase tracking-wider">
                FULL-STACK APP
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <h3 className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase group-hover:text-[#2563EB] transition-colors">
              03 / SNAPPOS RETAIL ENGINE
            </h3>
            <p className="text-[12px] text-slate-500 mt-1 truncate font-medium">
              Full-Stack POS Platform &amp; Bakong KHQR Gateway
            </p>
          </a>

        </div>
      </div>

    </section>
  );
}
