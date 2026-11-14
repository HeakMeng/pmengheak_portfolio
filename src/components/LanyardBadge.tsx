"use client";

import { useId, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PawPrint, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import SmartImage from "@/components/SmartImage";
import { PROFILE } from "@/data/portfolio";
import { burstFrom } from "@/lib/utils";

const STRAP_TEXT = "BACKEND ENGINEER • DEV-2026 • PHENG MENGHEAK • ";
const QR_TARGET = "https://t.me/pmengheak";

/** One side of the V-shaped strap; the printed text scrolls along the ribbon. */
function Strap({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={
        "lanyard-strap absolute bottom-0 h-[150%] w-9 origin-bottom overflow-hidden rounded-sm " +
        (side === "left" ? "right-1/2 -rotate-[14deg]" : "left-1/2 rotate-[14deg]")
      }
    >
      <div className={side === "left" ? "strap-scroll" : "strap-scroll strap-scroll-reverse"}>
        {[0, 1].map((copy) => (
          <span key={copy} className="block whitespace-nowrap py-2 font-mono text-[10px] font-bold tracking-[0.22em] text-white/90 [writing-mode:vertical-rl]">
            {STRAP_TEXT.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Silver swivel clip: split ring (strap end) → swivel → bulldog body → D-ring.
 * The SVG overlaps the card top so the D-ring's lower curve lands in the grommet hole.
 */
function MetalClip() {
  const id = useId();
  // useId output contains characters that break url(#…) references
  const metal = `metal-${id.replace(/[^\w-]/g, "")}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 96"
      width={60}
      height={96}
      className="relative z-20 mx-auto -mb-[34px] block drop-shadow-[0_4px_4px_rgba(15,23,42,0.3)]"
    >
      <defs>
        <linearGradient id={metal} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#64748b" />
          <stop offset="0.35" stopColor="#e2e8f0" />
          <stop offset="0.5" stopColor="#f8fafc" />
          <stop offset="0.75" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
      </defs>
      {/* Split ring holding the strap */}
      <circle cx="30" cy="12" r="8" fill="none" stroke={`url(#${metal})`} strokeWidth="3.5" />
      {/* Swivel */}
      <rect x="26" y="19" width="8" height="7" rx="2" fill={`url(#${metal})`} stroke="#475569" strokeWidth="0.75" />
      {/* Bulldog body */}
      <rect x="17" y="25" width="26" height="26" rx="6" fill={`url(#${metal})`} stroke="#475569" strokeWidth="1" />
      <rect x="20" y="27.5" width="20" height="3" rx="1.5" fill="#fff" opacity="0.75" />
      <circle cx="30" cy="38" r="2.6" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <path d="M21.5 45.5H38.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      {/* D-ring through the badge grommet */}
      <rect x="23" y="50" width="14" height="42" rx="7" fill="none" stroke={`url(#${metal})`} strokeWidth="3.5" />
    </svg>
  );
}

export default function LanyardBadge() {
  const cardRef = useRef<HTMLButtonElement>(null);

  // Pointer-driven 3D tilt plus a glossy highlight that tracks the cursor.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 160, damping: 16 });
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 160, damping: 16 });
  const glossX = useTransform(px, (v) => `${v * 100}%`);
  const glossY = useTransform(py, (v) => `${v * 100}%`);
  const gloss = useMotionTemplate`radial-gradient(circle at ${glossX} ${glossY}, rgba(255,255,255,0.38), transparent 45%)`;

  function onMove(e: React.PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[20rem] flex-col items-center pt-24 [perspective:1100px]">
      {/* Lanyard strap looping from the top centre */}
      {/* Clip box reaches up to the shell's top edge (= its padding) so the strap hangs from it */}
      <div className="absolute inset-x-0 -top-6 h-[8.5rem] overflow-hidden sm:-top-10 sm:h-[9.5rem]">
        <div className="absolute bottom-0 left-1/2 h-full w-0">
          <Strap side="left" />
          <Strap side="right" />
        </div>
      </div>

      {/* Card floats continuously; the inner layer handles hover and tilt */}
      <motion.div
        className="relative z-10 w-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <MetalClip />

        <motion.button
          ref={cardRef}
          type="button"
          aria-label={`ID badge for ${PROFILE.name}. Click to celebrate.`}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onClick={() => burstFrom(cardRef.current, ["#ef4444", "#facc15", "#2563eb", "#ffffff"])}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ rotate: [-1, 2, -1], y: -6, transition: { rotate: { duration: 1.2, repeat: Infinity }, y: { duration: 0.3 } } }}
          whileTap={{ scale: 0.97 }}
          className="relative block w-full cursor-pointer overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-rose-500 to-red-600 p-5 text-left text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_10px_0_0_#b91c1c,0_20px_30px_rgba(0,0,0,0.15)] outline-none focus-visible:ring-4 focus-visible:ring-blue-400/70"
        >
          {/* Metal grommet around the punch-hole; the clip's D-ring drops into it */}
          <span aria-hidden="true" className="grommet absolute left-1/2 top-3 h-[26px] w-[26px] -translate-x-1/2 rounded-full">
            <span className="absolute inset-[6px] rounded-full bg-red-950/80 shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]" />
          </span>

          <div className="mt-1 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
            <span>Dev Pass · 2026</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5">All access</span>
          </div>

          {/* Photo */}
          <div className="relative mt-4 aspect-[4/4.2] overflow-hidden rounded-2xl border-2 border-white/40 bg-gradient-to-b from-sky-100 to-blue-200 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.15)]">
            <SmartImage
              src={PROFILE.photo}
              alt={`Portrait of ${PROFILE.name}`}
              fill
              sizes="300px"
              priority
              fallback="user"
              className="scale-[1.35] object-cover object-[50%_18%]"
            />
          </div>

          <p className="mt-4 text-[1.65rem] font-bold leading-none tracking-tight">{PROFILE.name.toUpperCase()}</p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="space-y-2">
              <p className="font-mono text-xs text-white/85">ID: {PROFILE.badgeId}</p>
              <span className="inline-block rounded-md bg-[#fde047] px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-[#854d0e] shadow-[0_3px_0_#d97706]">
                {PROFILE.roleTag}
              </span>
            </div>
            <span className="shrink-0 rounded-xl bg-white p-1.5 shadow-[0_4px_0_rgba(0,0,0,0.15)]">
              <QRCodeSVG value={QR_TARGET} size={64} level="M" fgColor="#0f172a" bgColor="#ffffff" title="QR code: Telegram @pmengheak" />
            </span>
          </div>

          {/* Stickers */}
          <span aria-hidden="true" className="absolute right-3 top-24 rotate-12 rounded-full bg-[#fde047] p-1.5 text-[#b45309] shadow-[0_3px_0_#d97706]">
            <Star className="h-4 w-4 fill-current" />
          </span>
          <span aria-hidden="true" className="absolute left-3 top-[52%] -rotate-12 rounded-lg bg-slate-900 px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#22c55e] shadow-[0_3px_0_#020617]">
            &gt;_
          </span>
          <span aria-hidden="true" className="absolute right-4 top-[48%] rotate-[-8deg] rounded-full bg-white p-1.5 text-rose-500 shadow-[0_3px_0_rgba(0,0,0,0.15)]">
            <PawPrint className="h-3.5 w-3.5" />
          </span>

          {/* Glossy laminate */}
          <motion.span aria-hidden="true" style={{ background: gloss }} className="pointer-events-none absolute inset-0" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        </motion.button>
      </motion.div>

      <p className="mt-7 font-mono text-[11px] text-slate-400">Scan the QR for Telegram · click the badge</p>
    </div>
  );
}
