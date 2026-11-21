"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const spring = { stiffness: 220, damping: 15, mass: 0.4 };

/** Pulls its child a little toward the mouse while hovered, then springs back. Mouse only. */
export default function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function move(e: PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span ref={ref} onPointerMove={move} onPointerLeave={reset} style={{ x, y }} className={cn("inline-block", className)}>
      {children}
    </motion.span>
  );
}
