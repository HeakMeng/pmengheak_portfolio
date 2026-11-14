"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { PROFILE, RECEIPT } from "@/data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;
const COMMAND = "whoami";

const subscribeNever = () => () => {};

/** Types COMMAND one key at a time after the monitor has settled. */
function useTyped() {
  // Ignore the reduced-motion preference until hydration ends, so server and client render the same text.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const reduce = useReducedMotion() && hydrated;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < COMMAND.length) timer = setTimeout(tick, 110);
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [reduce]);

  return reduce ? COMMAND : COMMAND.slice(0, count);
}

export default function RetroMonitor() {
  const typed = useTyped();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto w-full max-w-3xl"
    >
      {/* Floating keycap: Ctrl */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-2 -top-6 z-30 sm:-left-10 sm:-top-8"
        animate={{ y: [0, -6, 0], rotate: [-14, -10, -14] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
      >
        <span className="block rounded-xl border border-amber-300 bg-[#fde047] px-4 py-2.5 font-mono text-sm font-bold text-amber-900 shadow-[inset_0_2px_0_rgba(255,255,255,0.75),0_6px_0_#d97706,0_16px_24px_-8px_rgba(217,119,6,0.55)] sm:px-5 sm:py-3 sm:text-base">
          Ctrl
        </span>
      </motion.div>

      {/* Floating squircles: Java + Git */}
      <motion.div
        aria-hidden="true"
        className="absolute -right-1 -top-8 z-30 sm:-right-10 sm:-top-10"
        animate={{ y: [0, -7, 0], rotate: [10, 6, 10] }}
        transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut", delay: 0.4 }}
      >
        <span className="relative block rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-[0_6px_0_#cbd5e1,0_18px_30px_-10px_rgba(15,23,42,0.25)]">
          <SmartImage src="/images/java.svg" alt="" width={44} height={44} className="h-9 w-9 sm:h-11 sm:w-11" />
          <span className="absolute -bottom-4 -left-5 block rotate-[-18deg] rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_4px_0_#cbd5e1]">
            <SmartImage src="/images/git.svg" alt="" width={22} height={22} className="h-5 w-5" />
          </span>
        </span>
      </motion.div>

      {/* Bezel & housing (wrapper has no z-index so the sticky note can sit above the receipt) */}
      <div className="relative">
        <div className="relative z-10 rounded-3xl bg-[#2563eb] p-4 shadow-[inset_0_-8px_0_rgba(0,0,0,0.25),0_20px_40px_rgba(37,99,235,0.25)] sm:p-8">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-1.5 h-1.5 rounded-full bg-white/25" />

          {/* CRT glass */}
          <div className="crt relative overflow-hidden rounded-2xl border-4 border-[#1d4ed8] bg-slate-950 p-5 text-center text-white sm:p-8">
            <div className="crt-flicker phosphor relative z-10">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-[#22c55e]">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
                  Online
                </span>
                <span className="hidden sm:inline">tty0 · pm@phnom-penh</span>
                <span>Portfolio // 2026</span>
              </div>

              <p className="mt-6 text-left font-mono text-sm text-[#22c55e] sm:mt-8 sm:text-base" aria-label="whoami">
                <span className="text-slate-500">$</span> {typed}
                <span className="cursor-blink cursor-glow ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#22c55e]" aria-hidden="true" />
              </p>

              <h1 className="crt-glow font-pixel mt-2 text-[clamp(2.6rem,10vw,5.6rem)] leading-[0.9] tracking-wide text-white">
                {PROFILE.name.toUpperCase()}
              </h1>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">{PROFILE.tagline}</p>

              <nav aria-label="Quick links" className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-xs sm:mt-7">
                <a href="#projects" className="rounded-md border border-[#22c55e]/50 px-3 py-1.5 text-[#22c55e] transition-[transform,background-color] hover:bg-[#22c55e]/10 active:scale-95">
                  ./projects
                </a>
                <a href="#connect" className="rounded-md border border-slate-600 px-3 py-1.5 text-slate-300 transition-[transform,background-color] hover:bg-white/5 active:scale-95">
                  ./contact
                </a>
                <a href={PROFILE.resume} download className="rounded-md border border-slate-600 px-3 py-1.5 text-slate-300 transition-[transform,background-color] hover:bg-white/5 active:scale-95">
                  resume.pdf
                </a>
              </nav>
            </div>

            {/* Glass: scanlines, vignette, glare */}
            <span aria-hidden="true" className="crt-scanlines pointer-events-none absolute inset-0 z-20" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
            <span aria-hidden="true" className="pointer-events-none absolute -left-1/4 -top-1/2 z-20 h-full w-3/4 rotate-[-18deg] bg-gradient-to-b from-white/[0.07] to-transparent" />
          </div>

          {/* Bottom bezel: badge, paper slot, power LED */}
          <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
            <span className="hidden items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-100/80 sm:inline-flex">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              DEV-2026
            </span>
            <span aria-hidden="true" className="mx-auto h-3 w-56 rounded-full bg-[#1e3a8a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.55)] sm:w-80" />
            <span className="hidden items-center gap-2 sm:inline-flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
              <span className="h-4 w-4 rounded-full bg-[#1d4ed8] shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)]" />
            </span>
          </div>
        </div>

        {/* Sticky note on the screen corner */}
        <div
          aria-hidden="true"
          className="absolute -bottom-5 left-1 z-40 -rotate-6 sm:-right-6 sm:bottom-10 sm:left-auto sm:rotate-[5deg]"
        >
          <span className="absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 bg-white/70 shadow-sm" />
          <span className="font-hand block bg-[#fef08a] px-3 pb-2.5 pt-3.5 text-lg sm:px-4 sm:pb-3 sm:pt-4 leading-none text-[#854d0e] shadow-[0_10px_18px_-8px_rgba(133,77,14,0.55)] sm:text-2xl">
            Backend
            <br />
            Specialist ★
          </span>
        </div>
      </div>

      {/* Receipt ejected from the paper slot (slot centre = bezel padding + half slot height) */}
      <div className="relative z-20 mx-auto -mt-[22px] w-52 overflow-hidden sm:-mt-[38px] sm:w-[19rem]">
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.9, duration: 1.8, ease: [0.45, 0, 0.25, 1] }}
          className="receipt-shadow"
        >
          <div className="receipt bg-white px-4 pb-4 pt-4 font-mono text-[10px] leading-relaxed text-slate-700 sm:text-[11px]">
            <p className="text-center font-bold tracking-[0.2em] text-slate-900">** TELEMETRY **</p>
            <p className="text-center text-slate-400">{PROFILE.badgeId} · PHNOM PENH</p>
            <hr className="my-2 border-dashed border-slate-300" />
            <dl className="space-y-1">
              {RECEIPT.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[4.2rem_1fr] gap-1">
                  <dt className="font-bold text-slate-900">{label}:</dt>
                  <dd className={label === "STATUS" ? "font-bold text-[#16a34a]" : undefined}>{value}</dd>
                </div>
              ))}
            </dl>
            <hr className="my-2 border-dashed border-slate-300" />
            <div aria-hidden="true" className="barcode mx-auto h-7 w-4/5" />
            <p className="mt-1 text-center text-[9px] uppercase tracking-[0.25em] text-slate-400">Thank you for visiting</p>
            <div aria-hidden="true" className="perforation -mx-4 mt-3 h-2" />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
