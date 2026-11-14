import type { ReactNode } from "react";
import { Award, ChevronRight, MapPin } from "lucide-react";
import { SiLinux, SiPostgresql } from "react-icons/si";
import SmartImage from "@/components/SmartImage";
import {
  ACHIEVEMENTS,
  BIO,
  CORE_SKILLS,
  EDUCATION,
  EXPERIENCE,
  FACTS,
  PROJECTS,
  TECH_STACK,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Heading({ id, icon, children }: { id: string; icon: ReactNode; children: ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.22)]" aria-hidden="true">
        {icon}
      </span>
      {children}
    </h2>
  );
}

/** Keycap feel: a 3px bottom ledge that sinks a little on hover and fully on press. */
const press =
  "shadow-[0_3px_0_0_#cbd5e1] transition-[transform,box-shadow,background-color] duration-150 hover:translate-y-px hover:shadow-[0_2px_0_0_#cbd5e1] active:translate-y-[3px] active:shadow-none";

const tag = "rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] text-slate-600";

/* ---------------- Left column ---------------- */

export function Bio() {
  return (
    <>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-600">
        {BIO.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-2">
        {FACTS.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center">
            <dt className="mt-0.5 text-[11px] leading-tight text-slate-500">{label}</dt>
            <dd className="text-xl font-bold text-[#2563eb]">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function Education() {
  return (
    <ol className="relative mt-5 space-y-5 before:absolute before:bottom-3 before:left-[1.35rem] before:top-3 before:w-px before:bg-slate-200">
      {EDUCATION.map((e) => (
        <li key={e.short} className="relative flex gap-4">
          <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_4px_0_#e2e8f0]">
            <SmartImage src={e.logo} alt={`${e.org} logo`} width={40} height={40} fallback="school" className="h-full w-full object-contain" />
          </span>
          <div className="min-w-0 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="font-mono text-[11px] font-semibold text-[#2563eb]">{e.period}</p>
              {e.current && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-green-700 ring-1 ring-green-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
                  Active
                </span>
              )}
            </div>
            <h3 className="mt-1 font-bold leading-snug text-slate-900">{e.org}</h3>
            <p className="text-sm text-slate-600">{e.role}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{e.note}</p>
            {e.tracks && (
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${e.short} tracks`}>
                {e.tracks.map((t) => (
                  <li key={t} className={tag}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CoreSkills() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {CORE_SKILLS.map((s) => (
        <li
          key={s}
          className={cn(press, "cursor-default rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-[#1d4ed8] hover:bg-blue-50/70")}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

const MARKS = {
  postgresql: { Icon: SiPostgresql, color: "#4169E1" },
  linux: { Icon: SiLinux, color: "#0f172a" },
} as const;

export function TechStack() {
  return (
    <ul className="mt-4 grid grid-cols-4 gap-3">
      {TECH_STACK.map((t) => {
        const mark = t.mark ? MARKS[t.mark] : null;
        return (
          <li key={t.name} className="flex flex-col items-center gap-1.5">
            <span className={cn(press, "flex aspect-square w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 hover:bg-white")}>
              {mark ? (
                <mark.Icon className="h-8 w-8" style={{ color: mark.color }} aria-hidden="true" />
              ) : (
                <SmartImage src={t.src!} alt="" width={32} height={32} fallback="code" className="h-8 w-8 object-contain" />
              )}
            </span>
            <span className="text-[11px] font-medium text-slate-500">{t.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------- Right column ---------------- */

export function Experience() {
  return (
    <ol className="mt-5 space-y-4">
      {EXPERIENCE.map((x) => (
        <li key={x.org} className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_4px_0_#e2e8f0]">
              <SmartImage src={x.logo} alt={`${x.org} logo`} width={44} height={44} fallback="building" className="h-full w-full rounded-xl object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] font-semibold text-[#2563eb]">{x.period}</p>
              <h3 className="mt-0.5 font-bold text-slate-900">{x.org}</h3>
              <p className="flex flex-wrap items-center gap-x-2 text-sm text-slate-600">
                <em className="not-italic font-medium">{x.role}</em>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {x.location}
                </span>
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-1.5 text-[14px] text-slate-600">
            {x.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {x.tags.map((t) => (
              <li key={t} className={tag}>
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export function Projects() {
  return (
    <ol className="mt-5 space-y-4">
      {PROJECTS.map((p, i) => (
        <li
          key={p.id}
          className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_4px_0_#e2e8f0] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_0_#dbeafe,0_20px_36px_-20px_rgba(37,99,235,0.35)] sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          {/* Screenshot in a rounded browser frame */}
          <div className="flex bg-slate-100 p-2.5 sm:pr-0">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white sm:rounded-r-none sm:border-r-0">
              <div className="flex items-center gap-1 border-b border-slate-200 px-2.5 py-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span className="ml-1.5 truncate font-mono text-[9px] text-slate-400">{p.id}.local</span>
              </div>
              <div className="relative h-44 overflow-hidden sm:h-auto sm:flex-1">
                <SmartImage
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 92vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 sm:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-bold leading-tight text-slate-900">{p.title}</h3>
              <span className="font-mono text-xs text-slate-300">0{i + 1}</span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#2563eb]">{p.subtitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>

            <details className="group/notes mt-2.5">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-mono text-[11px] font-semibold text-slate-500 transition-colors hover:text-[#2563eb] [&::-webkit-details-marker]:hidden">
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-open/notes:rotate-90" aria-hidden="true" />
                Architecture notes
              </summary>
              <ul className="mt-2 space-y-1 text-[13px] text-slate-600">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </details>

            <ul className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label={`${p.title} tech stack`}>
              {p.tech.map((t) => (
                <li key={t} className={tag}>
                  {t}
                </li>
              ))}
            </ul>
            {(p.repoUrl || p.demoUrl) && (
              <div className="mt-3 flex gap-2">
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium transition-transform hover:border-[#2563eb] active:scale-95">
                    Source
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#2563eb] px-3 py-1.5 text-sm font-medium text-white transition-transform active:scale-95">
                    Live demo
                  </a>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Achievements() {
  return (
    <ol className="relative mt-6 grid gap-6 sm:grid-cols-3 sm:gap-4">
      {/* Connecting rail */}
      <span aria-hidden="true" className="absolute left-[1.1rem] top-2 bottom-2 w-0.5 rounded bg-slate-200 sm:left-[16.66%] sm:right-[16.66%] sm:top-[1.1rem] sm:bottom-auto sm:h-0.5 sm:w-auto" />
      {ACHIEVEMENTS.map((a, i) => (
        <li key={a.title} className="relative flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
          <span
            className={cn(
              "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.22)]",
              i === ACHIEVEMENTS.length - 1 ? "bg-[#2563eb]" : "bg-slate-800",
            )}
            aria-hidden="true"
          >
            <Award className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[11px] font-semibold text-[#2563eb]">{a.period}</p>
            <p className="mt-0.5 font-bold text-slate-900">{a.title}</p>
            <p className="text-[13px] text-slate-500">{a.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
