import Dock from "@/components/poster/Dock";
import { ScrollProgress } from "@/components/fx/Misc";
import Hero from "@/components/poster/Hero";
import {
  About,
  Capabilities,
  EducationContact,
  Projects,
  Skills,
  WorkExperience,
} from "@/components/poster/Sections";
import Ticker from "@/components/poster/Ticker";
import { CHANNELS, CORE_SKILLS, EDUCATION, PROFILE } from "@/data/portfolio";

/** schema.org Person, so search engines can tie the name to this site and the linked profiles. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: [PROFILE.title, PROFILE.role2],
  url: PROFILE.site,
  image: `${PROFILE.site}${PROFILE.photo}`,
  email: `mailto:${PROFILE.email}`,
  address: { "@type": "PostalAddress", addressLocality: PROFILE.city, addressCountry: "KH" },
  sameAs: CHANNELS.filter((c) => c.href.startsWith("https://")).map((c) => c.href),
  alumniOf: EDUCATION.map((e) => ({ "@type": "EducationalOrganization", name: e.org })),
  knowsAbout: CORE_SKILLS,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so no string in the data can close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <ScrollProgress />
      <Hero />
      <Ticker />
      <main>
        <About />
        <EducationContact />
        <WorkExperience />
        <Capabilities />
        <Skills />
        <Projects />
      </main>

      {/* Footer fades from the paper into the deeper blueprint blue. */}
      <footer className="mt-16 bg-linear-to-b from-transparent to-tint sm:mt-24">
        <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
          <div className="border-t-2 border-edge pt-10 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Open to backend roles &amp; collaborations</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-3 inline-block break-all font-display text-[clamp(1.6rem,6vw,3.75rem)] uppercase leading-none text-ink transition-colors hover:text-accent-ink"
            >
              {PROFILE.email}
            </a>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:flex-row">
            <p>© 2026 {PROFILE.name}</p>
            <p>{PROFILE.location}</p>
          </div>
        </div>
      </footer>

      <Dock />
    </>
  );
}
