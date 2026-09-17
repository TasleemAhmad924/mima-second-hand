"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { heroImage } from "@/config/media";
import { EASE_OUT } from "@/lib/motion";

/**
 * Hero storefront: a short settle, then a slow inward drift toward the shop.
 * Reduced-motion users get the crop without movement.
 */
export function HeroPhoto() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const skip = mounted && prefersReduced === true;

  return (
    <figure
      className="hero-photo media-crop relative overflow-hidden aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[38rem]"
      style={{
        ["--media-pos" as string]: heroImage.objectPosition,
        ["--media-pos-mobile" as string]: heroImage.mobileObjectPosition,
      }}
    >
      <motion.div
        className="absolute inset-0 origin-[62%_58%]"
        initial={skip ? false : { opacity: 0, scale: 1.1, y: 12 }}
        animate={
          skip
            ? { opacity: 1, scale: 1, y: 0, x: 0 }
            : {
                opacity: 1,
                scale: [1.1, 1.03, 1.06],
                y: [12, 0, -6],
                x: [0, 0, -10],
              }
        }
        transition={
          skip
            ? { duration: 0 }
            : {
                duration: 14,
                times: [0, 0.14, 1],
                ease: EASE_OUT,
              }
        }
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-warm/50 to-transparent lg:block"
      />
    </figure>
  );
}
