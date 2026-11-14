"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin } from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { CHANNELS, PROFILE, type Channel } from "@/data/portfolio";
import { burstFrom } from "@/lib/utils";

const ICONS: Record<Channel["id"], React.ComponentType<{ className?: string }>> = {
  email: Mail,
  telegram: SiTelegram,
  github: SiGithub,
  linkedin: FaLinkedin,
};

export default function Connect() {
  const [copied, setCopied] = useState(false);
  const resumeRef = useRef<HTMLAnchorElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  return (
    <div>
      <p className="flex items-center gap-2 text-sm text-slate-600">
        <MapPin className="h-4 w-4 text-[#2563eb]" aria-hidden="true" />
        {PROFILE.location}
      </p>

      <ul className="mt-4 space-y-2">
        {CHANNELS.map((c) => {
          const Icon = ICONS[c.id];
          const external = c.id !== "email";
          return (
            <li key={c.id} className="group flex items-center gap-2">
              <a
                href={c.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-[#2563eb]/40 hover:bg-white active:scale-95"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-800 shadow-[0_3px_0_#e2e8f0] ring-1 ring-slate-200">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">{c.label}</span>
                  <span className="block truncate text-sm font-medium text-slate-800">{c.handle}</span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[#2563eb]" aria-hidden="true" />
              </a>
              {c.id === "email" && (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="flex h-[3.6rem] w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-500 transition-[transform,color] hover:text-[#2563eb] active:scale-95"
                >
                  {copied ? <Check className="h-4 w-4 text-[#22c55e]" /> : <Copy className="h-4 w-4" />}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </p>

      <a
        ref={resumeRef}
        href={PROFILE.resume}
        download="pmengheak.pdf"
        onClick={() => burstFrom(resumeRef.current)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2563eb] px-5 py-3.5 text-sm font-bold text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.22),0_10px_20px_-8px_rgba(37,99,235,0.6)] transition-[transform,background-color] hover:bg-[#1d4ed8] active:scale-95"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download résumé (PDF)
      </a>
    </div>
  );
}
