import { PROFILE } from "@/data/portfolio";
import SeaScene from "./SeaScene";

/**
 * Picture-book hero: a rounded illustrated card (sky, sea, a container boat, a lighthouse) with the
 * title set huge and two-tone on a soft paper label, like the cover of a sketchbook.
 * The white About sheet below overlaps the bottom of this card.
 */
export default function Hero() {
  return (
    <header id="top" className="px-3 pt-3 sm:px-6 sm:pt-6">
      <div className="relative mx-auto min-h-[600px] max-w-[1760px] overflow-hidden rounded-[2.25rem] ring-1 ring-ink/10 sm:min-h-[640px] xl:min-h-[700px] lg:short:min-h-[560px]">
        <SeaScene className="absolute inset-0 h-full w-full" />

        <div className="relative z-10 flex flex-col items-start px-5 pt-5 sm:px-10 sm:pt-8 xl:px-16">
          <p className="text-sm font-medium text-ink sm:text-base">{PROFILE.name}</p>

          {/* Title on a paper label so it stays readable over the illustration */}
          <div className="hero-rise mt-6 rounded-[1.75rem] bg-paper/85 px-5 pb-4 pt-5 shadow-[0_18px_40px_-24px_rgba(36,32,90,0.45)] backdrop-blur-sm sm:mt-10 sm:px-8 sm:pb-5 sm:pt-7">
            <h1 className="font-display text-[clamp(4.25rem,15vw,9.5rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.03em]">
              <span className="sr-only">{PROFILE.name}, {PROFILE.title}. </span>
              <span aria-hidden="true" className="block text-ink">Port</span>
              <span aria-hidden="true" className="block text-accent">folio</span>
            </h1>
            <div className="mt-3 flex items-end justify-between gap-6">
              <p className="text-base font-medium text-ink sm:text-lg">{PROFILE.title}</p>
              <p aria-hidden="true" className="-rotate-6 font-hand text-3xl font-bold leading-none text-ink sm:text-4xl">2026</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
