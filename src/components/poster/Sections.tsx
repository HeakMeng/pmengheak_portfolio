import type { ComponentType, ReactNode } from "react";
import { Braces, Briefcase, GraduationCap, KeyRound, Network, User } from "lucide-react";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiGnubash,
  SiLinux,
  SiOllama,
  SiOpenjdk,
  SiPostgresql,
  SiSpring,
  SiSpringboot,
} from "react-icons/si";
import { Reveal } from "@/components/Motion";
import SmartImage from "@/components/SmartImage";
import {
  AI_ARCHITECTURE,
  BIO,
  CORE_SKILLS,
  EDUCATION,
  EXPERIENCE,
  FACTS,
  LANGUAGES,
  STACK,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ContactList from "./ContactList";
import ProjectGrid from "./ProjectGrid";

type Icon = ComponentType<{ className?: string }>;

const shell = "mx-auto max-w-6xl px-4 sm:px-6";
const kicker = "font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 sm:text-[11px]";

/* ---------------- Shared poster pieces ---------------- */

/** Solid black disc holding a line icon: the recurring section mark. */
function Badge({ icon: Icon, className }: { icon: Icon; className?: string }) {
  return (
    <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper", className)} aria-hidden="true">
      <Icon className="h-5 w-5" />
    </span>
  );
}

/** Centred title flanked by two ink rules. */
function Divider({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <span className="h-0.5 flex-1 bg-ink" aria-hidden="true" />
      <h2 id={id} className="shrink-0 text-center font-display text-[clamp(1.9rem,6vw,3.25rem)] uppercase leading-none tracking-wide">
        {children}
      </h2>
      <span className="h-0.5 flex-1 bg-ink" aria-hidden="true" />
    </div>
  );
}

function ColumnTitle({ id, icon, children }: { id: string; icon: Icon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <Badge icon={icon} />
      <h2 id={id} className="font-display text-[clamp(1.75rem,4vw,2.5rem)] uppercase leading-none tracking-wide">
        {children}
      </h2>
    </div>
  );
}

const pill = "rounded-full border border-ink/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]";

/* ---------------- About ---------------- */

export function About() {
  const [lede, ...rest] = BIO;
  return (
    <section id="about" aria-labelledby="about-h" className={cn(shell, "py-16 sm:py-24")}>
      <Reveal className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className={kicker}>01 — Profile</p>
          <h2 id="about-h" className="mt-3 font-display text-[clamp(3rem,9vw,5.5rem)] uppercase leading-[0.88]">
            About
            <br />
            Me
          </h2>
        </div>
        <div className="lg:col-span-8">
          <p className="text-[clamp(1.2rem,2.4vw,1.6rem)] font-medium leading-snug">{lede}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/75 sm:text-base">
              {p}
            </p>
          ))}
          <dl className="mt-10 grid grid-cols-3 border-t-2 border-ink">
            {FACTS.map(({ value, label }, i) => (
              <div key={label} className={cn("flex flex-col-reverse pt-4", i > 0 && "border-l border-ink/20 pl-4")}>
                <dt className="mt-1 text-[11px] leading-tight text-ink/60 sm:text-xs">{label}</dt>
                <dd className="font-display text-3xl text-clay sm:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Education | Contact ---------------- */

export function EducationContact() {
  return (
    <section aria-label="Education and contact" className={shell}>
      <div className="grid border-t-2 border-ink md:grid-cols-2">
        <Reveal className="py-10 md:pr-10 md:pt-12">
          <section id="education" aria-labelledby="education-h">
            <ColumnTitle id="education-h" icon={GraduationCap}>
              Education
            </ColumnTitle>
            <ol className="mt-6">
              {EDUCATION.map((e) => (
                <li key={e.short} className="flex gap-4 border-b border-ink/15 py-4 last:border-b-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/20 bg-white p-1">
                    <SmartImage src={e.logo} alt="" width={36} height={36} fallback="school" className="h-full w-full rounded-full object-contain" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-bold leading-snug">{e.org}</h3>
                      <span className={cn(pill, e.current && "border-clay text-clay")}>{e.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-ink/75">{e.role}</p>
                    {e.tracks && <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">{e.tracks.join(" · ")}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal delay={0.1} className="border-t-2 border-ink py-10 md:border-l-2 md:border-t-0 md:pl-10 md:pt-12">
          <section id="contact" aria-labelledby="contact-h">
            <ColumnTitle id="contact-h" icon={User}>
              Contact
            </ColumnTitle>
            <ContactList />
          </section>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Work experience ---------------- */

export function WorkExperience() {
  return (
    <section id="experience" aria-labelledby="experience-h" className={cn(shell, "pt-14 sm:pt-20")}>
      <Divider id="experience-h">Work Experience</Divider>
      <ol className="mt-10 grid gap-6 md:grid-cols-2">
        {EXPERIENCE.map((x, i) => (
          <Reveal as="li" key={x.org} delay={i * 0.1} className="flex flex-col rounded-[1.75rem] border-2 border-ink bg-white/60 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <Badge icon={Briefcase} />
              <span className="flex h-14 items-center rounded-xl border border-ink/20 bg-white px-3 py-2">
                <SmartImage
                  src={x.logo}
                  alt={`${x.org} logo`}
                  // Display-scale dimensions (40px tall, true aspect) so the srcset stays small
                  width={Math.round((40 * x.logoSize.width) / x.logoSize.height)}
                  height={40}
                  fallback="building"
                  className="h-full w-auto max-w-[9.5rem] object-contain"
                />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug">{x.org}</h3>
            <p className="text-sm text-ink/75">{x.role}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">{x.period}</span>
              <span className={pill}>{x.location}</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ink/80">
              {x.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- Capabilities bar ---------------- */

function Ring({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#141414" strokeOpacity="0.12" strokeWidth="5" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#D9531E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent / 100)}
      />
    </svg>
  );
}

const STACK_ICONS: Record<(typeof STACK)[number], Icon> = {
  Java: SiOpenjdk,
  Spring: SiSpring,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  Linux: SiLinux,
  Git: SiGit,
};

const AI_ICONS: Record<(typeof AI_ARCHITECTURE)[number]["id"], Icon> = {
  ollama: SiOllama,
  "spring-cloud": Network,
};

const capTitle = "font-display text-2xl uppercase tracking-wide";

export function Capabilities() {
  return (
    <section aria-label="Capabilities" className={cn(shell, "pt-16 sm:pt-24")}>
      <div className="grid border-y-2 border-ink lg:grid-cols-3">
        <Reveal className="py-8 lg:pr-8">
          <h2 className={capTitle}>Languages</h2>
          <ul className="mt-6 grid grid-cols-3 gap-2">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex flex-col items-center text-center">
                <div className="relative">
                  <Ring percent={l.percent} />
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold">{l.percent}%</span>
                </div>
                <p className="mt-2 font-bold">{l.name}</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-ink/60">{l.level}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="border-t-2 border-ink py-8 lg:border-l-2 lg:border-t-0 lg:px-8">
          <h2 className={capTitle}>Software &amp; Stack</h2>
          <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-6 lg:grid-cols-3">
            {STACK.map((name) => {
              const Icon = STACK_ICONS[name];
              return (
                <li key={name} className="flex flex-col items-center gap-1.5">
                  <span className="flex aspect-square w-full max-w-16 items-center justify-center rounded-[1.1rem] bg-ink text-paper shadow-[inset_0_-4px_0_rgba(0,0,0,0.35)] transition-colors hover:bg-clay">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-medium text-ink/70">{name}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.16} className="border-t-2 border-ink py-8 lg:border-l-2 lg:border-t-0 lg:pl-8">
          <h2 className={capTitle}>AI &amp; Architecture</h2>
          <ul className="mt-6 space-y-5">
            {AI_ARCHITECTURE.map((a) => {
              const Icon = AI_ICONS[a.id];
              return (
                <li key={a.id} className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper outline outline-offset-[3px] outline-clay/60" aria-hidden="true">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-bold leading-snug">{a.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-ink/70">{a.summary}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

const SKILL_ICONS: Record<string, Icon> = {
  "Java 21": SiOpenjdk,
  "Spring Boot": SiSpringboot,
  Microservices: Network,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  "Keycloak / OAuth2": KeyRound,
  "REST APIs": Braces,
  FastAPI: SiFastapi,
  Ollama: SiOllama,
  Git: SiGit,
  "Linux / Bash": SiGnubash,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className={cn(shell, "pt-16 sm:pt-24")}>
      <Divider id="skills-h">Skills</Divider>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CORE_SKILLS.map((s, i) => {
          const Icon = SKILL_ICONS[s] ?? Braces;
          return (
            <Reveal
              as="li"
              key={s}
              delay={(i % 4) * 0.05}
              className="flex min-w-0 items-center gap-2.5 rounded-full border border-ink bg-white px-4 py-2.5 text-sm font-medium transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#141414]"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{s}</span>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------------- Selected projects ---------------- */

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h" className={cn(shell, "scroll-mt-6 pt-16 sm:pt-24")}>
      <Divider id="projects-h">Selected Projects</Divider>
      <ProjectGrid />
    </section>
  );
}
