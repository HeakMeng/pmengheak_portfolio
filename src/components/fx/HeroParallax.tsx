"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Range = [number | string, number | string];

type Props = {
  children: ReactNode;
  className?: string;
  /** Horizontal travel from page top to `distance` px scrolled, e.g. ["0%", "-12%"]. */
  x?: Range;
  /** Vertical travel over the same scroll span, e.g. [0, -120]. */
  y?: Range;
  /** Pixels of page scroll the movement is spread over. */
  distance?: number;
  as?: "div" | "span";
};

/** Scroll-linked drift for pieces of the hero. Only meaningful near the top of the page. */
export default function HeroParallax({ children, className, x = [0, 0], y = [0, 0], distance = 800, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const mx = useTransform(scrollY, [0, distance], x);
  const my = useTransform(scrollY, [0, distance], y);
  const Tag = as === "span" ? motion.span : motion.div;

  return (
    <Tag className={className} style={reduce ? undefined : { x: mx, y: my }}>
      {children}
    </Tag>
  );
}
