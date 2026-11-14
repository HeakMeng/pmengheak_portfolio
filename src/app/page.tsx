import { Award, Briefcase, FolderGit2, GraduationCap, Layers, Send, Sparkles, UserRound } from "lucide-react";
import Connect from "@/components/Connect";
import LanyardBadge from "@/components/LanyardBadge";
import { Stagger, StaggerItem } from "@/components/Motion";
import RetroMonitor from "@/components/RetroMonitor";
import {
  Achievements,
  Bio,
  CoreSkills,
  Education,
  Experience,
  Heading,
  Projects,
  TechStack,
} from "@/components/Sections";
import { PROFILE } from "@/data/portfolio";

const icon = "h-4 w-4";

export default function Home() {
  return (
    <main className="px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
      <RetroMonitor />

      <div className="relative mx-auto mt-10 max-w-5xl rounded-[2.5rem] border border-slate-200/90 bg-white p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.07)] sm:mt-12 sm:p-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: identity & skills */}
          <Stagger className="space-y-12 lg:col-span-5">
            <StaggerItem id="about" labelledBy="about-h">
              <Heading id="about-h" icon={<UserRound className={icon} />}>
                Behind the Architecture
              </Heading>
              <Bio />
            </StaggerItem>

            <StaggerItem id="connect" labelledBy="connect-h" className="scroll-mt-8">
              <Heading id="connect-h" icon={<Send className={icon} />}>
                Let&apos;s Connect
              </Heading>
              <div className="mt-4">
                <Connect />
              </div>
            </StaggerItem>

            <StaggerItem id="education" labelledBy="education-h">
              <Heading id="education-h" icon={<GraduationCap className={icon} />}>
                Education &amp; Training
              </Heading>
              <Education />
            </StaggerItem>

            <StaggerItem id="skills" labelledBy="skills-h">
              <Heading id="skills-h" icon={<Sparkles className={icon} />}>
                Core Technical Skills
              </Heading>
              <CoreSkills />
            </StaggerItem>

            <StaggerItem id="stack" labelledBy="stack-h">
              <Heading id="stack-h" icon={<Layers className={icon} />}>
                Tech Stack &amp; Software
              </Heading>
              <TechStack />
            </StaggerItem>
          </Stagger>

          {/* RIGHT: ID badge, experience, projects (first on mobile so the badge leads) */}
          <Stagger className="order-first space-y-12 lg:order-none lg:col-span-7">
            <StaggerItem id="badge" labelledBy="badge-h">
              <h2 id="badge-h" className="sr-only">
                {PROFILE.name} ID badge
              </h2>
              <LanyardBadge />
            </StaggerItem>

            <StaggerItem id="experience" labelledBy="experience-h">
              <Heading id="experience-h" icon={<Briefcase className={icon} />}>
                Experience
              </Heading>
              <Experience />
            </StaggerItem>

            <StaggerItem id="projects" labelledBy="projects-h" className="scroll-mt-8">
              <Heading id="projects-h" icon={<FolderGit2 className={icon} />}>
                Featured Projects
              </Heading>
              <Projects />
            </StaggerItem>
          </Stagger>
        </div>

        {/* Bottom horizontal bar */}
        <Stagger className="mt-14 border-t border-slate-200 pt-10">
          <StaggerItem id="achievements" labelledBy="achievements-h">
            <Heading id="achievements-h" icon={<Award className={icon} />}>
              Achievements &amp; Certifications
            </Heading>
            <Achievements />
          </StaggerItem>
        </Stagger>
      </div>

      <footer className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-2 px-2 font-mono text-[11px] text-slate-400 sm:flex-row">
        <p>© 2026 {PROFILE.name} · Phnom Penh, Cambodia</p>
        <p className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
          GET / → 200 OK
        </p>
      </footer>
    </main>
  );
}
