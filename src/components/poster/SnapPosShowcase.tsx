import {
  ArrowLeftRight,
  ArrowRight,
  Boxes,
  Check,
  Database,
  Monitor,
  QrCode,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
} from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { CoverBackdrop, diagramGrid, Flow, INK, ModuleGrid, Node, type Module } from "./showcase-kit";

/* ---------------- Cover: the whole system in one picture ---------------- */

/** One of the three corner squares of a QR code. */
function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="7" height="7" fill={INK} />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#FFFFFF" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill={INK} />
    </g>
  );
}

/** A fixed, QR-looking pattern (three finder squares plus a deterministic scatter). Decorative. */
function QrPattern({ className }: { className?: string }) {
  const n = 21;
  const finder = (x: number, y: number) => x < 7 && y < 7;
  const inFinder = (x: number, y: number) => finder(x, y) || finder(n - 1 - x, y) || finder(x, n - 1 - y);
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y)) continue;
      // Cheap hash so the pattern is stable between server and client renders.
      if (((x * 73 + y * 151 + x * y * 7) % 11) % 3 === 0) cells.push([x, y]);
    }
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect width={n} height={n} fill="#FFFFFF" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={INK} />
      ))}
      <Finder x={0} y={0} />
      <Finder x={n - 7} y={0} />
      <Finder x={0} y={n - 7} />
    </svg>
  );
}

/**
 * Collage used as the SnapPOS card image and case-study header: the real cashier screen on a laptop,
 * the SnapTrack PWA on a phone, and a KHQR payment ticket. Sized in container units so the same
 * drawing works as a small card thumbnail and as the large modal header.
 */
