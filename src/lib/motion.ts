/**
 * Central motion language for the whole site. One vocabulary, used everywhere,
 * so every reveal, hover and transition feels like the same hand.
 *
 * Keep it calm: opacity + small translate + gentle scale, premium easing,
 * restrained durations. Nothing bounces.
 */
import type { Transition, Variants } from "motion/react";

/** Editorial ease-out — the default for reveals and hovers. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Symmetric ease used for the mobile menu open/close choreography. */
export const EASE_INOUT = [0.76, 0, 0.24, 1] as const;

export const DUR = {
  hover: 0.32,
  page: 0.32,
  accordion: 0.3,
  fast: 0.3,
  menu: 0.52,
  base: 0.7,
  slow: 0.82,
  image: 1.0,
} as const;

export const STAGGER = {
  menu: 0.05,
  reveal: 0.06,
} as const;

/** Shared viewport config: reveal once, a touch before fully in view. */
export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Section / text reveal. `custom` is a delay in seconds for staggering. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT, delay },
  }),
};

/** Cinematic image reveal — gentle settle from a slight over-scale. */
export const mediaVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.image, ease: EASE_OUT, delay },
  }),
};

export const transition = (
  duration = DUR.base,
  delay = 0,
): Transition => ({ duration, delay, ease: EASE_OUT });
