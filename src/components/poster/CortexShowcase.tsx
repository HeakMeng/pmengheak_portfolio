import {
  BookOpen,
  Database,
  Globe,
  MessageCircleQuestionMark,
  MessagesSquare,
  Mic,
  SendHorizontal,
  Server,
  Sparkles,
  Trophy,
  Video,
} from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { CoverBackdrop, diagramGrid, Flow, INK, ModuleGrid, Node, type Module } from "./showcase-kit";

/* ---------------- Cover ---------------- */

/** Study-group call tiles: placeholder initials, not real people. */
const CALL = [
  { initial: "S", color: "#2D8DD6" },
  { initial: "K", color: "#E9488A" },
  { initial: "D", color: "#D9861A" },
  { initial: "M", color: "#1E7A3C" },
];

/** The Cortex "C" mark, simplified. */
function CortexMark({ className }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-full bg-[#24205A] font-extrabold leading-none text-white ${className ?? ""}`}>C</span>
  );
}

/**
 * The web app on a laptop, Cortex Copilot answering a real question on a phone, and a study-group
 * video call. Sized in container units, like the other project covers.
 */
export function CortexCover({ label, sizes }: { label: string; sizes: string }) {
  return (
    <CoverBackdrop label={label}>
      {/* Laptop with the real web app */}
      <div className="absolute left-[4%] top-[8%] w-[64%]" aria-hidden="true">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.6cqw] border-[0.7cqw] border-b-0 border-[#24205A] bg-white">
          <SmartImage src="/projects/cortex.png" alt="" fill sizes={sizes} className="object-cover object-left-top" />
        </div>
        <div className="-mx-[5%] h-[2.2cqw] rounded-b-[1.4cqw] border-[0.35cqw] border-[#24205A] bg-[#C9D6E6]" />
      </div>

      {/* Phone: chatting with Cortex Copilot */}
      <div
        className="absolute right-[5%] top-[6%] flex aspect-[9/19.5] w-[21%] flex-col overflow-hidden rounded-[2.6cqw] border-[0.7cqw] border-[#24205A] bg-white shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <div className="mx-auto mt-[0.8cqw] h-[1.2cqw] w-[32%] rounded-full bg-[#24205A]" />
        <div className="flex items-center gap-[0.5cqw] border-b-[0.2cqw] border-[#E6ECF3] px-[0.9cqw] pb-[1cqw] pt-[1cqw] text-[#24205A]">
          <CortexMark className="h-[2.6cqw] w-[2.6cqw] shrink-0 text-[1.5cqw]" />
          <span className="whitespace-nowrap text-[1.15cqw] font-semibold leading-none">Cortex Copilot</span>
          <span className="ml-auto rounded-full bg-[#EAF4FC] px-[0.5cqw] py-[0.35cqw] text-[0.75cqw] font-bold leading-none tracking-wide text-[#1F74B8]">
            AGENT
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-[1cqw] p-[1.1cqw]">
          <p className="ml-auto max-w-[85%] rounded-[1.2cqw] rounded-br-[0.3cqw] bg-[#24205A] px-[1cqw] py-[0.8cqw] text-[1.1cqw] leading-snug text-white">
            What&rsquo;s the difference between Spring Boot and Java?
          </p>
          <div className="flex items-start gap-[0.6cqw]">
            <CortexMark className="mt-[0.2cqw] h-[2.2cqw] w-[2.2cqw] shrink-0 text-[1.2cqw]" />
            <div className="rounded-[1.2cqw] rounded-tl-[0.3cqw] bg-[#F1F6FB] px-[1cqw] py-[0.9cqw] text-[1.05cqw] leading-snug text-[#24205A]">
              <p>Java is the language. Spring Boot is a framework built on top of it.</p>
              <p className="mt-[0.6cqw]">
                <b>Java:</b> the core building block.
              </p>
              <p className="mt-[0.3cqw]">
                <b>Spring Boot:</b> sets up the configuration for you.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-[0.5cqw] pl-[2.8cqw]">
            {["Dependency management", "Spring core"].map((s) => (
              <span key={s} className="whitespace-nowrap rounded-full border-[0.2cqw] border-[#2D8DD6] px-[0.7cqw] py-[0.4cqw] text-[0.95cqw] font-medium leading-none text-[#1F74B8]">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-[0.6cqw] rounded-full bg-[#F1F6FB] py-[0.7cqw] pl-[1.1cqw] pr-[0.5cqw]">
            <span className="flex-1 text-[1.05cqw] leading-none text-[#5C6079]">Ask Copilot&hellip;</span>
            <span className="flex h-[2.4cqw] w-[2.4cqw] items-center justify-center rounded-full bg-[#2D8DD6] text-white">
              <SendHorizontal className="h-[1.3cqw] w-[1.3cqw]" />
            </span>
          </div>
        </div>
      </div>

      {/* Study-group video call */}
      <div
        className="absolute bottom-[5%] left-[3%] w-[21%] -rotate-2 overflow-hidden rounded-[1.8cqw] border-[0.5cqw] border-[#24205A] bg-[#24205A] shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <div className="flex items-center gap-[0.6cqw] px-[1.2cqw] py-[0.9cqw] text-[1.3cqw] font-semibold leading-none text-white">
          <span className="h-[1cqw] w-[1cqw] rounded-full bg-[#3DDC84]" />
          Study group
        </div>
        <div className="grid grid-cols-2 gap-[0.5cqw] px-[0.6cqw]">
          {CALL.map((c) => (
            <span key={c.initial} className="flex aspect-[4/3] items-center justify-center rounded-[0.8cqw]" style={{ backgroundColor: c.color }}>
              <span className="flex h-[3.4cqw] w-[3.4cqw] items-center justify-center rounded-full bg-white/90 text-[1.6cqw] font-bold text-[#24205A]">
                {c.initial}
              </span>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-center gap-[1cqw] py-[1cqw] text-white">
          <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-full bg-white/15">
            <Mic className="h-[1.4cqw] w-[1.4cqw]" />
          </span>
          <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-full bg-white/15">
            <Video className="h-[1.4cqw] w-[1.4cqw]" />
          </span>
          <span className="flex h-[2.6cqw] items-center rounded-full bg-[#E1232E] px-[1.2cqw] text-[1.1cqw] font-semibold leading-none">Leave</span>
        </div>
      </div>
    </CoverBackdrop>
  );
}

/* ---------------- Case-study body ---------------- */

const MODULES: Module[] = [
  { icon: MessageCircleQuestionMark, color: "#2D8DD6", title: "Ask the community", text: "Students post technical questions and get answers from each other." },
  { icon: Sparkles, color: INK, title: "Cortex Copilot", text: "A conversational AI study assistant built into the learning flow." },
  { icon: MessagesSquare, color: "#E9488A", title: "Group chat", text: "Real-time chat so study groups can work through problems together." },
  { icon: Video, color: "#1E7A3C", title: "Video calls", text: "Study groups can jump from chat into a call without leaving the app." },
  { icon: BookOpen, color: "#D9861A", title: "Course material", text: "Curriculum indexing and structured navigation, with search across course material." },
  { icon: Trophy, color: "#7A4FD6", title: "Leaderboard and events", text: "A community leaderboard alongside events and hackathons." },
];

export function CortexDetails() {
  return (
    <>
      <ModuleGrid modules={MODULES} />

      <section className="mt-10">
        <h4 className="text-lg font-semibold">How it fits together</h4>
        <p className="mt-1 text-sm text-muted">A Spring Boot REST backend behind a Next.js client, with every service containerized.</p>

        <div className="relative mt-5 rounded-[1.75rem] border-2 border-dashed border-line p-4 pt-8 sm:p-6 sm:pt-9">
          <span className="absolute -top-3.5 left-5 rounded-full bg-paper px-3 font-hand text-2xl leading-none text-accent-ink">in Docker</span>

          <div className={diagramGrid}>
            <Node icon={Globe} color={INK} title="Web app">
              Next.js client for questions, chat, calls and Copilot
            </Node>

            <Flow />

            <div className="rounded-2xl bg-tint p-4">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-ink" aria-hidden="true" />
                <p className="font-semibold text-ink">Spring Boot REST API</p>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                <li className="flex items-center gap-1.5">
                  <MessagesSquare className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                  Questions, group chat and video calls
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                  Copilot study assistant
                </li>
                <li className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                  Course-material search endpoints
                </li>
              </ul>
            </div>

            <Flow />

            <Node icon={Database} color="#336791" title="PostgreSQL">
              Connection pooling and the curriculum index the search reads
            </Node>
          </div>
        </div>
      </section>
    </>
  );
}
