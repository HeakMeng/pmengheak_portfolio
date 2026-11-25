import Dock from "@/components/poster/Dock";
import Hero from "@/components/poster/Hero";
import { About, Background, Projects, WorkExperience } from "@/components/poster/Sections";
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
      <Hero />

      {/* One white sheet laid over the bottom of the illustration, like a page clipped onto a sketchbook cover */}
      <main className="relative z-10 mx-3 -mt-24 sm:mx-6 sm:-mt-32">
        <div className="mx-auto max-w-[1760px] rounded-[2.25rem] bg-paper px-5 pb-16 pt-10 shadow-[0_-20px_60px_-40px_rgba(36,32,90,0.5)] sm:px-10 sm:pt-14 lg:px-14 xl:px-20">
          <About />
          <Background />
          <WorkExperience />
          <Projects />
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-32 pt-16 text-center sm:px-10">
        <p className="font-hand text-3xl text-muted">Let&rsquo;s build something</p>
        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-2 inline-block break-all font-display text-[clamp(1.5rem,5vw,3rem)] font-extrabold leading-tight text-ink underline-offset-8 transition-colors hover:text-accent-ink hover:underline"
        >
          {PROFILE.email}
        </a>
        <p className="mt-8 text-sm text-muted">
          © 2026 {PROFILE.name}, {PROFILE.location}
        </p>
      </footer>

      <Dock />
    </>
  );
}
