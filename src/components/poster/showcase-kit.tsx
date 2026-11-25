import type { ComponentType, ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Sparkle } from "./Doodles";

/** Shared parts for the drawn project covers and the richer case-study bodies. */

export type Icon = ComponentType<{ className?: string }>;
export type Module = { icon: Icon; color: string; title: string; text: string };

export const INK = "#24205A";

/**
 * Sky gradient with halftone dots, the same paper as the page, as a container-query box so
 * everything inside can be sized in cqw and scale from card thumbnail to modal header.
 */
export function CoverBackdrop({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className="@container relative h-full w-full overflow-hidden bg-gradient-to-br from-sky-top to-sky-bottom">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(color-mix(in srgb, var(--color-ink) 14%, transparent) 1px, transparent 1.2px)",
          backgroundSize: "2.4cqw 2.4cqw",
        }}
        aria-hidden="true"
      />
      {children}
      <Sparkle className="absolute right-[3%] top-[5%] h-[4cqw] w-[4cqw] text-pink" />
    </div>
  );
}

/** "What it does": one tile per capability. */
export function ModuleGrid({ modules }: { modules: Module[] }) {
  return (
    <section className="mt-8">
      <h4 className="text-lg font-semibold">What it does</h4>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map(({ icon: I, color, title, text }) => (
          <li key={title} className="rounded-2xl bg-sunken p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: color }}>
              <I className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-3 font-semibold text-ink">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A box in the architecture diagram. */
export function Node({ icon: I, color, title, children }: { icon: Icon; color: string; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-paper p-4 ring-1 ring-line">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ backgroundColor: color }}>
        <I className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold leading-snug text-ink">{title}</p>
        <p className="mt-0.5 text-sm leading-snug text-muted">{children}</p>
      </div>
    </div>
  );
}

/** Arrow between diagram columns: down when stacked, right on wide screens. */
export function Flow() {
  return (
    <span className="flex items-center justify-center text-pink" aria-hidden="true">
      <ArrowDown className="h-6 w-6 lg:hidden" />
      <ArrowRight className="hidden h-6 w-6 lg:block" />
    </span>
  );
}

/** The five-column track the diagrams use: clients, arrow, core, arrow, data. */
export const diagramGrid = "grid items-center gap-3 lg:grid-cols-[1fr_2rem_1.25fr_2rem_1fr]";
