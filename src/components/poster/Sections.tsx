import type { ComponentType } from "react";
import { GraduationCap, Network, User } from "lucide-react";
import {
  SiApachekafka,
  SiDocker,
  SiGit,
  SiLinux,
  SiOllama,
  SiOpenjdk,
  SiPostgresql,
  SiSpring,
} from "react-icons/si";
import { Reveal } from "@/components/Motion";
import { CountUp, RevealRule, Ring } from "@/components/fx/Misc";
import SplitText from "@/components/fx/SplitText";
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
import { skillIcon } from "./skill-icons";
import ProjectGrid from "./ProjectGrid";

type Icon = ComponentType<{ className?: string }>;

const shell = "mx-auto max-w-6xl px-4 sm:px-6";
const kicker = "font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]";

/* ---------------- Shared poster pieces ---------------- */

/** Solid black disc holding a line icon: the recurring section mark. */
function Badge({ icon: Icon, className }: { icon: Icon; className?: string }) {
  return (
    <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper shadow-[2px_2px_0px_var(--color-accent)]", className)} aria-hidden="true">
      <Icon className="h-5 w-5" />
    </span>
  );
}

/** Centred title flanked by two ink rules. */
function Divider({ id, children }: { id: string; children: string }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <RevealRule side="left" />
      <h2 id={id} className="shrink-0 text-center font-display text-[clamp(1.9rem,6vw,3.25rem)] uppercase leading-none tracking-wide">
        <SplitText text={children} />
      </h2>
      <RevealRule side="right" />
    </div>
  );
}

function ColumnTitle({ id, icon, children }: { id: string; icon: Icon; children: string }) {
  return (
    <div className="flex items-center gap-4">
      <Badge icon={icon} />
      <h2 id={id} className="font-display text-[clamp(1.75rem,4vw,2.5rem)] uppercase leading-none tracking-wide">
        <SplitText text={children} />
      </h2>
    </div>
  );
}

const pill = "rounded-full border border-edge px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]";

/* ---------------- About ---------------- */

