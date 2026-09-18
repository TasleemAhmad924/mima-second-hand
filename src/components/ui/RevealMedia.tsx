"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, DUR } from "@/lib/motion";
import { useEnterMotion } from "@/lib/use-enter-motion";

interface RevealMediaProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Aspect + border/utility classes applied to the figure frame. */
  className?: string;
  delay?: number;
  /** Enable the restrained hover zoom (on by default). */
  zoom?: boolean;
  /** Play on mount instead of waiting for the viewport. */
  immediate?: boolean;
  /** CSS object-position for the crop. Lets real store photos drop in later. */
  objectPosition?: string;
  /** Narrow-viewport crop; falls back to objectPosition. */
  mobileObjectPosition?: string;
  /** Use contain for product photos that must stay fully visible. */
  objectFit?: "cover" | "contain";
}

/**
 * Cinematic editorial image. The frame clips; the image resolves from a slight
 * over-scale as it enters the viewport, then a separate layer carries the quiet
 * hover zoom — so the entrance and hover transforms never fight each other.
 * First paint stays visible if JavaScript is delayed.
 */
export function RevealMedia({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  delay = 0,
  zoom = true,
  immediate = false,
  objectPosition,
  mobileObjectPosition,
  objectFit = "cover",
}: RevealMediaProps) {
  const prefersReduced = useReducedMotion();
  const { ref, visible, armed } = useEnterMotion(immediate);
  const play = armed && visible && prefersReduced !== true;

  const cropVars = mobileObjectPosition
    ? {
        ["--media-pos" as string]: objectPosition ?? "center",
        ["--media-pos-mobile" as string]: mobileObjectPosition,
      }
    : undefined;

  const image = (
    <div className={`absolute inset-0 ${zoom ? "media-zoom" : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={objectFit === "contain" ? "object-contain" : "object-cover"}
        style={
          mobileObjectPosition
            ? undefined
            : objectPosition
              ? { objectPosition }
              : undefined
        }
      />
    </div>
  );

  return (
    <figure
      className={`relative overflow-hidden ${mobileObjectPosition ? "media-crop" : ""} ${className}`}
      style={cropVars}
    >
      <motion.div
        ref={ref}
        className="absolute inset-0 h-full w-full origin-center"
        initial={false}
        animate={
          visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }
        }
        transition={{
          duration: play ? DUR.image : 0,
          ease: EASE_OUT,
          delay: play ? delay : 0,
        }}
      >
        {image}
      </motion.div>
    </figure>
  );
}
