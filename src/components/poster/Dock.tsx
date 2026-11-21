"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/fx/ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
] as const;

type SectionId = (typeof LINKS)[number]["id"];

/** Floating section dock: the active section is the last one whose top has crossed the upper quarter of the viewport. */
export default function Dock() {
  const [active, setActive] = useState<SectionId>("top");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.25;
      let current: SectionId = "top";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may never reach the line; it is still the one being read.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "projects";
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-dock-edge bg-dock/65 px-2 py-2 text-dock-ink shadow-[0_12px_32px_rgba(15,30,58,0.18),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:px-4"
    >
      <ul className="flex items-center sm:gap-1">
        {LINKS.map(({ id, label }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors sm:gap-1.5 sm:px-3 sm:text-xs",
                  on ? "text-dock-ink" : "text-dock-ink/55 hover:text-dock-ink",
                )}
              >
                <span className="relative flex h-1.5 w-1.5 items-center justify-center" aria-hidden="true">
                  {on && (
                    <motion.span
                      layoutId="dock-dot"
                      className="absolute h-1.5 w-1.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                </span>
                {label}
              </a>
            </li>
          );
        })}
        <li className="ml-1 flex items-center border-l border-dock-ink/20 pl-1.5 sm:ml-2 sm:pl-2.5">
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
