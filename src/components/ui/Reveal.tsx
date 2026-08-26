"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, DUR, VIEWPORT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
  /** Reveal duration in seconds. */
  duration?: number;
  /** Play on mount instead of waiting for the viewport (hero, page headers). */
  immediate?: boolean;
  as?: "div" | "li" | "figure" | "section" | "span";
}

/**
 * Subtle entrance reveal. Fades and lifts content into place once, when it
 * scrolls into view. Renders static markup when the user prefers reduced
 * motion, so the site reads perfectly with animation disabled.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
  duration = DUR.base,
  immediate = false,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const motionProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...motionProps}
    >
      {children}
    </Tag>
  );
}
