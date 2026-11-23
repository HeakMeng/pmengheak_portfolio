"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const letter: Variants = {
  hidden: { y: "115%" },
  shown: { y: "0%", transition: { duration: 0.75, ease } },
};

/** Padding + equal negative margin widens each word's clipping window so outlines and accents are not cut, without changing layout. */
const mask = "-mx-[0.04em] -my-[0.1em] inline-flex overflow-hidden px-[0.04em] py-[0.1em] align-bottom";

type Props = {
  text: string;
  className?: string;
  /** Seconds before the first letter moves. */
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** "load" plays once on first paint (above the fold); "view" plays the first time it scrolls into view. */
  trigger?: "load" | "view";
};

/**
 * Masked letter reveal: each word is a clipping window and its letters slide up into it, one after another.
 * Screen readers get the plain string; the animated letters are hidden from them.
 *
 * "load" uses a CSS animation (`.letter-rise` in globals.css) so the hero headline plays on first paint
 * instead of staying hidden until JavaScript has loaded. "view" needs JavaScript to know when it is seen.
 */
export default function SplitText({ text, className, delay = 0, stagger = 0.035, trigger = "view" }: Props) {
  const words = text.split(" ");
  // Index of each word's first letter in the whole string, so the stagger runs across word breaks.
  const starts = words.map((_, wi) => words.slice(0, wi).join("").length);

  if (trigger === "load") {
    return (
      <span className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, wi) => (
            <Fragment key={wi}>
              <span className={mask}>
                {Array.from(word).map((ch, ci) => (
                  <span
                    key={ci}
                    className="letter-rise inline-block"
                    style={{ animationDelay: `${delay + (starts[wi] + ci) * stagger}s` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      </span>
    );
  }

  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        variants={container}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      >
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className={mask}>
              {Array.from(word).map((ch, ci) => (
                <motion.span key={ci} variants={letter} className="inline-block will-change-transform">
                  {ch}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </span>
  );
}
