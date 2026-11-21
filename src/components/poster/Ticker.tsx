import { Check, GitBranch } from "lucide-react";
import VelocityMarquee from "@/components/fx/VelocityMarquee";
import { CORE_SKILLS } from "@/data/portfolio";
import { skillIcon } from "./skill-icons";

const STATEMENTS = [
  "Open to backend roles",
  "Clean architecture",
  "Distributed systems",
  "Secure REST APIs",
  "Based in Phnom Penh",
] as const;

/**
 * Two rows between the hero and About, moving in opposite directions and reacting to scroll speed:
 * a stack of skill chips with their brand icons, then an editor-style status bar.
 */
export default function Ticker() {
  return (
    <section aria-label="Tech stack" className="relative mt-6 overflow-hidden sm:mt-10">
      {/* Row 1: skill chips. Edges fade into the page. */}
      <VelocityMarquee baseVelocity={-3} className="py-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] sm:py-7">
        <ul className="flex">
          {CORE_SKILLS.map((s) => {
            const Icon = skillIcon(s);
            return (
              <li
                key={s}
                className="group mr-3 flex items-center gap-2.5 whitespace-nowrap rounded-full border-2 border-edge bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent sm:mr-4 sm:px-5 sm:py-2.5 sm:text-base"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent transition-colors duration-300 group-hover:text-on-accent sm:h-5 sm:w-5" aria-hidden="true" />
                {s}
              </li>
            );
          })}
        </ul>
      </VelocityMarquee>

      {/* Row 2: editor status bar, running the other way behind a fixed branch label. */}
      <div aria-hidden="true" className="flex items-stretch border-y-2 border-edge bg-accent font-mono text-[11px] uppercase tracking-[0.2em] text-on-accent sm:text-xs">
        <span className="relative z-10 flex shrink-0 items-center gap-2 bg-paper px-4 normal-case tracking-normal text-accent sm:px-6">
          <GitBranch className="h-3.5 w-3.5" />
          main
        </span>
        <VelocityMarquee baseVelocity={4} skew={false} className="min-w-0 flex-1 py-2.5">
          <ul className="flex">
            {STATEMENTS.map((t) => (
              <li key={t} className="flex items-center gap-2 whitespace-nowrap px-5 sm:px-7">
                <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>
        </VelocityMarquee>
      </div>
    </section>
  );
}
