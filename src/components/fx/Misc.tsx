"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Thin cobalt bar along the top edge that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent" style={{ scaleX }} />;
}

/** Section rule that grows outward from the title. `side` is which side of the title it sits on. */
export function RevealRule({ side, className }: { side: "left" | "right"; className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn("h-0.5 flex-1 bg-ink/40", side === "left" ? "origin-right" : "origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
    />
  );
}

/**
 * Counts a whole number up when it first scrolls into view. Years count the last stretch (2000 → 2025)
 * rather than from zero. Non-numeric values such as "UTC+7" render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();
  const n = /^\d+$/.test(value) ? Number(value) : null;

  useEffect(() => {
    if (!inView || n === null || reduce) return;
    const from = n >= 1000 ? n - 25 : 0;
    const controls = animate(from, n, {
      duration: 1.4,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, n, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** Progress ring whose arc sweeps in to `percent` the first time it is seen. */
export function Ring({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r={r} fill="none" className="stroke-line" strokeWidth="5" />
      <motion.circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        className="stroke-accent"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c * (1 - percent / 100) }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 1.3, ease, delay: 0.15 }}
      />
    </svg>
  );
}
