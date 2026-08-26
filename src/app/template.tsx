"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/**
 * Restrained route transition. `template.tsx` re-mounts on every navigation, so
 * each page fades in gently. Opacity-only on purpose: a transform on this
 * wrapper would turn `position: fixed` descendants (e.g. the booking sticky bar)
 * into absolutely-positioned ones. The vertical motion lives in section reveals.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
