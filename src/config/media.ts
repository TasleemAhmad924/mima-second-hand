/**
 * Public photography slots. Swap `src` when a higher-resolution exterior lands.
 * Hero uses static WebP so the LCP preload URL matches the image request.
 */
export const heroImage = {
  src: "/images/mima-store-hero.webp",
  srcMobile: "/images/mima-store-hero-640.webp",
  fallbackSrc: "/images/mima-store-hero.jpg",
  intendedSrc: "/images/mima-store-hero.webp",
  alt: "Außenansicht des Second-Hand-Ladens von MiMa an der Segeberger Straße in Stockelsdorf.",
  objectPosition: "68% 58%",
  mobileObjectPosition: "62% 62%",
} as const;

export const miriamPortrait = {
  src: "/images/miriam-regal.jpg",
  alt: "Miriam Vlot steht neben einem offenen Holzregal von MiMa Second Hand.",
  objectPosition: "center center",
} as const;

export const comfortImage = {
  src: "/images/comfort-seating.jpg",
  alt: "Helle Sitzecke in Beige- und Naturtönen, stellvertretend für den Wohlfühlort bei MiMa.",
  objectPosition: "center 60%",
} as const;
