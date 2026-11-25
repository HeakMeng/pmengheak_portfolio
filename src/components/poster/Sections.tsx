import type { ComponentType } from "react";
import { Download } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { BIO, EDUCATION, EXPERIENCE, LANGUAGES, PROFILE, SKILL_GROUPS, TOOLS } from "@/data/portfolio";
import ContactList from "./ContactList";
import { CurvedArrow, DashedArrow, SmallArrow, Sparkle, Squiggle } from "./Doodles";
import ProjectGrid from "./ProjectGrid";
import { skillIcon } from "./skill-icons";

type Icon = ComponentType<{ className?: string }>;

/** Brand colour for each tool tile (the icon is drawn in white on it, like an app icon). */
const TILE_COLORS: Record<string, string> = {
  Java: "#E76F00",
  "Spring Boot": "#5FA83A",
  PostgreSQL: "#336791",
  Docker: "#1D8FE1",
  Kafka: "#231F20",
  Keycloak: "#008AAA",
  Ollama: "#3B3B3B",
  "Linux / Bash": "#2E8B3A",
};

const heading = "font-display text-[2rem] font-semibold leading-tight text-ink sm:text-[2.4rem]";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-fill px-5 py-3 text-sm font-semibold text-on-fill transition-colors hover:bg-fill-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink ring-2 ring-ink/15 transition-colors hover:ring-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/* ---------------- About ---------------- */

export function About() {
  const [lede, ...rest] = BIO;
  return (
    <section id="about" aria-labelledby="about-h" className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
      <div>
        <p className="font-hand text-3xl text-muted sm:text-4xl">About me!</p>
        <h2 id="about-h" className="mt-6 font-display text-[clamp(2.9rem,8vw,5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-ink">
          Pheng
          <br />
          Mengheak
        </h2>
        <p className="mt-3 text-sm text-muted">
          a.k.a. <span className="font-semibold text-ink">{PROFILE.nickname}</span>
        </p>

        <p className="mt-6 max-w-[36rem] text-[15px] leading-relaxed text-ink sm:text-base">
          <span className="mr-2 font-hand text-[2.6rem] font-bold leading-none">Hi!</span>
          {lede}
        </p>
        {rest.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 max-w-[36rem] text-[15px] leading-relaxed text-muted sm:text-base">
            {p}
          </p>
        ))}

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className={btnPrimary}>
            See my projects
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download résumé
          </a>
        </div>
      </div>

      <div className="relative flex flex-col items-center lg:items-start">
        {/* Pen arrow from the introduction to the photo */}
        <CurvedArrow className="absolute -left-28 top-6 hidden h-20 w-40 text-ink lg:block" />

        <div className="relative">
          <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gradient-to-b from-tint to-sunken ring-8 ring-tint sm:h-72 sm:w-72">
            <SmartImage
              src={PROFILE.photoFallback}
              alt={`Photo of ${PROFILE.name}`}
              fill
              priority
              sizes="(min-width: 640px) 288px, 256px"
              fallback="user"
              className="object-cover object-top"
            />
          </div>
          <Sparkle className="absolute -right-6 top-2 h-8 w-8 text-pink" />
        </div>

        <div id="contact" className="mt-8 w-full max-w-sm scroll-mt-24">
          <ContactList />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Education, skills and tools ---------------- */

