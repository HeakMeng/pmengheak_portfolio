import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Small celebratory burst from a given element; loaded lazily so it never ships in the first paint. */
export async function burstFrom(el: HTMLElement | null, colors = ["#2563eb", "#facc15", "#ef4444", "#22c55e"]) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: confetti } = await import("canvas-confetti");
  const rect = el?.getBoundingClientRect();
  const origin = rect
    ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
    : { x: 0.5, y: 0.5 };
  confetti({ particleCount: 70, spread: 75, startVelocity: 32, scalar: 0.9, ticks: 160, origin, colors });
}
