import Dock from "@/components/poster/Dock";
import Hero from "@/components/poster/Hero";
import {
  About,
  Capabilities,
  EducationContact,
  Projects,
  Skills,
  WorkExperience,
} from "@/components/poster/Sections";
import { PROFILE } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <EducationContact />
        <WorkExperience />
        <Capabilities />
        <Skills />
        <Projects />
      </main>

      <footer className="mx-auto mt-16 max-w-6xl px-4 pb-28 sm:mt-24 sm:px-6">
        <div className="border-t-2 border-ink pt-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">Open to backend roles &amp; collaborations</p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-3 inline-block break-all font-display text-[clamp(1.6rem,6vw,3.75rem)] uppercase leading-none transition-colors hover:text-clay"
          >
            {PROFILE.email}
          </a>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 sm:flex-row">
          <p>© 2026 {PROFILE.name}</p>
          <p>{PROFILE.location}</p>
        </div>
      </footer>

      <Dock />
    </>
  );
}
