"use client";

import { useEffect } from "react";

/**
 * Page-wide motion layer. Renders nothing; it only wires up two behaviours:
 *  1. Scroll reveals: content below the fold fades/slides in as it enters view.
 *     Elements already on screen are never hidden, and nothing is hidden at all
 *     when the visitor prefers reduced motion or IntersectionObserver is missing.
 *  2. Pointer tilt: any element with [data-tilt] leans toward the cursor in 3D.
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // ---------- Scroll reveal ----------
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.classList.add("reveal-in");
              observer?.unobserve(el);
              // Hand the element back to its own hover/transition styles once settled.
              window.setTimeout(() => {
                el.classList.remove("reveal-pending", "reveal-in");
                el.style.removeProperty("--d");
              }, 1500);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );

      const targets: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>("main > div > section:not(#hero) > div, main > section:not(#hero) > div").forEach((container) => {
        Array.from(container.children).forEach((child) => {
          const el = child as HTMLElement;
          const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (items.length) {
            // Explicit items (e.g. project cards) reveal one by one instead of as a single block.
            targets.push(...Array.from(items));
          } else if (el.className.toString().includes("grid")) {
            targets.push(...(Array.from(el.children) as HTMLElement[]));
          } else {
            targets.push(el);
          }
        });
      });

      try {
        // Read pass first (one layout), then write pass, so no write precedes a read.
        const threshold = window.innerHeight * 0.92;
        const revealItems = Array.from(document.querySelectorAll("[data-reveal-item]"));
        const plan = targets.map((el) => {
          const grouped = el.hasAttribute("data-reveal-item");
          const index = grouped
            ? revealItems.indexOf(el)
            : Array.from(el.parentElement?.children ?? []).indexOf(el);
          return {
            el,
            delay: Math.min(index, 5) * (grouped ? 140 : 90),
            // Only hide what is still below the fold, so nothing flashes on load.
            below: el.getBoundingClientRect().top > threshold,
          };
        });
        plan.forEach(({ el, delay, below }) => {
          el.style.setProperty("--d", `${delay}ms`);
          if (below) {
            el.classList.add("reveal-pending");
            observer?.observe(el);
          }
        });
      } catch {
        // If anything goes wrong, show everything rather than risk hidden content.
        document.querySelectorAll(".reveal-pending").forEach((el) => el.classList.remove("reveal-pending"));
      }
    }

    // ---------- Pointer tilt (mouse only) ----------
    let active: HTMLElement | null = null;
    let frame = 0;
    const reset = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
      // Drop the 3D transform once the return transition has finished.
      window.setTimeout(() => {
        if (active !== el) el.classList.remove("is-tilting");
      }, 360);
    };
    const hero = document.getElementById("hero");
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Hero depth: layers drift with the pointer while the hero is on screen.
      if (hero && hero.getBoundingClientRect().bottom > 0) {
        hero.style.setProperty("--hx", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        hero.style.setProperty("--hy", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      }
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-tilt], [data-parallax]") ?? null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      if (el.dataset.tilt) el.classList.add("is-tilting");
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--mx", (px * 2).toFixed(3));
        el.style.setProperty("--my", (py * 2).toFixed(3));
        if (el.dataset.tilt) {
          const max = parseFloat(el.dataset.tilt || "6");
          el.style.setProperty("--ry", `${(px * max * 2).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${(-py * max * 2).toFixed(2)}deg`);
        }
      });
    };
    const onLeave = () => {
      reset(active);
      active = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return null;
}
