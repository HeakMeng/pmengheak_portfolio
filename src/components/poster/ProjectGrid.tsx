"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ExternalLink, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SmartImage from "@/components/SmartImage";
import { PROJECTS, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { CortexCover, CortexDetails } from "./CortexShowcase";
import { GameHubCover, GameHubDetails } from "./GameHubShowcase";
import { InsightHubCover, InsightHubDetails } from "./InsightHubShowcase";
import { SnapPosCover, SnapPosDetails } from "./SnapPosShowcase";

/** Projects with a drawn cover instead of a lone screenshot, and a richer case-study body. */
const COVERS: Record<string, ComponentType<{ label: string; sizes: string }>> = {
  insighthub: InsightHubCover,
  snappos: SnapPosCover,
  cortex: CortexCover,
  gamehub: GameHubCover,
};
const DETAILS: Record<string, ComponentType> = {
  insighthub: InsightHubDetails,
  snappos: SnapPosDetails,
  cortex: CortexDetails,
  gamehub: GameHubDetails,
};

const pill = "rounded-full bg-tint px-3 py-1 text-xs font-medium text-ink";
const tag = "font-hand text-xl leading-none text-pink";
const kicker = "text-sm text-muted";
const caseBtn =
  "inline-flex items-center gap-1.5 rounded-full bg-fill px-4 py-2 text-sm font-semibold text-on-fill transition-colors hover:bg-fill-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-full text-ink ring-2 ring-ink/15 transition-colors hover:ring-accent hover:text-accent-ink";
const card = "flex w-full flex-col";

function ProjectLinks({ p, withLabels = false }: { p: Project; withLabels?: boolean }) {
  if (!p.repoUrl && !p.demoUrl) return null;
  const labelled = withLabels && "w-auto gap-2 px-3 text-sm font-semibold";
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
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${p.title} case study`}
      className={cn(
        "group relative block aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-sunken ring-1 ring-line focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      <ShotImage p={p} sizes={sizes} className={imgClassName} />
    </button>
  );
}

/** The project's drawn cover if it has one, otherwise its screenshot. Fills its positioned parent. */
function ShotImage({ p, sizes, className }: { p: Project; sizes: string; className?: string }) {
  const Cover = COVERS[p.id];
  if (Cover) {
    return (
      <span className="absolute inset-0">
        <Cover label={p.imageAlt} sizes={sizes} />
      </span>
    );
  }
  return <SmartImage src={p.image} alt={p.imageAlt} fill sizes={sizes} className={cn("object-cover object-top", className)} />;
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
    <div className="mt-5 flex items-center justify-between gap-3">
      <button type="button" onClick={onOpen} className={caseBtn}>
        Read the case study
      </button>
      <ProjectLinks p={p} />
    </div>
  );
}

/** Flagship project: a large screenshot with the write-up beside it on desktop, stacked below that. */
function FeaturedCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <article className={cn(card, "gap-6 lg:grid lg:grid-cols-12 lg:gap-10")}>
      <Shot
        p={p}
        onOpen={onOpen}
        sizes="(min-width: 1024px) 620px, 92vw"
        // A drawn cover keeps its 16:10 shape; a plain screenshot stretches to the text column's height.
        className={COVERS[p.id] ? "lg:col-span-7 lg:self-center" : "lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[22rem]"}
        imgClassName="lg:object-left-top"
      />
      <div className="flex flex-col lg:col-span-5 lg:py-2">
        <p className={tag}>{p.category}</p>
        <h3 className="mt-2 font-display text-[clamp(2.2rem,5vw,3rem)] font-extrabold leading-none tracking-[-0.02em] text-ink">{p.title}</h3>
        <p className={cn(kicker, "mt-2")}>{p.subtitle}</p>
        {p.context && <p className="mt-1 text-sm font-medium text-accent-ink">{p.context}</p>}
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.description}</p>
        <div className="mt-5">
          <Pills p={p} />
        </div>
        <CardFooter p={p} onOpen={onOpen} />
      </div>
    </article>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <article className={card}>
      <Shot p={p} onOpen={onOpen} sizes="(min-width: 1024px) 340px, (min-width: 768px) 31vw, 92vw" />
      <p className={cn(tag, "mt-5")}>{p.category}</p>
      <h3 className="mt-1 font-display text-[1.7rem] font-extrabold leading-none tracking-[-0.02em] text-ink">{p.title}</h3>
      <p className={cn(kicker, "mt-1.5")}>{p.subtitle}</p>
      <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
      <div className="mt-4">
        <Pills p={p} />
      </div>
      <div className="mt-auto">
        <CardFooter p={p} onOpen={onOpen} />
      </div>
    </article>
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
  const Details = p ? DETAILS[p.id] : undefined;
  const columns = p && !Details
    ? [
        { title: "Architecture", items: p.architecture },
        { title: "Database & API", items: p.dataApi },
      ].filter((c): c is { title: string; items: string[] } => !!c.items?.length)
    : [];

  return (
    <>
      <div className="mt-8">
        <FeaturedCard p={featured} onOpen={() => setOpen(0)} />
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
        {rest.map((proj, i) => (
          <li key={proj.id} className="flex">
            <ProjectCard p={proj} onOpen={() => setOpen(i + 1)} />
          </li>
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
        className="case-study m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-[2rem] bg-paper p-0 text-ink shadow-[0_30px_80px_-30px_rgba(36,32,90,0.55)] backdrop:bg-[var(--color-sky-top)]/80 backdrop:backdrop-blur-sm"
      >
        {p && open !== null && (
          <div className="flex max-h-[92dvh] flex-col">
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-8">
              <div className="min-w-0">
                <p className={tag}>{p.category}</p>
                <h3 id="case-study-title" className="mt-1 font-display text-[clamp(2rem,6vw,3rem)] font-extrabold leading-none tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.subtitle}</p>
                {p.context && <p className="mt-0.5 text-sm font-medium text-accent-ink">{p.context}</p>}
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close case study"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ring-ink/15 transition-colors hover:bg-fill hover:text-on-fill"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="overflow-y-auto overscroll-contain">
              <div className="relative aspect-[16/10] w-full border-b border-line bg-sunken">
                <ShotImage p={p} sizes="(min-width: 896px) 896px, 100vw" />
              </div>

              <div className="px-5 py-6 sm:px-7 sm:py-8">
                <p className="max-w-3xl text-[15px] leading-relaxed text-muted sm:text-base">{p.description}</p>

                {Details && <Details />}

                {p.contributions?.length ? (
                  <section className="mt-8">
                    <h4 className="text-lg font-semibold">My contributions</h4>
                    <Bullets items={p.contributions} />
                  </section>
                ) : null}

                {columns.length > 0 && (
                  <div className={cn("mt-8 grid gap-8", columns.length > 1 && "md:grid-cols-2 md:gap-0 md:divide-x md:divide-line")}>
                    {columns.map((col, ci) => (
                      <section key={col.title} className={cn(columns.length > 1 && (ci === 0 ? "md:pr-7" : "md:pl-7"))}>
                        <h4 className="text-lg font-semibold">{col.title}</h4>
                        <Bullets items={col.items} />
                      </section>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
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
