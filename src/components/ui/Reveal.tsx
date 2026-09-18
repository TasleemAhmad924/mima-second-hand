"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, DUR } from "@/lib/motion";
import { useEnterMotion } from "@/lib/use-enter-motion";

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
 * Subtle entrance reveal. First paint is visible; the fade only starts after
 * JavaScript has measured the viewport, so a delayed consent manager cannot
 * leave copy at opacity 0.
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
  const { ref, visible, armed } = useEnterMotion(immediate);
  const Tag = motion[as];
  const play = armed && visible && prefersReduced !== true;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: play ? duration : 0,
        delay: play ? delay : 0,
        ease: EASE_OUT,
      }}
    >
      {children}
    </Tag>
  );
}
