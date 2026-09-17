"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  y = 18,
  duration = DUR.base,
  immediate = false,
  as = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const skip = mounted && prefersReduced === true;
  const Tag = motion[as];

  const motionProps = skip
    ? { animate: { opacity: 1, y: 0 } }
    : immediate
      ? { animate: { opacity: 1, y: 0 } }
      : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT };

  return (
    <Tag
      className={className}
      initial={skip ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: skip ? 0 : duration, delay: skip ? 0 : delay, ease: EASE_OUT }}
      {...motionProps}
    >
      {children}
    </Tag>
  );
}