export function Background() {
  return (
    <section id="skills" aria-label="Education, skills and tools" className="mt-20 grid scroll-mt-24 gap-14 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="flex items-center gap-2">
          <Squiggle className="h-9 w-12 text-pink" />
          <h2 className={heading}>Education</h2>
        </div>
        <ol className="mt-6 space-y-5">
          {EDUCATION.map((e) => (
            <li key={e.short} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-line">
                <SmartImage src={e.logo} alt="" width={40} height={40} fallback="school" className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug text-ink">{e.org}</h3>
                <p className="text-sm text-muted">{e.role}</p>
                <p className="mt-0.5 font-hand text-xl leading-tight text-accent-ink">{e.period}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className={heading}>Tools I use</h2>
        <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          {TOOLS.map((t) => {
            const Icon = skillIcon(t.name) as Icon;
            return (
              <li key={t.name} className="flex items-center gap-3">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.18)]"
                  style={{ backgroundColor: TILE_COLORS[t.name] ?? "var(--color-fill)" }}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold leading-snug text-ink">{t.name}</span>
                  <span className="block text-sm leading-snug text-muted">{t.use}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <div className="flex items-end gap-1">
          <h2 className={heading}>Skills</h2>
          <SmallArrow className="mb-3 h-8 w-10 text-pink" />
        </div>
        <dl className="mt-5 space-y-3 text-[15px]">
          {SKILL_GROUPS.map((g) => (
            <div key={g.area} className="grid grid-cols-[7.5rem_1fr] gap-3">
              <dt className="font-semibold text-ink">{g.area}</dt>
              <dd className="text-muted">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-10 font-semibold text-ink">Languages</h3>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[15px] text-muted">
          {LANGUAGES.map((l) => (
            <li key={l.name}>
              <span className="text-ink">{l.name}</span> ({l.level.toLowerCase()})
            </li>
          ))}
        </ul>
      </div>

      {/* Off the clock: a pen arrow from the skills list to a photo from the pitch */}
      <figure className="flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-4 lg:self-center">
        <DashedArrow className="h-12 w-28 rotate-90 text-pink lg:h-16 lg:w-44 lg:rotate-0" />
        <div className="relative flex flex-col items-center">
          <div className="relative h-44 w-44 overflow-hidden rounded-full bg-tint ring-8 ring-tint sm:h-52 sm:w-52">
            <SmartImage
              src="/pmegheak.jpg"
              alt={`${PROFILE.name} holding the KSHRD Champions football trophy on the pitch`}
              fill
              sizes="208px"
              fallback="user"
              className="object-cover object-[50%_38%]"
            />
          </div>
          <Sparkle className="absolute -right-5 top-0 h-7 w-7 text-pink" />
          <figcaption className="mt-4 -rotate-3 font-hand text-[1.75rem] leading-none text-ink">I can play football too!</figcaption>
        </div>
      </figure>
    </section>
  );
}

/* ---------------- Work ---------------- */

export function WorkExperience() {
  return (
    <section id="experience" aria-labelledby="experience-h" className="mt-24 scroll-mt-24">
      <div className="flex items-center gap-2">
        <Squiggle className="h-9 w-12 text-pink" />
        <h2 id="experience-h" className={heading}>
          Where I&rsquo;ve worked
        </h2>
      </div>

      {/* A real timeline, oldest first: one line joins the entries */}
      <ol className="relative mt-8 space-y-10 border-l-2 border-dashed border-line pl-8 sm:ml-3">
        {EXPERIENCE.map((x) => (
          <li key={x.org} className="relative">
            <span className="absolute -left-[2.6rem] top-1 h-4 w-4 rounded-full border-[3px] border-paper bg-accent ring-2 ring-accent" aria-hidden="true" />
            <p className="font-hand text-2xl leading-none text-accent-ink">{x.period}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-xl font-semibold text-ink">{x.org}</h3>
              <span className="flex h-9 items-center rounded-xl bg-white px-2 py-1 ring-1 ring-line">
                <SmartImage
                  src={x.logo}
                  alt={`${x.org} logo`}
                  width={Math.round((28 * x.logoSize.width) / x.logoSize.height)}
                  height={28}
                  fallback="building"
                  className="h-full w-auto max-w-[7rem] object-contain"
                />
              </span>
            </div>
            <p className="text-[15px] text-muted">
              {x.role}, {x.location}
            </p>
            <ul className="mt-4 max-w-3xl space-y-2 text-[15px] leading-relaxed text-ink">
              {x.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- Projects ---------------- */

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h" className="mt-24 scroll-mt-24">
      <div className="flex items-end gap-1">
        <h2 id="projects-h" className={heading}>
          Things I&rsquo;ve built
        </h2>
        <SmallArrow className="mb-3 h-8 w-10 text-pink" />
      </div>
      <ProjectGrid />
      <p className="mt-10 text-sm text-muted">
        Want the details on any of these?{" "}
        <a href={`mailto:${PROFILE.email}`} className="font-semibold text-accent-ink underline underline-offset-4 hover:no-underline">
          Email me
        </a>
      </p>
    </section>
  );
}
