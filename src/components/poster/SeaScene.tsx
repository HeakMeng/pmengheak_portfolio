/**
 * Hand-drawn hero illustration: a little container boat carrying the stack (Java, Spring, Docker, Ollama) on the sea,
 * a lighthouse on the rocks, gulls and clouds. Pure SVG, coloured by theme tokens, so it becomes a
 * night scene in dark mode. Decorative only.
 */

import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import { SiDocker, SiOllama, SiSpring } from "react-icons/si";

const line = "var(--color-scene-line)";

function Cloud({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={className}>
      <ellipse cx="60" cy="46" rx="62" ry="22" fill="var(--color-scene-sky-1)" opacity="0.7" />
      <g fill="var(--color-scene-cloud)">
        <circle cx="30" cy="34" r="22" />
        <circle cx="62" cy="22" r="28" />
        <circle cx="96" cy="34" r="20" />
        <rect x="12" y="30" width="104" height="22" rx="11" />
      </g>
      <path d="M14 50 Q60 58 114 50" stroke={line} strokeOpacity="0.25" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Gull({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y} q ${9 * s} ${-9 * s} ${18 * s} 0 q ${9 * s} ${-9 * s} ${18 * s} 0`}
      stroke={line}
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/**
 * A shipping container carrying one tool of the stack: brand colour, the real logo in the middle,
 * and the corrugation ribs kept to the two ends so the logo reads clearly.
 */
function Container({
  x,
  y,
  color,
  logo: Logo,
  logoColor = "#FFFFFF",
}: {
  x: number;
  y: number;
  color: string;
  logo: IconType;
  logoColor?: string;
}) {
  const w = 74;
  const h = 40;
  const ribs = [8, 14, w - 14, w - 8];
  const size = 26;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={color} stroke={line} strokeWidth="2.5" />
      {ribs.map((r) => (
        <line key={r} x1={x + r} y1={y + 7} x2={x + r} y2={y + h - 7} stroke={line} strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
      ))}
      <Logo x={x + (w - size) / 2} y={y + (h - size) / 2} size={size} color={logoColor} />
    </g>
  );
}

export default function SeaScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMaxYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-scene-sky-1)" />
          <stop offset="1" stopColor="var(--color-scene-sky-2)" />
        </linearGradient>
        <radialGradient id="scene-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-sun)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-sun)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky and sun (moon at night: same shape, paler colour) */}
      <rect width="1200" height="640" fill="url(#scene-sky)" />
      <circle cx="860" cy="112" r="120" fill="url(#scene-glow)" />
      <circle cx="860" cy="112" r="54" fill="var(--color-sun)" stroke={line} strokeWidth="2.5" />

      {/* Clouds drift a little, slowly */}
      <g className="cloud-drift">
        <Cloud x={620} y={60} s={1.1} />
        <Cloud x={930} y={190} s={0.8} />
      </g>
      <Cloud x={420} y={180} s={0.7} />

      {/* Gulls */}
      <Gull x={760} y={150} s={1.1} />
      <Gull x={810} y={128} s={0.8} />
      <Gull x={1000} y={90} s={0.9} />
      <Gull x={560} y={110} s={0.7} />

      {/* Rocks and lighthouse on the right, clear of the title */}
      <path
        d="M930 470 Q960 400 1020 410 Q1060 360 1120 384 Q1170 372 1215 420 L1215 470 Z"
        fill="var(--color-scene-rock)"
        stroke={line}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g transform="translate(1078 230)">
        <path d="M14 0 L46 0 L56 162 L4 162 Z" fill="#FFFFFF" stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M11 44 L49 44 L51 74 L9 74 Z" fill="var(--color-pink)" />
        <path d="M7 106 L53 106 L55 136 L5 136 Z" fill="var(--color-pink)" />
        <path d="M14 0 L46 0 L56 162 L4 162 Z" fill="none" stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="8" y="-34" width="44" height="34" rx="6" fill="var(--color-sun)" stroke={line} strokeWidth="2.5" />
        <path d="M2 -34 L30 -58 L58 -34 Z" fill="var(--color-scene-sea-3)" stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M8 -20 L-60 -40 L-60 0 Z" fill="var(--color-sun)" opacity="0.35" />
      </g>

      {/* Back wave */}
      <path
        d="M0 460 Q60 440 120 460 T240 460 T360 460 T480 460 T600 460 T720 460 T840 460 T960 460 T1080 460 T1200 460 L1200 640 L0 640 Z"
        fill="var(--color-scene-sea-1)"
        stroke={line}
        strokeWidth="2.5"
      />

      {/* The boat, bobbing: a hull carrying stacked containers, a wheelhouse and a pink flag */}
      <g transform="translate(640 286)">
        <g className="boat-bob">
          <line x1="300" y1="20" x2="300" y2="92" stroke={line} strokeWidth="3" strokeLinecap="round" />
          <path d="M300 22 L344 34 L300 46 Z" fill="var(--color-pink)" stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
          {/* The stack it carries: Java, Spring and Docker on deck, the local LLM on top */}
          <Container x={40} y={92} color="#FFFFFF" logo={FaJava} logoColor="#E76F00" />
          <Container x={116} y={92} color="#6DB33F" logo={SiSpring} />
          <Container x={192} y={92} color="#2496ED" logo={SiDocker} />
          <Container x={78} y={50} color="#24242B" logo={SiOllama} />
          <rect x="272" y="62" width="62" height="70" rx="8" fill="#FFFFFF" stroke={line} strokeWidth="2.5" />
          <rect x="284" y="74" width="16" height="16" rx="3" fill="var(--color-scene-sky-1)" stroke={line} strokeWidth="2" />
          <rect x="306" y="74" width="16" height="16" rx="3" fill="var(--color-scene-sky-1)" stroke={line} strokeWidth="2" />
          <path
            d="M0 132 L380 132 L346 196 Q190 214 36 196 Z"
            fill="var(--color-scene-hull)"
            stroke={line}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M14 152 L366 152" stroke="var(--color-accent)" strokeWidth="10" strokeLinecap="round" />
          <circle cx="70" cy="176" r="7" fill="#FFFFFF" stroke={line} strokeWidth="2" />
          <circle cx="104" cy="176" r="7" fill="#FFFFFF" stroke={line} strokeWidth="2" />
        </g>
      </g>

      {/* Middle wave with foam where it meets the boat */}
      <path
        d="M0 512 Q75 488 150 512 T300 512 T450 512 T600 512 T750 512 T900 512 T1050 512 T1200 512 L1200 640 L0 640 Z"
        fill="var(--color-scene-sea-2)"
        stroke={line}
        strokeWidth="2.5"
      />
      <g fill="#FFFFFF" stroke={line} strokeWidth="2">
        <circle cx="654" cy="500" r="12" />
        <circle cx="676" cy="492" r="16" />
        <circle cx="702" cy="500" r="11" />
        <circle cx="992" cy="498" r="13" />
        <circle cx="1016" cy="490" r="17" />
        <circle cx="1042" cy="499" r="12" />
      </g>

      {/* Front wave */}
      <path
        d="M0 568 Q100 546 200 568 T400 568 T600 568 T800 568 T1000 568 T1200 568 L1200 640 L0 640 Z"
        fill="var(--color-scene-sea-3)"
        stroke={line}
        strokeWidth="2.5"
      />
      <path d="M120 600 q 16 -8 32 0 M760 606 q 16 -8 32 0 M1020 596 q 16 -8 32 0" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
