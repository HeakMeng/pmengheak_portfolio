"use client";

import { useState } from "react";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiTelegram } from "react-icons/si";
import { CHANNELS, PROFILE } from "@/data/portfolio";

const ICONS = { telegram: SiTelegram, github: SiGithub, linkedin: FaLinkedin } as const;
const links = CHANNELS.filter((c): c is (typeof CHANNELS)[number] & { id: keyof typeof ICONS } => c.id in ICONS);

const row = "flex min-w-0 items-center gap-3 text-[15px] text-ink";
const icon = "h-5 w-5 shrink-0 text-ink";

/** Contact rows under the photo: icon and handle, like the credits on a printed portfolio. */
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
    <ul className="space-y-3">
      <li className={row}>
        <Mail className={icon} aria-hidden="true" />
        <a href={`mailto:${PROFILE.email}`} className="truncate underline-offset-4 hover:text-accent-ink hover:underline">
          {PROFILE.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          title="Copy email address"
          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
        >
          {copied ? <Check className="h-4 w-4 text-accent-ink" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? "Copied" : ""}
        </span>
      </li>
      {links.map((c) => {
        const Icon = ICONS[c.id];
        return (
          <li key={c.id} className={row}>
            <Icon className={icon} aria-hidden="true" />
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="truncate underline-offset-4 hover:text-accent-ink hover:underline">
              <span className="sr-only">{c.label}: </span>
              {c.handle}
            </a>
          </li>
        );
      })}
      <li className={row}>
        <MapPin className={icon} aria-hidden="true" />
        <span>
          {PROFILE.city} <span className="text-muted">({PROFILE.timezone})</span>
        </span>
      </li>
    </ul>
  );
}
