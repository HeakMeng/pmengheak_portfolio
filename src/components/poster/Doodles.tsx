/** Hand-drawn marks in ink and pink, used like a designer's pen notes on the sheet. Decorative only. */

export function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 90" className={className} fill="none" aria-hidden="true">
      <path
        className="doodle-draw"
        style={{ ["--len" as string]: 220 }}
        d="M6 70 C 40 18, 112 6, 166 40"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M150 22 L168 41 L144 50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 44" className={className} fill="none" aria-hidden="true">
      <path
        className="doodle-draw"
        style={{ ["--len" as string]: 160 }}
        d="M8 34 C 2 20, 18 6, 30 14 C 42 22, 30 38, 20 30 C 12 22, 30 8, 54 12"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SmallArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} fill="none" aria-hidden="true">
      <path d="M40 6 C 34 22, 22 30, 8 32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 22 L7 32 L19 37" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={className} fill="none" aria-hidden="true">
      <path d="M6 10 L13 4 M10 20 L22 12 M18 26 L25 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
