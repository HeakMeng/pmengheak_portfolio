"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Reveal } from "@/components/Motion";
import TiltCard from "@/components/fx/TiltCard";
import SmartImage from "@/components/SmartImage";
import { PROJECTS, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const num = (i: number) => String(i + 1).padStart(2, "0");

const pill = "rounded-full border border-edge bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted";
const tag = "rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper";
const kicker = "font-mono text-[10px] uppercase tracking-[0.16em] text-muted";
const caseBtn =
  "inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-wider text-paper shadow-[0_3px_0_var(--color-accent)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:shadow-[0_5px_0_var(--color-accent)] hover:bg-accent active:translate-y-[3px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-full border-2 border-edge bg-surface transition-colors hover:bg-ink hover:text-paper";
const card = "flex w-full overflow-hidden rounded-2xl border-2 border-edge bg-surface shadow-[6px_6px_0px_var(--color-accent)]";

function ProjectLinks({ p, withLabels = false }: { p: Project; withLabels?: boolean }) {
  if (!p.repoUrl && !p.demoUrl) return null;
  const labelled = withLabels && "w-auto gap-2 px-3 text-xs font-medium uppercase tracking-wider";
  return (
    <div className="flex items-center gap-2">
      {p.repoUrl && (
        <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source on GitHub`} className={cn(iconLink, labelled)}>
          <SiGithub className="h-4 w-4" aria-hidden="true" />
          {withLabels && "Source"}
        </a>
      )}
      {p.demoUrl && (
        <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className={cn(iconLink, labelled)}>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {withLabels && "Live demo"}
        </a>
      )}
    </div>
  );
}

function Shot({
  p,
  onOpen,
  sizes,
  className,
  imgClassName,
}: {
  p: Project;
  onOpen: () => void;
  sizes: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${p.title} case study`}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn(
        "group relative block aspect-[16/10] w-full overflow-hidden border-edge bg-sunken focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      <SmartImage
        src={p.image}
        alt={p.imageAlt}
        fill
        sizes={sizes}
        className={cn("object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]", imgClassName)}
      />
    </motion.button>
  );
}

function Pills({ p }: { p: Project }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={`${p.title} tech stack`}>
      {p.tech.map((t) => (
        <li key={t} className={pill}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function CardFooter({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-edge px-5 py-4 sm:px-6">
      <button type="button" onClick={onOpen} className={caseBtn}>
        Case study
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <ProjectLinks p={p} />
    </div>
  );
}

/**
 * Flagship project: screenshot and copy side by side on desktop, stacked below that.
 * Side by side, the copy column is taller than 16:10, so the shot is cropped from the top-left to keep the brand mark in view.
 */
function FeaturedCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <TiltCard max={3} className={cn(card, "flex-col lg:grid lg:grid-cols-12")}>
      <Shot
        p={p}
        onOpen={onOpen}
        sizes="(min-width: 1024px) 640px, 92vw"
        className="border-b-2 lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[22rem] lg:border-b-0 lg:border-r-2"
        imgClassName="lg:object-left-top"
      />
      <div className="flex flex-col lg:col-span-5">
        <div className="flex items-end justify-between gap-3 px-5 pt-5 sm:px-6">
          <span className="font-display text-6xl leading-none text-accent">{num(0)}</span>
          <div className="flex flex-wrap justify-end gap-1.5">
            <span className="rounded-full border border-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Flagship</span>
            <span className={tag}>{p.category}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-5 pt-4 sm:px-6">
          <h3 className="font-display text-[clamp(2.25rem,5vw,3rem)] uppercase leading-none text-ink">{p.title}</h3>
          <p className={cn(kicker, "mt-1.5")}>{p.subtitle}</p>
          {p.context && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{p.context}</p>}
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">{p.description}</p>
          <div className="mt-4">
            <Pills p={p} />
          </div>
        </div>
        <CardFooter p={p} onOpen={onOpen} />
      </div>
    </TiltCard>
  );
}

function ProjectCard({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  return (
    <TiltCard className={cn(card, "flex-col")}>
      <div className="flex items-end justify-between px-5 pb-3 pt-4">
        <span className="font-display text-5xl leading-none text-accent">{num(index)}</span>
        <span className={tag}>{p.category}</span>
      </div>
      <Shot p={p} onOpen={onOpen} sizes="(min-width: 1024px) 360px, (min-width: 768px) 31vw, 92vw" className="border-y-2" />
      <div className="flex flex-1 flex-col px-5 pt-5">
        <h3 className="font-display text-[1.9rem] uppercase leading-none text-ink">{p.title}</h3>
        <p className={cn(kicker, "mt-1")}>{p.subtitle}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-4">
          <Pills p={p} />
        </div>
      </div>
      <CardFooter p={p} onOpen={onOpen} />
    </TiltCard>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Drive the native <dialog> (focus trap, Esc, top layer) from state, and lock page scroll while it is up.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
    document.documentElement.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const [featured, ...rest] = PROJECTS;
  const p = open !== null ? PROJECTS[open] : null;
  // Only the case-study columns a project actually has; InsightHub, for one, lists contributions instead.
  const columns = p
    ? [
        { title: "Architecture", items: p.architecture },
        { title: "Database & API", items: p.dataApi },
      ].filter((c): c is { title: string; items: string[] } => !!c.items?.length)
    : [];

  return (
    <>
      <Reveal className="mt-10 flex">
        <FeaturedCard p={featured} onOpen={() => setOpen(0)} />
      </Reveal>

      <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {rest.map((proj, i) => (
          <Reveal as="li" key={proj.id} delay={i * 0.08} className="flex">
            <ProjectCard p={proj} index={i + 1} onOpen={() => setOpen(i + 1)} />
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="case-study-title"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          // A click that lands on the <dialog> itself (not its content) is a backdrop click.
          if (e.target === e.currentTarget) setOpen(null);
        }}
        className="case-study m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-2xl border-2 border-edge bg-surface p-0 text-ink shadow-[8px_8px_0_var(--color-accent)] backdrop:bg-paper/80 backdrop:backdrop-blur-sm"
      >
        {p && open !== null && (
          <div className="flex max-h-[92dvh] flex-col">
            <header className="flex items-start justify-between gap-4 border-b-2 border-edge bg-paper px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl leading-none text-accent">{num(open)}</span>
                  <span className={tag}>{p.category}</span>
                </div>
                <h3 id="case-study-title" className="mt-2 font-display text-[clamp(2rem,6vw,3rem)] uppercase leading-none">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">{p.subtitle}</p>
                {p.context && <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:text-[11px]">{p.context}</p>}
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close case study"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-edge transition-colors hover:bg-ink hover:text-paper"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="overflow-y-auto overscroll-contain">
              <div className="relative aspect-[16/10] w-full border-b-2 border-edge bg-sunken">
                <SmartImage src={p.image} alt={p.imageAlt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover object-top" />
              </div>

              <div className="px-5 py-6 sm:px-7 sm:py-8">
                <p className="max-w-3xl text-[15px] leading-relaxed text-muted sm:text-base">{p.description}</p>

                {p.contributions?.length ? (
                  <section className="mt-8">
                    <h4 className="font-display text-xl uppercase tracking-wide">My contributions</h4>
                    <Bullets items={p.contributions} />
                  </section>
                ) : null}

                {columns.length > 0 && (
                  <div className={cn("mt-8 grid gap-8", columns.length > 1 && "md:grid-cols-2 md:gap-0 md:divide-x-2 md:divide-edge")}>
                    {columns.map((col, ci) => (
                      <section key={col.title} className={cn(columns.length > 1 && (ci === 0 ? "md:pr-7" : "md:pl-7"))}>
                        <h4 className="font-display text-xl uppercase tracking-wide">{col.title}</h4>
                        <Bullets items={col.items} />
                      </section>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-edge pt-5">
                  <Pills p={p} />
                  <ProjectLinks p={p} withLabels />
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
