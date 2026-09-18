import { heroImage } from "@/config/media";

/**
 * Discover the LCP photo before CCM19 blocks the parser.
 * Must stay the first tag in <head>.
 */
export function HeroPreload() {
  return (
    <link
      rel="preload"
      as="image"
      href={heroImage.srcMobile}
      imageSrcSet={`${heroImage.srcMobile} 640w, ${heroImage.src} 864w`}
      imageSizes="(max-width: 1024px) 100vw, 50vw"
      type="image/webp"
      fetchPriority="high"
    />
  );
}
