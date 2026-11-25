import {
  ArrowLeftRight,
  Bot,
  Cpu,
  Database,
  FileText,
  FileUp,
  Globe,
  Languages,
  Layers,
  Lock,
  Play,
  Presentation,
  Quote,
  School,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SiYoutube } from "react-icons/si";
import SmartImage from "@/components/SmartImage";
import { CoverBackdrop, diagramGrid, Flow, INK, ModuleGrid, Node, type Module } from "./showcase-kit";

/* ---------------- Cover ---------------- */

/** Lecture material going in: the formats InsightHub reads. */
const SOURCES = [
  { label: "PPTX", color: "#D24726" },
  { label: "PDF", color: "#E1232E" },
  { label: "DOCX", color: "#2B579A" },
  { label: "MP3", color: "#7A4FD6" },
];

/** Where an answer came from: slide, page or timestamp. */
const CITES = [
  { icon: Presentation, label: "Slide 12" },
  { icon: FileText, label: "p. 4" },
  { icon: Play, label: "03:15" },
];

/**
 * The web app on a laptop, the real Android app on a phone, the AI tutor answering with citations,
 * and the file types it learns from. Sized in container units, like the SnapPOS cover.
 */
export function InsightHubCover({ label, sizes }: { label: string; sizes: string }) {
  return (
    <CoverBackdrop label={label}>
      {/* Laptop with the real web app */}
      <div className="absolute left-[4%] top-[8%] w-[64%]" aria-hidden="true">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.6cqw] border-[0.7cqw] border-b-0 border-[#24205A] bg-white">
          <SmartImage src="/projects/InsightHub.png" alt="" fill sizes={sizes} className="object-cover object-left-top" />
        </div>
        <div className="-mx-[5%] h-[2.2cqw] rounded-b-[1.4cqw] border-[0.35cqw] border-[#24205A] bg-[#C9D6E6]" />
      </div>

      {/* Phone with the real Android app */}
      <div
        className="absolute right-[5%] top-[6%] aspect-[440/956] w-[20.5%] overflow-hidden rounded-[2.6cqw] border-[0.7cqw] border-[#24205A] bg-white shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <SmartImage src="/projects/insighthub-android.png" alt="" fill sizes="(min-width: 1024px) 200px, 25vw" className="object-cover object-top" />
      </div>

      {/* AI tutor answering with sources */}
      <div
        className="absolute bottom-[5%] left-[45%] w-[28%] rotate-2 rounded-[1.8cqw] border-[0.5cqw] border-[#24205A] bg-white p-[1.4cqw] shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <div className="flex items-center gap-[0.8cqw] text-[1.4cqw] font-semibold leading-none text-[#24205A]">
          <span className="flex h-[3cqw] w-[3cqw] items-center justify-center rounded-full bg-[#2D8DD6] text-white">
            <Bot className="h-[1.8cqw] w-[1.8cqw]" />
          </span>
          AI tutor
        </div>
        <p className="ml-auto mt-[1cqw] w-fit max-w-[85%] rounded-[1.2cqw] rounded-br-[0.3cqw] bg-[#FDE7F0] px-[1.1cqw] py-[0.8cqw] text-[1.25cqw] leading-tight text-[#24205A]">
          What does chlorophyll do?
        </p>
        <div className="mt-[1cqw] space-y-[0.6cqw]">
          <span className="block h-[0.8cqw] w-[95%] rounded-full bg-[#24205A]/60" />
          <span className="block h-[0.8cqw] w-[80%] rounded-full bg-[#24205A]/60" />
          <span className="block h-[0.8cqw] w-[55%] rounded-full bg-[#24205A]/30" />
        </div>
        <div className="mt-[1.1cqw] flex flex-wrap gap-[0.6cqw]">
          {CITES.map(({ icon: I, label: l }) => (
            <span key={l} className="flex items-center gap-[0.4cqw] whitespace-nowrap rounded-full bg-[#EAF4FC] px-[0.8cqw] py-[0.5cqw] text-[1.1cqw] font-semibold leading-none text-[#1F74B8]">
              <I className="h-[1.2cqw] w-[1.2cqw]" />
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Lecture files going in */}
      <div className="absolute bottom-[6%] left-[4%] flex items-center gap-[0.9cqw]" aria-hidden="true">
        <span className="flex h-[4.6cqw] w-[4.6cqw] items-center justify-center rounded-[1.2cqw] border-[0.4cqw] border-[#24205A] bg-white text-[#24205A]">
          <FileUp className="h-[2.6cqw] w-[2.6cqw]" />
        </span>
        {SOURCES.map((s) => (
          <span
            key={s.label}
            className="flex h-[4.6cqw] items-center rounded-[1.2cqw] border-[0.4cqw] border-[#24205A] px-[1cqw] text-[1.4cqw] font-extrabold leading-none text-white"
            style={{ backgroundColor: s.color }}
          >
            {s.label}
          </span>
        ))}
        <span className="flex h-[4.6cqw] items-center rounded-[1.2cqw] border-[0.4cqw] border-[#24205A] bg-white px-[1cqw]">
          <SiYoutube className="h-[2.4cqw] w-[2.4cqw]" color="#FF0000" />
        </span>
      </div>
    </CoverBackdrop>
  );
}

/* ---------------- Case-study body ---------------- */

const MODULES: Module[] = [
  { icon: FileUp, color: "#2D8DD6", title: "Upload anything", text: "Lecture slides, PDFs, Word files, audio, video and YouTube links go into one classroom workspace." },
  { icon: Quote, color: "#E9488A", title: "Cited answers", text: "Summaries and tutor answers point back to the exact slide, page or timestamp they came from." },
  { icon: Layers, color: "#D9861A", title: "Quizzes and flashcards", text: "Generated from the class's own material, ready for revision." },
  { icon: Languages, color: "#7A4FD6", title: "Multilingual tutor", text: "An AI tutor students can question in more than one language." },
  { icon: Lock, color: "#1E7A3C", title: "Private and local", text: "Retrieval and answers run on local models through Ollama, filtered to each classroom and workspace." },
  { icon: School, color: "#336791", title: "School admin", text: "Bulk Excel student import with validation and preview, plus automated welcome emails." },
];

export function InsightHubDetails() {
  return (
    <>
      <ModuleGrid modules={MODULES} />

      <section className="mt-10">
        <h4 className="text-lg font-semibold">How it fits together</h4>
        <p className="mt-1 text-sm text-muted">One backend serves the web and Android apps, and the AI pipeline runs entirely on local models.</p>

        <div className={`mt-5 ${diagramGrid}`}>
          <div className="space-y-3">
            <Node icon={Globe} color={INK} title="Web app">
              Next.js classrooms and the admin dashboard
            </Node>
            <Node icon={Smartphone} color="#3DDC84" title="Android app">
              Workspaces, classrooms and the tutor on mobile
            </Node>
          </div>

          <Flow />

          <div className="rounded-2xl bg-tint p-4">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-ink" aria-hidden="true" />
              <p className="font-semibold text-ink">Spring Boot API</p>
            </div>
            <p className="mt-1 text-sm text-muted">Multi-module backend</p>
            <p className="mt-3 flex items-start gap-1.5 text-sm text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
              Keycloak (OAuth2/OIDC, JWT) with MFA, password policies and audit logs
            </p>
          </div>

          <Flow />

          <Node icon={Database} color="#336791" title="PostgreSQL + pgvector">
            Course data and the embeddings the tutor searches
          </Node>
        </div>

        {/* The local AI pipeline the API calls into */}
        <div className={`mt-3 ${diagramGrid}`}>
          <div className="lg:col-span-3 lg:col-start-3">
            <span className="mb-3 flex justify-center text-pink lg:justify-start lg:pl-[20%]" aria-hidden="true">
              <ArrowLeftRight className="h-6 w-6 rotate-90" />
            </span>
            <div className="relative rounded-[1.5rem] border-2 border-dashed border-line p-4 pt-7">
              <span className="absolute -top-3.5 left-5 rounded-full bg-paper px-3 font-hand text-2xl leading-none text-accent-ink">fully local AI</span>
              <div className="grid items-center gap-3 lg:grid-cols-[1fr_2rem_0.8fr]">
                <Node icon={Bot} color="#009688" title="FastAPI RAG service">
                  Retrieves within the classroom&rsquo;s scope and cites the slide, page or timestamp
                </Node>
                <span className="flex justify-center text-pink" aria-hidden="true">
                  <ArrowLeftRight className="h-6 w-6 rotate-90 lg:rotate-0" />
                </span>
                <Node icon={Cpu} color="#24242B" title="Ollama">
                  Local language models
                </Node>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
