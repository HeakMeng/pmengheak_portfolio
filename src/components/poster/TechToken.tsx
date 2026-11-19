"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Logo silhouettes from Simple Icons (CC0), 24×24 grid. */
const LOGOS = {
  springboot:
    "m23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z",
  docker:
    "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  kotlin: "M24 24H0V0h24L12 12Z",
} as const;

/*
 * Extrusion: the silhouette is restamped back-to-front along a mostly-downward
 * vector. At the rendered sizes (≈96–144px for 24 units) 2.8 units ≈ 12px of depth.
 */
const DEPTH = 2.8;
const STEPS = 14;
const DIR = { x: 0.3, y: 1 };
const LAYERS = Array.from({ length: STEPS }, (_, i) => {
  const t = (STEPS - i) / STEPS; // 1 = deepest
  return { dx: DIR.x * DEPTH * t, dy: DIR.y * DEPTH * t, shade: t > 0.55 ? "#7A2609" : "#8C2D0B" };
});

type Props = {
  logo: keyof typeof LOGOS;
  label: string;
  /** Resting tilt in degrees; hover straightens it. */
  tilt: number;
  /** Offsets the bob so the three shapes never move in sync. */
  delay?: number;
  className?: string;
};

/** A logo silhouette sculpted as a thick terracotta clay object, floating on the paper. */
export default function TechToken({ logo, label, tilt, delay = 0, className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const shape = `${uid}-shape`;
  const face = `${uid}-face`;
  const gloss = `${uid}-gloss`;
  const clip = `${uid}-clip`;

  return (
    <div className={cn("pointer-events-none", className)}>
      <motion.div
        role="img"
        aria-label={`${label} logo`}
        className="pointer-events-auto cursor-default [filter:drop-shadow(0_14px_12px_rgba(20,20,20,0.16))_drop-shadow(0_3px_3px_rgba(110,35,9,0.18))]"
        initial={{ rotate: tilt, y: -5 }}
        animate={{ rotate: tilt, y: [-5, 5, -5] }}
        whileHover={{ scale: 1.08, rotate: 0 }}
        transition={{
          y: { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay },
          rotate: { type: "spring", stiffness: 260, damping: 16 },
          scale: { type: "spring", stiffness: 300, damping: 18 },
        }}
      >
        <svg viewBox="-0.5 -0.5 25 28" className="h-auto w-full overflow-visible" aria-hidden="true">
          <defs>
            <path id={shape} d={LOGOS[logo]} />
            <linearGradient id={face} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E5622E" />
              <stop offset="55%" stopColor="#D9531E" />
              <stop offset="100%" stopColor="#B83D12" />
            </linearGradient>
            <linearGradient id={gloss} x1="0" y1="0" x2="0.75" y2="0.75">
              <stop offset="0%" stopColor="#FFF1E6" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#FFF1E6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFF1E6" stopOpacity="0" />
            </linearGradient>
            <clipPath id={clip}>
              <use href={`#${shape}`} />
            </clipPath>
          </defs>

          {/* extruded body, deepest layer first */}
          {LAYERS.map(({ dx, dy, shade }, i) => (
            <use key={i} href={`#${shape}`} fill={shade} transform={`translate(${dx} ${dy})`} />
          ))}

          {/* top face, with a gloss crescent left along its top-left edges */}
          <g clipPath={`url(#${clip})`}>
            <use href={`#${shape}`} fill={`url(#${gloss})`} />
            <use href={`#${shape}`} fill={`url(#${face})`} transform="translate(0.32 0.42)" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
