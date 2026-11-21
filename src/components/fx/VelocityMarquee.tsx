"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

const COPIES = 4;

/** Wraps `v` into the range [min, max). */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

type Props = {
  children: ReactNode;
  /**
   * Drift speed in % of one copy per second. Sign sets the resting direction:
   * negative scrolls left, positive scrolls right.
   */
  baseVelocity?: number;
  className?: string;
  /** Lean the row in the direction of travel while the page is being scrolled. */
  skew?: boolean;
};

/**
 * Endless row that drifts on its own, speeds up while the page scrolls, and flips direction
 * when the visitor scrolls back up. Pauses while hovered; holds still for reduced motion.
 * Content is repeated four times; copies after the first are hidden from assistive tech.
 */
export default function VelocityMarquee({ children, baseVelocity = -1, className, skew = true }: Props) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-2500, 2500], [7, -7]);
  // One copy is 1/COPIES of the track, so wrapping over that span loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  const direction = useRef(1);
  const hovered = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || hovered.current) return;
    let move = direction.current * (baseVelocity / COPIES) * (delta / 1000);
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    move += direction.current * move * b;
    baseX.set(baseX.get() + move);
  });

  return (
    <div
      className={cn("overflow-hidden", className)}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div className="flex w-max" style={reduce ? undefined : { x, skewX: skew ? skewX : 0 }}>
        {Array.from({ length: COPIES }, (_, i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
