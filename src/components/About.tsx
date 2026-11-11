import Image from "next/image";
import { Bot, Database, Server } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const FOCUS_AREAS = [
  {
    icon: Server,
    title: "Backend Engineering",
    text: "Java and Spring Boot services, REST API design, microservices, and API security with OAuth2 and Keycloak.",
    tags: ["Java", "Spring Boot", "REST APIs", "Keycloak"],
  },
  {
    icon: Database,
    title: "Databases & Infrastructure",
    text: "PostgreSQL and MySQL design, plus Linux server monitoring and backup routines from my internship, with Docker for deployment.",
    tags: ["PostgreSQL", "MySQL", "Docker", "Linux"],
  },
  {
    icon: Bot,
    title: "AI-Powered Applications",
    text: "Exploring local LLMs with Ollama, RAG architectures, and LangChain as an additional learning area in my training.",
    tags: ["Ollama", "RAG", "LangChain"],
  },
];

const FACTS = [
  { value: "3", label: "Full-stack projects" },
  { value: "2025", label: "Linux & systems internship" },
  { value: "UTC+7", label: "Phnom Penh, Cambodia" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-20 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          label="About"
          titleId="about-heading"
          title={
            <>
              From databases and servers to backend engineering<span className="text-accent-ink">.</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Full-colour portrait card */}
          <figure data-tilt="3" className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-accent/15 via-panel to-panel">
              <Image
                src="/images/heak-cutout.png"
                alt="Pheng Mengheak"
                fill
                sizes="(min-width: 1024px) 460px, 384px"
                className="object-contain object-bottom"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel/90 px-4 py-3 backdrop-blur">
              <span>
                <span className="display block text-lg text-fg">Pheng Mengheak</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Backend Developer</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-signal">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                Available
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
              <p>
                I started on the infrastructure side: as an{" "}
                <span className="text-fg">IT &amp; Systems Intern at Proseth Solutions</span> I maintained client
                database integrity, monitored Linux servers, and ran scheduled backups. That work pointed me toward
                backend engineering, where I could build the services that sit on top of that data.
              </p>
              <p>
                Today I&apos;m a <span className="text-fg">Software Development Trainee at Korea Software HRD Center</span>,
                working with Java, Spring Boot microservices, REST APIs, and Docker, while studying Management
                Information Systems at SETEC Institute. I care about reliable services: clear architecture, secure APIs,
                and deployments that are simple to run.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
              {FACTS.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse gap-1 px-4 py-5 first:pl-0">
                  <dt className="text-xs text-muted sm:text-sm">{label}</dt>
                  <dd className="display text-3xl text-accent-ink sm:text-4xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {FOCUS_AREAS.map(({ icon: Icon, title, text, tags }, i) => (
            <li key={title} data-tilt="3" className="spotlight group flex flex-col bg-bg p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="outline-num text-6xl" aria-hidden="true">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl text-fg">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{text}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label={`${title} technologies`}>
                {tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
