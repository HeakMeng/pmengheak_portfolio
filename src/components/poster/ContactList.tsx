"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, MapPin } from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";
import { CHANNELS, PROFILE } from "@/data/portfolio";

const telegram = CHANNELS.find((c) => c.id === "telegram")!;
const github = CHANNELS.find((c) => c.id === "github")!;

const row = "flex items-center gap-4 border-b border-edge py-3.5 last:border-b-0";
const label = "w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted";

export default function ContactList() {
  const [copied, setCopied] = useState(false);

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
    <ul className="mt-6 rounded-2xl border-2 border-edge bg-surface p-5 shadow-[4px_4px_0px_var(--color-accent)]">
      <li className={row}>
        <span className={label}>Based</span>
        <span className="flex min-w-0 items-center gap-2 font-medium text-ink">
          <MapPin className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
          {PROFILE.city} <span className="text-muted">({PROFILE.timezone})</span>
        </span>
      </li>
      <li className={row}>
        <span className={label}>Email</span>
        <button
          type="button"
          onClick={copyEmail}
          className="group flex min-w-0 items-center gap-2 text-left font-medium text-ink transition-colors hover:text-accent-ink"
          aria-label={`Copy email address ${PROFILE.email}`}
        >
          <span className="truncate">{PROFILE.email}</span>
          {copied ? (
            <Check className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-ink" aria-hidden="true" />
          )}
        </button>
        <span aria-live="polite" className="ml-auto hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink sm:inline">
          {copied ? "Copied" : ""}
        </span>
      </li>
      {[
        { c: telegram, Icon: SiTelegram },
        { c: github, Icon: SiGithub },
      ].map(({ c, Icon }) => (
        <li key={c.id} className={row}>
          <span className={label}>{c.label}</span>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-2 font-medium text-ink transition-colors hover:text-accent-ink"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{c.handle}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-ink" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
