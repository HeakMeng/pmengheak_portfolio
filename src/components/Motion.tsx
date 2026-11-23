"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Honour the visitor's reduced-motion setting everywhere. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades its content up once, the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Load-time entrance for hero pieces (they are above the fold, so no scroll trigger).
 * A CSS animation (see globals.css), so it runs before hydration. `fade={false}` only rises,
 * for content that should paint immediately such as the hero portrait.
 */
export function Enter({
  children,
  className,
  delay = 0,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
}) {
  return (
    <div className={cn(fade ? "hero-rise" : "portrait-rise", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
