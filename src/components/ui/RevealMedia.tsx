"use client";

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
}: RevealMediaProps) {
  const reduceMotion = useReducedMotion();

  const image = (
    <div className={`absolute inset-0 ${zoom ? "media-zoom" : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {reduceMotion ? (
        image
      ) : (
        <motion.div
          className="absolute inset-0 h-full w-full origin-center"
          initial={{ opacity: 0, scale: 1.06 }}
          {...(immediate
            ? { animate: { opacity: 1, scale: 1 } }
            : { whileInView: { opacity: 1, scale: 1 }, viewport: VIEWPORT })}
          transition={{ duration: DUR.image, ease: EASE_OUT, delay }}
        >
          {image}
        </motion.div>
      )}
    </figure>
  );
}
