import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDownRight, ArrowRight, Send } from "lucide-react";

const TICKER = [
  "Java", "Spring Boot", "Microservices", "REST APIs", "PostgreSQL", "MySQL", "MongoDB", "Docker",
  "Linux", "Nginx", "Keycloak", "OAuth 2.0", "JWT", "FastAPI", "Ollama", "LangChain", "Next.js",
];

/** Badges that travel an elliptical orbit around the portrait, evenly spaced. */
const ORBIT = [
  { name: "Java", icon: "/images/java.svg" },
  { name: "Spring Boot", icon: "/images/spring.svg" },
  { name: "Docker", icon: "/images/docker.svg" },
  { name: "Ollama", icon: "/images/ollama.png" },
  { name: "FastAPI", icon: "/images/fastapi.svg" },
  { name: "Git", icon: "/images/git.svg" },
];

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh flex-col overflow-hidden pt-16">
      <div id="overview" className="pointer-events-none absolute left-0 top-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-8">
        {/* Stage: portrait with an orbit of tech badges */}
        <div className="mt-6 flex justify-center">
          <div className="hero-exit relative aspect-[4/5] h-[clamp(380px,62svh,660px)] max-w-[calc(100vw-3rem)]">
            {/* Halo behind the head drifts with the pointer */}
            <div className="px absolute left-[6%] top-[2%] aspect-square w-[88%]" style={{ "--k": 14 } as CSSProperties} aria-hidden="true">
              <div className="halo absolute inset-0 rounded-full" />
            </div>
            {/* Orbit track passes behind the portrait... */}
            <div className="orbit-system" aria-hidden="true">
              <div className="orbit-track" />
            </div>
            <Image
              src="/images/heak-cutout.png"
              alt="Portrait of Pheng Mengheak, Backend Developer, wearing a light blue Korea Software HRD Center shirt"
              fill
              priority
              sizes="(min-width: 768px) 528px, 90vw"
              className="portrait portrait-fade object-contain object-bottom"
            />
            {/* ...while the badges ride in front of it */}
            <div className="orbit-system z-10">
              <ul className="orbit-rotor" aria-label="Core technologies">
                {ORBIT.map(({ name, icon }, i) => (
                  <li key={name} className="orbit-arm" style={{ "--a": `${(360 / ORBIT.length) * i}deg` } as CSSProperties}>
                    <span className="orbit-pill inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel py-1.5 pl-1.5 pr-3.5 text-xs text-fg shadow-[0_8px_20px_-12px_rgba(11,18,32,0.4)] sm:text-sm">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg">
                        <Image src={icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                      </span>
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Name sits over the faded lower half of the portrait */}
        <h1 className="hero-name relative z-20 -mt-[clamp(4.5rem,11vw,9.5rem)] text-center uppercase text-fg">
          <span className="mask-line">
            <span style={delay(0)}>
              Pheng <br className="md:hidden" />
              Mengheak<span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <div className="rise mt-7 flex flex-col items-center gap-8 pb-12 text-center" style={delay(6)}>
          <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Backend engineer building <span className="text-fg">Java &amp; Spring Boot microservices</span>, secure
            APIs, and scalable distributed systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <a
              href="#systems"
              className="group inline-flex items-center gap-3 rounded-full bg-fg px-7 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bg transition-[background-color,color,box-shadow] duration-300 hover:bg-accent hover:text-white hover:shadow-[0_14px_30px_-12px_rgba(47,91,255,0.8)]"
            >
              View projects
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="/pmengheak.pdf"
              download="pmengheak.pdf"
              className="group inline-flex items-center gap-2 rounded-full border border-fg/20 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fg transition-colors hover:border-accent hover:text-accent-ink"
            >
              Résumé
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="https://t.me/pmengheak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram @pmengheak"
              className="group inline-flex items-center gap-2 py-1 font-mono text-xs text-muted transition-colors hover:text-accent-ink"
            >
              <Send className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              @pmengheak
            </a>
          </div>
        </div>
      </div>

      {/* Tech ticker */}
      <div className="marquee relative z-10 overflow-hidden border-y border-line bg-panel py-4" aria-label="Core technologies">
        <ul className="marquee-track">
          {[0, 1].map((copy) =>
            TICKER.map((name) => (
              <li
                key={`${copy}-${name}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="display flex items-center whitespace-nowrap pr-8 text-xl text-fg/70 sm:text-2xl"
              >
                {name}
                <span className="ml-8 text-sm text-accent" aria-hidden="true">✦</span>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
