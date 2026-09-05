"use client";

import React, { useState } from "react";
import { Menu, X, Send } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Brand Logo: .. [ PM ] PHENG MENGHEAK */}
        <a href="#hero" className="flex items-center gap-2.5 group select-none">
          <span className="text-slate-400 text-xs font-mono tracking-tighter">··</span>
          <div className="w-7 h-7 border border-slate-900 flex items-center justify-center text-[11px] font-bold text-slate-900 tracking-tight">
            PM
          </div>
          <span className="font-bold text-xs tracking-widest text-slate-900 uppercase ml-1">
            PHENG MENGHEAK
          </span>
        </a>

        {/* Center Navigation Links: PROJECTS, ABOUT, SKILLS, CONTACT */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-slate-600">
          <a
            href="#systems"
            className="hover:text-slate-900 transition-colors py-1 hover:border-b-2 hover:border-slate-900"
          >
            PROJECTS
          </a>
          <a
            href="#milestones"
            className="hover:text-slate-900 transition-colors py-1 hover:border-b-2 hover:border-slate-900"
          >
            ABOUT
          </a>
          <a
            href="#capabilities"
            className="hover:text-slate-900 transition-colors py-1 hover:border-b-2 hover:border-slate-900"
          >
            SKILLS
          </a>
          <a
            href="#contact"
            className="hover:text-slate-900 transition-colors py-1 hover:border-b-2 hover:border-slate-900"
          >
            CONTACT
          </a>
        </nav>

        {/* Right Action Elements: Circular Social Icons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* GitHub */}
          <a
            href="https://github.com/HeakMeng"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF5722] border border-slate-200 hover:border-[#FF5722] flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-xs"
            aria-label="GitHub Profile"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/pheng-mengheak-598442354/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF5722] border border-slate-200 hover:border-[#FF5722] flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-xs"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/pmengheak"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF5722] border border-slate-200 hover:border-[#FF5722] flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-xs"
            aria-label="Telegram @pmengheak"
          >
            <Send className="w-3.5 h-3.5 text-slate-700 group-hover:text-white" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 shadow-xs"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <a
            href="#systems"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-[#2563EB] py-1.5"
          >
            PROJECTS
          </a>
          <a
            href="#milestones"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-[#2563EB] py-1.5"
          >
            ABOUT
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-[#2563EB] py-1.5"
          >
            SKILLS
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-[#2563EB] py-1.5"
          >
            CONTACT
          </a>
        </div>
      )}
    </header>
  );
}
