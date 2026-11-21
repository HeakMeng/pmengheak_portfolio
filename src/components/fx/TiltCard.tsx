"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const spring = { stiffness: 180, damping: 18, mass: 0.5 };

/**
 * Card that leans toward the mouse in 3D and carries a soft light spot under the pointer.
 * Rendered as the <article> itself so it can take the card classes directly.
 */
export default function TiltCard({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  // Pointer position inside the card, 0..1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx} ${gy}, rgba(255,122,26,0.10), transparent 65%)`;

  function move(e: PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function leave() {
    setHover(false);
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={move}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={leave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      animate={{ y: hover && !reduce ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn("relative", className)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{ background: glare, opacity: hover ? 1 : 0 }}
      />
    </motion.article>
  );
}
