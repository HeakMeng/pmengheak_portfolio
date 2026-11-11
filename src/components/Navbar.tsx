"use client";

import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "systems", label: "Projects" },
  { id: "milestones", label: "Experience" },
  { id: "capabilities", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/HeakMeng", label: "GitHub" },
  { href: "https://www.linkedin.com/in/pheng-mengheak-598442354/", label: "LinkedIn" },
  { href: "https://t.me/pmengheak", label: "Telegram" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Highlight the nav link for the section crossing the middle band of the viewport.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = LINKS.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
          else setActiveSection((current) => (current === entry.target.id ? null : current));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || mobileMenuOpen ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <a href="#hero" className="group flex select-none items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-full bg-accent/15 ring-1 ring-line transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-accent">
            <Image
              src="/images/heak-cutout.png"
              alt=""
              fill
              sizes="72px"
              className="origin-top scale-[1.6] object-cover object-[50%_8%]"
            />
          </span>
          <span className="display whitespace-nowrap text-lg text-fg">Pheng Mengheak</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "true" : undefined}
              className="nav-link px-3.5 py-2 text-[15px] text-muted transition-colors hover:text-fg"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/pmengheak.pdf"
            download="pmengheak.pdf"
            className="hidden rounded-full bg-fg px-5 py-2.5 text-sm text-bg transition-colors hover:bg-accent hover:text-white sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="rounded-lg border border-line p-2 text-fg transition-colors hover:border-accent lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-bg px-6 pb-8 pt-4 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map(({ id, label }, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="menu-item display border-b border-line py-4 text-3xl text-fg transition-colors hover:text-accent-ink"
                style={{ "--i": i } as CSSProperties}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="menu-item mt-6 flex flex-wrap gap-x-6 gap-y-3" style={{ "--i": LINKS.length } as CSSProperties}>
            {SOCIALS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-accent-ink"
              >
                {label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
            <a
              href="/pmengheak.pdf"
              download="pmengheak.pdf"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink"
            >
              Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
