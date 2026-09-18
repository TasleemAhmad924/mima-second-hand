"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { VIEWPORT } from "@/lib/motion";

type Phase = "pending" | "shown" | "hidden";

/**
 * Scroll/enter motion that stays visible in the HTML. CCM19 can delay or
 * block the RSC payload, so a Framer `initial={{ opacity: 0 }}` would leave
 * the page blank until JavaScript runs.
 */
export function useEnterMotion(immediate = false) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("pending");

  useLayoutEffect(() => {
    if (prefersReduced === true || immediate) {
      setPhase("shown");
      return;
    }

    const el = ref.current;
    if (!el) {
      setPhase("shown");
      return;
    }

    if (isInRevealZone(el)) {
      setPhase("shown");
      return;
    }

    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { rootMargin: VIEWPORT.margin, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, prefersReduced]);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  return {
    ref: setRef,
    visible: phase !== "hidden",
    armed: phase !== "pending",
  };
}

function isInRevealZone(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
}