export function SnapPosCover({ label, sizes }: { label: string; sizes: string }) {
  return (
    <CoverBackdrop label={label}>
      {/* Logo chip */}
      <div className="absolute left-[5%] top-[6%] w-[25%] rounded-[1.6cqw] bg-white px-[1.6cqw] py-[1cqw] shadow-[0_0.6cqw_1.6cqw_-0.8cqw_rgba(36,32,90,0.35)]">
        <SmartImage src="/snapps.png" alt="" width={1633} height={455} className="h-auto w-full" />
      </div>

      {/* Laptop with the real cashier screen */}
      <div className="absolute left-[5%] top-[23%] w-[63%]" aria-hidden="true">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.6cqw] border-[0.7cqw] border-b-0 border-[#24205A] bg-white">
          <SmartImage src="/projects/snappos.png" alt="" fill sizes={sizes} className="object-cover object-left-top" />
        </div>
        <div className="-mx-[5%] h-[2.2cqw] rounded-b-[1.4cqw] border-[0.35cqw] border-[#24205A] bg-[#C9D6E6]" />
      </div>

      {/* Phone running SnapTrack: a stock transfer between two branches */}
      <div
        className="absolute right-[6%] top-[11%] flex aspect-[9/18.5] w-[19.5%] flex-col overflow-hidden rounded-[2.6cqw] border-[0.7cqw] border-[#24205A] bg-white shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <div className="flex items-center gap-[0.8cqw] bg-[#3B30C9] px-[1.4cqw] pb-[1.2cqw] pt-[2cqw] text-white">
          <Truck className="h-[2.2cqw] w-[2.2cqw]" />
          <span className="text-[1.7cqw] font-semibold leading-none">SnapTrack</span>
        </div>
        <div className="flex flex-1 flex-col gap-[1cqw] p-[1.3cqw]">
          <div className="flex items-center justify-between gap-[0.4cqw] whitespace-nowrap text-[1.1cqw] font-semibold leading-none text-[#24205A]">
            <span className="rounded-full bg-[#EAF4FC] px-[0.7cqw] py-[0.6cqw]">Branch 1</span>
            <ArrowRight className="h-[1.3cqw] w-[1.3cqw] shrink-0" />
            <span className="rounded-full bg-[#FDE7F0] px-[0.7cqw] py-[0.6cqw]">Branch 2</span>
          </div>
          {[0.8, 0.6, 0.7, 0.5].map((w, i) => (
            <div key={i} className="flex items-center gap-[0.9cqw] rounded-[0.9cqw] bg-[#F1F6FB] p-[0.8cqw]">
              <span className="h-[2.6cqw] w-[2.6cqw] shrink-0 rounded-[0.6cqw] bg-[#C9D6E6]" />
              <span className="flex flex-1 flex-col gap-[0.5cqw]">
                <span className="h-[0.7cqw] rounded-full bg-[#24205A]/70" style={{ width: `${w * 100}%` }} />
                <span className="h-[0.6cqw] w-[40%] rounded-full bg-[#24205A]/25" />
              </span>
            </div>
          ))}
          <div className="mt-auto rounded-full bg-[#E9488A] py-[1cqw] text-center text-[1.3cqw] font-semibold leading-none text-white">
            Receive stock
          </div>
        </div>
      </div>

      {/* KHQR payment ticket */}
      <div
        className="absolute bottom-[6%] left-[2.5%] w-[17%] -rotate-3 overflow-hidden rounded-[1.6cqw] border-[0.5cqw] border-[#24205A] bg-white shadow-[0_1.4cqw_3cqw_-1.4cqw_rgba(36,32,90,0.5)]"
        aria-hidden="true"
      >
        <div className="bg-[#E1232E] py-[0.9cqw] text-center text-[1.6cqw] font-extrabold leading-none tracking-wide text-white">KHQR</div>
        <div className="px-[1.6cqw] pb-[1.4cqw] pt-[1.2cqw]">
          <QrPattern className="w-full" />
          <div className="mt-[1cqw] flex items-center justify-between text-[1.5cqw] font-bold leading-none text-[#24205A]">
            <span>$3.50</span>
            <span className="flex items-center gap-[0.4cqw] rounded-full bg-[#DDF3E4] px-[0.8cqw] py-[0.5cqw] text-[1.2cqw] text-[#1E7A3C]">
              <Check className="h-[1.3cqw] w-[1.3cqw]" />
              Paid
            </span>
          </div>
        </div>
      </div>

      {/* Branch pins along the bottom right: one system, many shops */}
      <div className="absolute bottom-[7%] right-[5%] flex gap-[1.2cqw]" aria-hidden="true">
        {["#2D8DD6", "#E9488A", "#F5CF5B"].map((c) => (
          <span key={c} className="flex h-[5.4cqw] w-[5.4cqw] items-center justify-center rounded-[1.4cqw] border-[0.45cqw] border-[#24205A] text-white" style={{ backgroundColor: c }}>
            <Store className="h-[2.8cqw] w-[2.8cqw]" style={{ color: c === "#F5CF5B" ? INK : "#FFFFFF" }} />
          </span>
        ))}
      </div>

    </CoverBackdrop>
  );
}

/* ---------------- Case-study body: what it does and how it fits together ---------------- */

const MODULES: Module[] = [
  { icon: ShoppingCart, color: "#3B30C9", title: "Cashier checkout", text: "Product grid, cart, held orders and discounts on a Next.js and Tailwind terminal." },
  { icon: Boxes, color: "#2D8DD6", title: "Live stock", text: "Real-time stock control, with pessimistic locks on hot items so two tills can't sell the same last unit." },
  { icon: Store, color: "#E9488A", title: "Many branches", text: "One inventory model shared by every branch, each keeping its own stock." },
  { icon: QrCode, color: "#E1232E", title: "KHQR payments", text: "Bakong KHQR payloads generated at checkout and confirmed by a verified webhook." },
  { icon: ShieldCheck, color: "#1E7A3C", title: "Roles", text: "Role-based security that separates what cashiers and managers can do." },
  { icon: Truck, color: "#D9861A", title: "SnapTrack PWA", text: "A mobile app for branch-to-branch stock transfers and supplier receiving." },
];

export function SnapPosDetails() {
  return (
    <>
      <ModuleGrid modules={MODULES} />

      <section className="mt-10">
        <h4 className="text-lg font-semibold">How it fits together</h4>
        <p className="mt-1 text-sm text-muted">I led this backend architecture. Every service runs in Docker, locally and on the server.</p>

        <div className="relative mt-5 rounded-[1.75rem] border-2 border-dashed border-line p-4 pt-8 sm:p-6 sm:pt-9">
          <span className="absolute -top-3.5 left-5 rounded-full bg-paper px-3 font-hand text-2xl leading-none text-accent-ink">in Docker</span>

          <div className={diagramGrid}>
            <div className="space-y-3">
              <Node icon={Monitor} color="#3B30C9" title="Cashier terminal">
                Next.js and Tailwind
              </Node>
              <Node icon={Smartphone} color="#D9861A" title="SnapTrack">
                Mobile PWA for transfers and receiving
              </Node>
            </div>

            <Flow />

            <div className="rounded-2xl bg-tint p-4">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-ink" aria-hidden="true" />
                <p className="font-semibold text-ink">Spring Boot API</p>
              </div>
              <ol className="mt-3 flex flex-wrap items-center gap-1.5 text-sm font-medium text-ink" aria-label="Request layers">
                {["Controller", "Service", "Repository"].map((l, i) => (
                  <li key={l} className="flex items-center gap-1.5">
                    {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />}
                    <span className="rounded-full bg-paper px-2.5 py-1 ring-1 ring-line">{l}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                <ShieldCheck className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                Role-based security for cashiers and managers
              </p>
            </div>

            <Flow />

            <Node icon={Database} color="#336791" title="PostgreSQL">
              Inventory in ACID transactions, with row locks on hot stock
            </Node>
          </div>

          {/* Payments hang off the API, both ways: payload out, webhook back */}
          <div className={`mt-3 ${diagramGrid}`}>
            <div className="lg:col-start-3">
              <span className="mb-3 flex justify-center text-pink" aria-hidden="true">
                <ArrowLeftRight className="h-6 w-6 rotate-90" />
              </span>
              <Node icon={QrCode} color="#E1232E" title="Bakong KHQR">
                Payment payload out, verified webhook back
              </Node>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
