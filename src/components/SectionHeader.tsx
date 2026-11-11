import type { ReactNode } from "react";

/** Numbered section heading shared by every section below the hero. */
export default function SectionHeader({
  index,
  label,
  title,
  titleId,
  intro,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  titleId?: string;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="eyebrow flex items-center gap-3 text-muted">
          <span className="text-accent-ink">{index}</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          {label}
        </p>
        <h2 id={titleId} className="mt-6 text-4xl text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </div>
      {aside && <div className="lg:col-span-4 lg:justify-self-end">{aside}</div>}
    </div>
  );
}
