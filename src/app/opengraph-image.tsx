import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/portfolio";

/** Link-preview card (LinkedIn, Telegram, X, Slack…), drawn in the hero's poster style at build time. */
export const alt = `${PROFILE.name}, ${PROFILE.title} and ${PROFILE.role2}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0F1E3A";
const PAPER = "#F3F5F9";
const BLUE = "#2563EB";
const MUTED = "#4B5872";

const HEADLINE = ["BACKEND", "DEVELOPER"] as const;
const NAME = PROFILE.name.toUpperCase();
const STACK = "Java · Spring Boot · Kafka · PostgreSQL · Docker";
const HOST = new URL(PROFILE.site).host;

/**
 * Viga (the site's display face) as TrueType, subset to the characters drawn in it.
 * The renderer cannot read the woff2 that next/font ships, so it is fetched from Google Fonts at build time.
 * If that fails, the card still renders in the bundled default font.
 */
async function loadViga(): Promise<ArrayBuffer | null> {
  "use cache"; // fetched once at build, so the card itself is prerendered rather than drawn per request
  try {
    const text = encodeURIComponent([...HEADLINE, NAME].join(""));
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Viga&text=${text}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** next/og's own bundled face, registered by name so body text never falls into Viga's subset capitals. */
const GEIST = join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf");

export default async function Image() {
  const [viga, geist, portrait] = await Promise.all([
    loadViga(),
    readFile(GEIST),
    readFile(join(process.cwd(), "public", PROFILE.photo), "base64"),
  ]);
  const display = viga ? "Viga" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: PAPER,
          backgroundImage: `linear-gradient(rgba(15,30,58,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,30,58,0.07) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: NAVY,
          fontFamily: "Geist",
          fontSize: 22,
        }}
      >
        {/* Masthead strip, as at the top of the site */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: `2px solid ${NAVY}`,
            fontSize: 18,
            letterSpacing: 3,
          }}
        >
          <span>{NAME}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: BLUE }} />
            OPEN TO WORK
          </span>
        </div>

        {/* Portrait, anchored to the bottom-right edge and faded into the page */}
        <div style={{ position: "absolute", right: 40, bottom: 0, display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not to the page */}
          <img src={`data:image/png;base64,${portrait}`} width={432} height={540} alt="" />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 110,
              backgroundImage: `linear-gradient(to bottom, rgba(243,245,249,0), ${PAPER})`,
            }}
          />
        </div>

        {/* Headline and identity */}
        <div style={{ position: "absolute", left: 60, top: 112, display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: display, fontSize: 100, lineHeight: 0.95 }}>{HEADLINE[0]}</span>
          <span
            style={{
              fontFamily: display,
              fontSize: 100,
              lineHeight: 0.95,
              color: PAPER,
              WebkitTextStroke: `3px ${NAVY}`,
            }}
          >
            {HEADLINE[1]}
          </span>

          <span style={{ marginTop: 40, fontFamily: display, fontSize: 46, lineHeight: 1 }}>{NAME}</span>
          <span style={{ marginTop: 12, display: "flex", fontSize: 22, letterSpacing: 3, color: MUTED }}>
            {PROFILE.title.toUpperCase()} ·&nbsp;<span style={{ color: BLUE }}>{PROFILE.role2.toUpperCase()}</span>
          </span>
          <span style={{ marginTop: 26, fontSize: 24 }}>{STACK}</span>

          <span
            style={{
              marginTop: 30,
              alignSelf: "flex-start",
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: NAVY,
              color: PAPER,
              fontSize: 22,
              letterSpacing: 1,
              boxShadow: `5px 5px 0 ${BLUE}`,
            }}
          >
            {HOST}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, style: "normal", weight: 400 },
        ...(viga ? [{ name: "Viga", data: viga, style: "normal" as const, weight: 400 as const }] : []),
      ],
    },
  );
}
