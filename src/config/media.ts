/**
 * Public photography slots. Swap `src` when the real asset lands.
 * Do not invent a fake storefront photograph.
 */
export const heroImage = {
  /** Current fallback until the client delivers the real Laden photo. */
  src: "/images/store-interior.jpg",
  /** Intended production path once the final file exists. */
  intendedSrc: "/images/mima-store-hero.jpg",
  alt: "Blick in den Second-Hand-Laden von MiMa in Stockelsdorf.",
  objectPosition: "center 42%",
  mobileObjectPosition: "center 38%",
} as const;

export const miriamPortrait = {
  src: "/images/miriam-regal.jpg",
  alt: "Miriam Vlot steht neben einem offenen Holzregal von MiMa Second Hand.",
  objectPosition: "center center",
} as const;
