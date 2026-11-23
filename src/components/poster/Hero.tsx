import type { ComponentType } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { Enter } from "@/components/Motion";
import HeroParallax from "@/components/fx/HeroParallax";
import Magnetic from "@/components/fx/Magnetic";
import SplitText from "@/components/fx/SplitText";
import { CHANNELS, PROFILE } from "@/data/portfolio";
import Portrait from "./Portrait";
import LogoBadge from "./LogoBadge";

/** Hairline downward arrow, drawn rather than typed so it can be long and thin. */
function DownArrow() {
  return (
    <svg viewBox="0 0 24 96" className="h-16 w-4 lg:h-24 lg:short:h-16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M12 2v90" />
      <path d="M4 82l8 10 8-10" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const CONTACT_ICONS: Partial<Record<(typeof CHANNELS)[number]["id"], ComponentType<{ className?: string }>>> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  email: Mail,
};
const heroContacts = CHANNELS.filter((c) => c.id in CONTACT_ICONS);

const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-full border-2 border-edge bg-surface text-ink transition-colors hover:bg-fill hover:text-on-fill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden px-4 pt-5 sm:px-6 sm:pt-6">
      {/* Masthead strip: the only chrome on the page, no navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-edge pb-3 font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]">
        <span>{PROFILE.name}</span>
        <span className="hidden sm:inline">Java · Spring Boot · Microservices</span>
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to work
        </span>
      </div>

      {/* Real brand logos on floating tiles framing the poster: Spring top-left, Docker middle-right, Keycloak bottom-left */}
      {/* Each token drifts at its own speed on scroll, so they read as floating at different depths. */}
      <HeroParallax y={[0, -160]} className="absolute left-[3%] top-[7%] z-[5] w-14 sm:left-[5%] sm:top-[9%] sm:w-20 lg:w-24">
        <LogoBadge src="/logos/tech/spring.svg" label="Spring" tilt={-12} className="w-full" />
      </HeroParallax>
      <HeroParallax y={[0, -260]} className="absolute right-[2%] top-[42%] z-[5] w-14 sm:right-[4%] sm:w-20 lg:w-28 lg:short:right-[3%] lg:short:top-[37%] lg:short:w-20">
        <LogoBadge src="/logos/tech/docker.svg" label="Docker" tilt={10} delay={1.3} padding="7%" className="w-full" />
      </HeroParallax>
      <HeroParallax y={[0, 30]} className="absolute bottom-[6%] left-[3%] z-[5] hidden w-14 sm:block sm:w-20 lg:short:w-16">
        <LogoBadge src="/logos/tech/keycloak.svg" label="Keycloak" tilt={-8} delay={2.6} className="w-full" />
      </HeroParallax>

      <div className="relative mx-auto max-w-7xl">
        {/* The name leads the heading for search engines and screen readers; on screen it is set beside the portrait instead. */}
        <h1 className="relative z-0 mt-8 text-center font-display uppercase sm:mt-10 lg:short:mt-6">
          <span className="sr-only">{PROFILE.name}, </span>
          {/* Viga is a wide face, so these sizes run ~25% smaller than a condensed display font would need. */}
          <HeroParallax
            as="span"
            x={["0%", "-14%"]}
            distance={700}
            className="block text-[clamp(2.5rem,12.5vw,9.25rem)] leading-[0.9] tracking-[-0.01em] lg:short:text-[min(9.25rem,16vh)]"
          >
            <SplitText text="Backend" trigger="load" delay={0.1} stagger={0.045} />
          </HeroParallax>
          <HeroParallax
            as="span"
            x={["0%", "14%"]}
            distance={700}
            className="text-outline mt-1 block text-[clamp(2.75rem,15.5vw,11.25rem)] leading-[0.92] tracking-[-0.005em] sm:mt-2 lg:short:text-[min(11.25rem,19.5vh)]"
          >
            <SplitText text="Developer" trigger="load" delay={0.35} stagger={0.045} />
          </HeroParallax>
        </h1>

        {/*
          Portrait row. The negative top margin pulls the cut-out up over the lower half
          of the outlined line, so the letters sit behind the head and shoulders.
          To change the photo, drop the new file at /public/images/heak-editorial.png
          (see PROFILE.photo in src/data/portfolio.ts); Portrait falls back to heak-cutout.png.
          On laptop-height screens (`short:`) the portrait column narrows so the whole hero fits above the fold.
        */}
        <div className="pointer-events-none relative z-10 -mt-[14vw] grid grid-cols-1 items-end sm:-mt-[clamp(6rem,12.5vw,8rem)] lg:grid-cols-[1fr_minmax(0,460px)_1fr] lg:gap-6 lg:short:grid-cols-[1fr_minmax(0,380px)_1fr]">
          <Enter delay={0.15} fade={false} className="pointer-events-auto mx-auto w-[78vw] max-w-[380px] lg:order-2 lg:w-full lg:max-w-[460px] lg:short:max-w-[380px]">
            <HeroParallax y={[0, 70]}>
              <Portrait />
            </HeroParallax>
          </Enter>

          <Enter delay={0.35} className="pointer-events-auto order-3 mt-2 flex flex-col items-center gap-5 pb-10 lg:order-1 lg:mt-0 lg:items-start lg:pb-40 lg:short:pb-32">
            <span className="hidden lg:block">
              <DownArrow />
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:flex-col lg:items-start">
              <Magnetic>
                <a
                  href="#projects"
                  className="rounded-full bg-fill px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-on-fill shadow-[4px_4px_0px_var(--color-accent)] transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-fill-hover hover:shadow-[5px_5px_0px_var(--color-accent)] active:translate-y-[2px] active:shadow-[2px_2px_0px_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  View projects
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 border-b-2 border-ink pb-0.5 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Résumé
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
            </div>

            {/* Direct lines to reach out without scrolling to Contact */}
            <ul aria-label="Contact links" className="flex items-center gap-2">
              {heroContacts.map((c) => {
                const Icon = CONTACT_ICONS[c.id]!;
                const external = c.href.startsWith("https://");
                return (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      aria-label={c.id === "email" ? `Email ${c.handle}` : `${c.label}: ${c.handle}`}
                      title={c.label}
                      className={iconLink}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Enter>

          <Enter delay={0.6} className="pointer-events-auto order-2 -mt-6 text-center lg:order-3 lg:mt-0 lg:pb-24 lg:text-right lg:short:pb-20">
            {/* Already announced as part of the h1, so hidden here to avoid reading the name twice. */}
            <p aria-hidden="true" className="font-display text-[clamp(2.5rem,11vw,3.25rem)] uppercase leading-[0.9] lg:text-[clamp(3rem,4.6vw,4.25rem)] lg:short:text-[clamp(2.75rem,4vw,3.5rem)]">
              <SplitText text="Pheng" trigger="load" delay={0.7} className="block" />
              <SplitText text="Mengheak" trigger="load" delay={0.85} className="block" />
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {PROFILE.title} · <span className="text-accent-ink">{PROFILE.role2}</span>
            </p>
            <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-relaxed text-muted sm:text-[15px] lg:mr-0">{PROFILE.pitch}</p>
          </Enter>
        </div>
      </div>
    </header>
  );
}
