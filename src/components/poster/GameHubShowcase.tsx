import { ArrowUpDown, Braces, Gamepad2, Globe, LayoutGrid, Palette, Search, Server, SlidersHorizontal, Star, Tags } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { CoverBackdrop, Flow, INK, ModuleGrid, Node, type Module } from "./showcase-kit";

/* ---------------- Cover ---------------- */

const GENRES = [
  { label: "Action", on: true },
  { label: "RPG", on: false },
  { label: "Shooter", on: true },
  { label: "Indie", on: false },
  { label: "Racing", on: false },
];

/** The three sort orders the API supports. */
const SORTS = ["Relevance", "Release date", "Rating"];

/**
 * The real catalog on a laptop, the genre and sort controls the API backs, a search bar and a
 * game-details card. Sized in container units, like the other project covers.
 */
export function GameHubCover({ label, sizes }: { label: string; sizes: string }) {
  return (
    <CoverBackdrop label={label}>
      {/* Laptop with the real catalog */}
      <div className="absolute left-[4%] top-[8%] w-[64%]" aria-hidden="true">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.6cqw] border-[0.7cqw] border-b-0 border-[#24205A] bg-[#151515]">
          <SmartImage src="/projects/gamehub.png" alt="" fill sizes={sizes} className="object-cover object-left-top" />
        </div>
        <div className="-mx-[5%] h-[2.2cqw] rounded-b-[1.4cqw] border-[0.35cqw] border-[#24205A] bg-[#C9D6E6]" />
      </div>

      {/* Filter panel: genres and sort order */}
      <div
        className="absolute right-[5%] top-[7%] w-[23%] rotate-2 rounded-[1.8cqw] border-[0.5cqw] border-[#24205A] bg-white p-[1.4cqw] text-[#24205A] shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <p className="flex items-center gap-[0.6cqw] text-[1.4cqw] font-semibold leading-none">
          <SlidersHorizontal className="h-[1.6cqw] w-[1.6cqw]" />
          Genres
        </p>
        <div className="mt-[1cqw] flex flex-wrap gap-[0.5cqw]">
          {GENRES.map((g) => (
            <span
              key={g.label}
              className={`rounded-full px-[0.9cqw] py-[0.5cqw] text-[1.1cqw] font-semibold leading-none ${g.on ? "bg-[#7A4FD6] text-white" : "bg-[#F1F6FB] text-[#24205A]"}`}
            >
              {g.label}
            </span>
          ))}
        </div>
        <p className="mt-[1.6cqw] flex items-center gap-[0.6cqw] text-[1.4cqw] font-semibold leading-none">
          <ArrowUpDown className="h-[1.6cqw] w-[1.6cqw]" />
          Sort by
        </p>
        <ul className="mt-[0.9cqw] space-y-[0.6cqw]">
          {SORTS.map((s, i) => (
            <li key={s} className="flex items-center gap-[0.7cqw] text-[1.15cqw] leading-none">
              <span className={`flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-full border-[0.25cqw] ${i === 2 ? "border-[#7A4FD6]" : "border-[#C9D6E6]"}`}>
                {i === 2 && <span className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-[#7A4FD6]" />}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Game details card */}
      <div
        className="absolute bottom-[6%] right-[7%] w-[21%] -rotate-2 overflow-hidden rounded-[1.8cqw] border-[0.5cqw] border-[#24205A] bg-white shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <div className="flex aspect-[16/8] items-center justify-center bg-gradient-to-br from-[#7A4FD6] to-[#E9488A] text-white">
          <Gamepad2 className="h-[4.4cqw] w-[4.4cqw]" />
        </div>
        <div className="p-[1.2cqw]">
          <span className="block h-[1cqw] w-[70%] rounded-full bg-[#24205A]/80" />
          <span className="mt-[0.6cqw] block h-[0.7cqw] w-[45%] rounded-full bg-[#24205A]/30" />
          <div className="mt-[0.9cqw] flex items-center gap-[0.3cqw] text-[#F5B50A]">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-[1.4cqw] w-[1.4cqw]" fill={i < 4 ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div
        className="absolute bottom-[7%] left-[3%] flex w-[36%] items-center gap-[0.9cqw] rounded-full border-[0.5cqw] border-[#24205A] bg-white py-[1cqw] pl-[1.4cqw] pr-[0.7cqw] shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <Search className="h-[2cqw] w-[2cqw] text-[#24205A]" />
        <span className="flex-1 text-[1.5cqw] leading-none text-[#5C6079]">Search games&hellip;</span>
        <span className="rounded-full bg-[#7A4FD6] px-[1.2cqw] py-[0.8cqw] text-[1.2cqw] font-semibold leading-none text-white">Search</span>
      </div>
    </CoverBackdrop>
  );
}

/* ---------------- Case-study body ---------------- */

const MODULES: Module[] = [
  { icon: Search, color: "#7A4FD6", title: "Catalog search", text: "Find any game in the catalog from one search box." },
  { icon: Tags, color: "#E9488A", title: "Browse by genre", text: "Filter the catalog down to the genres you care about." },
  { icon: ArrowUpDown, color: "#2D8DD6", title: "Sort three ways", text: "Order results by relevance, release date or rating." },
  { icon: Gamepad2, color: "#D9861A", title: "Game details", text: "A page for each game, loaded from its own API endpoint." },
  { icon: Braces, color: "#3178C6", title: "Typed client", text: "A React and TypeScript client kept separate from the API it consumes." },
  { icon: Palette, color: "#0EA5A4", title: "Tailwind UI", text: "Tailwind CSS layouts for browsing genres, results and details." },
];

export function GameHubDetails() {
  return (
    <>
      <ModuleGrid modules={MODULES} />

      <section className="mt-10">
        <h4 className="text-lg font-semibold">How it fits together</h4>
        <p className="mt-1 text-sm text-muted">A React client talking to a custom Spring Boot REST API I built for it.</p>

        <div className="mt-5 grid items-center gap-3 lg:grid-cols-[1fr_2rem_1.4fr]">
          <Node icon={Globe} color={INK} title="React client">
            TypeScript and Tailwind CSS
          </Node>

          <Flow />

          <div className="rounded-2xl bg-tint p-4">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-ink" aria-hidden="true" />
              <p className="font-semibold text-ink">Spring Boot REST API</p>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5 text-sm font-medium text-ink" aria-label="Endpoints">
              {["Genres", "Catalog search", "Game details"].map((e) => (
                <li key={e} className="rounded-full bg-paper px-2.5 py-1 ring-1 ring-line">
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
              <LayoutGrid className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
              Genre filtering, and sorting by relevance, release date or rating
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
