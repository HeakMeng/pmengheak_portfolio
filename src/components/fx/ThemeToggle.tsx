"use client";

import { useLayoutEffect, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function resolveTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Sun/moon button that flips between the light and dark palettes and remembers the choice.
 * Where supported, the new theme is revealed in a circle growing from the button.
 * Both icons are rendered and CSS shows the right one, so server and client markup always match.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  // React's dev-mode remount clears the attribute the inline script set; put it back before paint.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", resolveTheme());
  }, []);

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("startViewTransition" in document)) {
      apply();
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty("--theme-x", `${x}px`);
    root.setProperty("--theme-y", `${y}px`);
    root.setProperty("--theme-r", `${radius}px`);
    document.startViewTransition(apply);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light / dark mode"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full text-dock-ink/70 transition-colors hover:bg-dock-ink/15 hover:text-dock-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
