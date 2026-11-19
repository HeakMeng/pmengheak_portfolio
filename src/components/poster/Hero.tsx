import { ArrowUpRight } from "lucide-react";
import { Enter } from "@/components/Motion";
import { PROFILE } from "@/data/portfolio";
import Portrait from "./Portrait";
import TechToken from "./TechToken";

/** Hairline downward arrow, drawn rather than typed so it can be long and thin. */
function DownArrow() {
  return (
    <svg viewBox="0 0 24 96" className="h-16 w-4 lg:h-24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M12 2v90" />
      <path d="M4 82l8 10 8-10" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden px-4 pt-5 sm:px-6 sm:pt-6">
      {/* Masthead strip: the only chrome on the page, no navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]">
        <span>{PROFILE.name}</span>
        <span className="hidden sm:inline">Java · Spring Boot · Microservices</span>
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
          </span>
          Open to work
        </span>
      </div>

      {/* Extruded clay logos framing the poster: top-left, middle-right, bottom-left */}
      <TechToken
        logo="springboot"
        label="Spring Boot"
        tilt={-12}
        className="absolute left-[3%] top-[7%] z-[5] w-14 sm:left-[5%] sm:top-[9%] sm:w-20 lg:w-24"
      />
      <TechToken
        logo="docker"
        label="Docker"
        tilt={12}
        delay={1.3}
        className="absolute right-[2%] top-[42%] z-[5] w-16 sm:right-[4%] sm:w-24 lg:w-32"
      />
      <TechToken
        logo="kotlin"
        label="Kotlin"
        tilt={-6}
        delay={2.6}
        className="absolute bottom-[6%] left-[3%] z-[5] hidden w-14 sm:block sm:w-[4.5rem]"
      />

      <div className="relative mx-auto max-w-7xl">
        <h1 className="relative z-0 mt-8 text-center font-display uppercase sm:mt-10">
          <span className="block text-[clamp(3.25rem,15vw,11rem)] leading-[0.86] tracking-[-0.01em]">Backend</span>
          <span className="text-outline mt-1 block text-[clamp(3.5rem,22vw,14rem)] leading-[0.9] tracking-[0.01em] sm:mt-2">
            Developer
          </span>
        </h1>

        {/*
          Portrait row. The negative top margin pulls the cut-out up over the lower half
          of the outlined line, so the letters sit behind the head and shoulders.
          To change the photo, drop the new file at /public/images/heak-editorial.png
          (see PROFILE.photo in src/data/portfolio.ts); Portrait falls back to heak-cutout.png.
        */}
        <div className="pointer-events-none relative z-10 -mt-[19vw] grid grid-cols-1 items-end sm:-mt-[clamp(7.5rem,16vw,10rem)] lg:grid-cols-[1fr_minmax(0,460px)_1fr] lg:gap-6">
          <Enter delay={0.15} className="pointer-events-auto mx-auto w-[78vw] max-w-[380px] lg:order-2 lg:w-full lg:max-w-[460px]">
            <Portrait />
          </Enter>

          <Enter delay={0.35} className="pointer-events-auto order-3 mt-2 flex flex-col items-center gap-5 pb-10 lg:order-1 lg:mt-0 lg:items-start lg:pb-40">
            <span className="hidden lg:block">
              <DownArrow />
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:flex-col lg:items-start">
              <a
                href="#projects"
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-paper transition-colors hover:bg-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
              >
                Portfolio
              </a>
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 border-b border-ink pb-0.5 text-sm font-medium uppercase tracking-wider transition-colors hover:border-clay hover:text-clay"
              >
                Résumé
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </Enter>

          <Enter delay={0.45} className="pointer-events-auto order-2 -mt-6 text-center lg:order-3 lg:mt-0 lg:pb-24 lg:text-right">
            <p className="font-display text-[clamp(2.5rem,11vw,3.25rem)] uppercase leading-[0.9] lg:text-[clamp(3rem,4.6vw,4.25rem)]">
              Pheng
              <br />
              Mengheak
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
              {PROFILE.title} · <span className="text-clay">Java / Spring</span>
            </p>
          </Enter>
        </div>
      </div>
    </header>
  );
}
