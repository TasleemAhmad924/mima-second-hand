"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, DUR, VIEWPORT } from "@/lib/motion";

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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const skip = mounted && prefersReduced === true;

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
        className="absolute inset-0 h-full w-full origin-center"
        initial={skip ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        {...(skip || immediate
          ? { animate: { opacity: 1, scale: 1 } }
          : { whileInView: { opacity: 1, scale: 1 }, viewport: VIEWPORT })}
        transition={{
          duration: skip ? 0 : DUR.image,
          ease: EASE_OUT,
          delay: skip ? 0 : delay,
        }}
      >
        {image}
      </motion.div>
    </figure>
  );
}