export function About() {
  const [lede, ...rest] = BIO;
  return (
    <section id="about" aria-labelledby="about-h" className={cn(shell, "py-16 sm:py-24")}>
      <Reveal className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className={kicker}>01 — Profile</p>
          <h2 id="about-h" className="mt-3 font-display text-[clamp(3rem,9vw,5.5rem)] uppercase leading-[0.88]">
            <SplitText text="About" className="block" />
            <SplitText text="Me" delay={0.15} className="block" />
          </h2>
        </div>
        <div className="lg:col-span-8">
          <p className="text-[clamp(1.2rem,2.4vw,1.6rem)] font-medium leading-snug text-ink">{lede}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
              {p}
            </p>
          ))}
          <dl className="mt-10 grid grid-cols-3 border-t-2 border-edge">
            {FACTS.map(({ value, label }, i) => (
              <div key={label} className={cn("flex flex-col-reverse pt-4", i > 0 && "border-l border-edge pl-4")}>
                <dt className="mt-1 text-[11px] leading-tight text-muted sm:text-xs">{label}</dt>
                <dd className="font-display text-3xl text-accent sm:text-4xl">
                  <CountUp value={value} />
                </dd>
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
      <div className="grid border-t-2 border-edge md:grid-cols-2">
        <Reveal className="py-10 md:pr-10 md:pt-12">
          <section id="education" aria-labelledby="education-h">
            <ColumnTitle id="education-h" icon={GraduationCap}>
              Education
            </ColumnTitle>
            <ol className="mt-6 space-y-3">
              {EDUCATION.map((e) => (
                <li key={e.short} className="flex gap-4 rounded-2xl border-2 border-edge bg-surface p-4 shadow-[4px_4px_0px_var(--color-accent)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-edge bg-white p-1">
                    <SmartImage src={e.logo} alt="" width={36} height={36} fallback="school" className="h-full w-full rounded-full object-contain" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-bold leading-snug text-ink">{e.org}</h3>
                      <span className={cn(pill, e.current && "border-accent bg-accent/10 text-accent")}>{e.period}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted">{e.role}</p>
                    {e.tracks && <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{e.tracks.join(" · ")}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal delay={0.1} className="border-t-2 border-edge py-10 md:border-l-2 md:border-t-0 md:pl-10 md:pt-12">
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

/** Three window-control dots, as on a code editor or terminal title bar. */
function WindowDots() {
  return (
    <span className="flex shrink-0 gap-1.5" aria-hidden="true">
      <span className="h-3 w-3 rounded-full border border-edge bg-dot-red" />
      <span className="h-3 w-3 rounded-full border border-edge bg-dot-amber" />
      <span className="h-3 w-3 rounded-full border border-edge bg-dot-green" />
    </span>
  );
}

/**
 * Work history styled as an engineer's workspace: a `git log` prompt above the title, and each job
 * as an editor window with a file tab, numbered lines, and #tags.
 */
export function WorkExperience() {
  return (
    <section id="experience" aria-labelledby="experience-h" className="band-grid relative my-16 border-y-2 border-edge bg-tint py-16 text-ink sm:my-24 sm:py-20">
      <div className={shell}>
        <p className="mb-5 text-center font-mono text-[11px] text-muted sm:text-xs" aria-hidden="true">
          <span className="text-accent">~/career</span> <span className="text-ink">$</span> git log --author=&quot;pheng&quot; --reverse
          <span className="caret ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />
        </p>
        <Divider id="experience-h">Work Experience</Divider>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {EXPERIENCE.map((x, i) => (
            <Reveal
              as="li"
              key={x.org}
              delay={i * 0.1}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-edge bg-surface shadow-[6px_6px_0px_var(--color-accent)]"
            >
              {/* Editor title bar */}
              <div className="flex items-center gap-3 border-b-2 border-edge bg-paper px-4 py-2.5">
                <WindowDots />
                <span className="min-w-0 truncate font-mono text-[11px] text-muted">
                  <span className="hidden sm:inline">~/experience/</span>
                  <span className="font-semibold text-ink">{x.file}</span>
                </span>
                <span className="ml-auto shrink-0 rounded-md bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-on-accent">
                  {x.period}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-ink">{x.org}</h3>
                    <p className="text-sm text-muted">{x.role}</p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      <span className="text-accent">@</span> {x.location}
                    </p>
                  </div>
                  <span className="flex h-11 shrink-0 items-center rounded-xl border border-edge bg-white px-2 py-1.5 sm:h-14 sm:px-3 sm:py-2">
                    <SmartImage
                      src={x.logo}
                      alt={`${x.org} logo`}
                      width={Math.round((40 * x.logoSize.width) / x.logoSize.height)}
                      height={40}
                      fallback="building"
                      className="h-full w-auto max-w-[6rem] object-contain sm:max-w-[8.5rem]"
                    />
                  </span>
                </div>

                {/* Highlights as numbered editor lines */}
                <ol className="mt-5 space-y-2 border-l-2 border-accent/25 text-[15px] leading-relaxed text-muted">
                  {x.highlights.map((h, n) => (
                    <li key={h} className="grid grid-cols-[2.25rem_1fr] gap-2">
                      <span className="select-none pt-[0.2em] pr-2 text-right font-mono text-xs text-accent/60" aria-hidden="true">
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ol>

                <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5 font-mono text-[11px] text-accent" aria-label={`${x.org} tags`}>
                  {x.tags.map((t) => (
                    <li key={t}>#{t.toLowerCase().replace(/\s+/g, "-")}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Capabilities bar ---------------- */

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
  messaging: SiApachekafka,
};

const capTitle = "font-display text-2xl uppercase tracking-wide";

export function Capabilities() {
  return (
    <section aria-label="Capabilities" className={cn(shell, "pt-16 sm:pt-24")}>
      <div className="grid overflow-hidden rounded-[2rem] border-2 border-edge bg-surface/65 shadow-[6px_6px_0px_var(--color-accent)] backdrop-blur-md lg:grid-cols-3">
        <Reveal className="p-6 sm:p-8">
          <h2 className={capTitle}>
            <SplitText text="Languages" />
          </h2>
          <ul className="mt-6 grid grid-cols-3 gap-2">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex flex-col items-center text-center">
                <div className="relative">
                  <Ring percent={l.percent} />
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold text-ink">{l.percent}%</span>
                </div>
                <p className="mt-2 font-bold text-ink">{l.name}</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{l.level}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="border-t-2 border-edge p-6 sm:p-8 lg:border-l-2 lg:border-t-0">
          <h2 className={capTitle}>
            <SplitText text="Software & Stack" />
          </h2>
          <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-6 lg:grid-cols-3">
            {STACK.map((name) => {
              const Icon = STACK_ICONS[name];
              return (
                <li key={name} className="flex flex-col items-center gap-1.5">
                  <span className="flex aspect-square w-full max-w-16 items-center justify-center rounded-[1.1rem] bg-ink text-paper shadow-[inset_0_-4px_0_rgba(0,0,0,0.35),3px_3px_0px_var(--color-accent)] transition-colors hover:bg-accent hover:text-paper">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-medium text-muted">{name}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.16} className="border-t-2 border-edge p-6 sm:p-8 lg:border-l-2 lg:border-t-0">
          <h2 className={capTitle}>
            <SplitText text="AI & Architecture" />
          </h2>
          <ul className="mt-6 space-y-5">
            {AI_ARCHITECTURE.map((a) => {
              const Icon = AI_ICONS[a.id];
              return (
                <li key={a.id} className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-edge bg-surface shadow-[3px_3px_0px_var(--color-accent)] outline outline-offset-[3px] outline-accent/60" aria-hidden="true">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-bold leading-snug text-ink">{a.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted">{a.summary}</p>
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

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="band-grid mt-16 border-y-2 border-edge bg-tint py-16 sm:mt-24 sm:py-20">
      <div className={shell}>
        <Divider id="skills-h">Skills</Divider>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CORE_SKILLS.map((s, i) => {
            const Icon = skillIcon(s);
            return (
              <Reveal
                as="li"
                key={s}
                delay={(i % 4) * 0.05}
                className="flex min-w-0 items-center gap-2.5 rounded-full border-2 border-edge bg-surface px-4 py-2.5 text-sm font-medium text-ink shadow-[4px_4px_0px_var(--color-accent)] transition-[transform,box-shadow,color] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-accent)] hover:text-accent"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="truncate">{s}</span>
              </Reveal>
            );
          })}
        </ul>
      </div>
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
