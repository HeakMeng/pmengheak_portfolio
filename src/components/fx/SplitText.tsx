"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const letter: Variants = {
  hidden: { y: "115%" },
  shown: { y: "0%", transition: { duration: 0.75, ease } },
};

type Props = {
  text: string;
  className?: string;
  /** Seconds before the first letter moves. */
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  /** "load" plays once on mount (above the fold); "view" plays the first time it scrolls into view. */
  trigger?: "load" | "view";
};

/**
 * Masked letter reveal: each word is a clipping window and its letters slide up into it, one after another.
 * Screen readers get the plain string; the animated letters are hidden from them.
 */
export default function SplitText({ text, className, delay = 0, stagger = 0.035, trigger = "view" }: Props) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const play =
    trigger === "load"
      ? { initial: "hidden", animate: "shown" }
      : { initial: "hidden", whileInView: "shown", viewport: { once: true, margin: "0px 0px -60px 0px" } };

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden="true" variants={container} {...play}>
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {/* Padding + equal negative margin widens the mask so outlines and accents are not clipped, without changing layout. */}
            <span className="-mx-[0.04em] -my-[0.1em] inline-flex overflow-hidden px-[0.04em] py-[0.1em] align-bottom">
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
