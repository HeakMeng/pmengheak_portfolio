"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  /** Official full-colour logo, e.g. /logos/tech/docker.svg */
  src: string;
  label: string;
  /** Resting tilt in degrees; hover straightens it. */
  tilt: number;
  /** Offsets the bob so the badges never move in sync. */
  delay?: number;
  /** Inner padding of the tile; lower it for logos whose SVG has a lot of built-in whitespace. */
  padding?: string;
  className?: string;
};

/**
 * A real brand logo on a white app-icon tile (ink border, cobalt offset shadow), floating on the
 * paper with a slow bob. Size it with a width class on `className`.
 */
export default function LogoBadge({ src, label, tilt, delay = 0, padding = "17%", className }: Props) {
  return (
    <div className={cn("pointer-events-none", className)}>
      <motion.div
        role="img"
        aria-label={`${label} logo`}
        title={label}
        className="pointer-events-auto flex aspect-square w-full cursor-default items-center justify-center rounded-[28%] border-2 border-edge bg-white shadow-[5px_5px_0px_var(--color-accent)]"
        style={{ padding }}
        initial={{ rotate: tilt, y: -5 }}
        animate={{ rotate: tilt, y: [-5, 5, -5] }}
        whileHover={{ scale: 1.08, rotate: 0 }}
        transition={{
          y: { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay },
          rotate: { type: "spring", stiffness: 260, damping: 16 },
          scale: { type: "spring", stiffness: 300, damping: 18 },
        }}
      >
        <Image src={src} alt="" width={96} height={96} unoptimized draggable={false} className="h-full w-full select-none object-contain" />
      </motion.div>
    </div>
  );
}
