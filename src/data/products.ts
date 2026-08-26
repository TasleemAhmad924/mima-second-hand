import type { CategoryMeta, Product } from "@/types";

/**
 * MOCK discovery products.
 *
 * Placeholder catalogue used to design the discovery experience. Real products
 * will later come from the provider catalogue (see `src/lib/pladsly.ts`).
 * Images are temporary editorial stand-ins, not final MiMa store photography.
 */
export const mockProducts: Product[] = [
  {
    id: "p-trench",
    title: "Trenchcoat, Baumwolle",
    category: "mode",
    detail: "Gr. 38 · sehr gut erhalten",
    image: "/images/product-trench.jpg",
    ratio: "portrait",
    alt: "Beiger Trenchcoat aus Baumwolle auf einem Holzbügel an einer hellen Wand.",
  },
  {
    id: "p-knit",
    title: "Strick, gestapelt",
    category: "mode",
    detail: "Wolle & Kaschmir · verschiedene Größen",
    image: "/images/product-knitwear.jpg",
    ratio: "portrait",
    alt: "Ein Stapel gefalteter Strickpullover in Naturtönen auf einem Holzregal.",
  },
  {
    id: "p-satchel",
    title: "Ledertasche, Vintage",
    category: "accessoires",
    detail: "Rindsleder · schöne Patina",
    image: "/images/product-satchel.jpg",
    ratio: "portrait",
    alt: "Braune Ledertasche mit Schnallen auf einem alten Holzhocker.",
  },
  {
    id: "p-ceramics",
    title: "Keramik-Set",
    category: "wohnen",
    detail: "Kanne & Becher · handgetöpfert",
    image: "/images/product-ceramics.jpg",
    ratio: "portrait",
    alt: "Getöpferte Teekanne und Becher auf einem Leinentuch vor warmem Hintergrund.",
  },
  {
    id: "p-basketbag",
    title: "Korbtasche mit Leder",
    category: "accessoires",
    detail: "Sommerstück · Einzelstück",
    image: "/images/product-basketbag.jpg",
    ratio: "portrait",
    alt: "Hochwertige Korbtasche mit hellem Lederbesatz in einer Vitrine.",
  },
  {
    id: "p-cups",
    title: "Becher, Steingut",
    category: "wohnen",
    detail: "4 Stück · Naturtöne",
    image: "/images/product-cups.jpg",
    ratio: "landscape",
    alt: "Vier schlichte Steingut-Becher in Creme- und Sandtönen.",
  },
  {
    id: "p-bomber",
    title: "Blouson, leicht",
    category: "mode",
    detail: "Übergangsjacke · Gr. M",
    image: "/images/product-bomber.jpg",
    ratio: "portrait",
    alt: "Rostbrauner leichter Blouson auf einem Bügel vor grauem Hintergrund.",
  },
  {
    id: "p-hoodie",
    title: "Denim & Sweat",
    category: "mode",
    detail: "Zwei Teile · gepflegter Zustand",
    image: "/images/product-hoodie.jpg",
    ratio: "landscape",
    alt: "Weißer Kapuzenpullover und eine helle Jeans nebeneinander an einer Wand.",
  },
];

export const productCategories: CategoryMeta[] = [
  { id: "alle", label: "Alles" },
  { id: "mode", label: "Mode" },
  { id: "accessoires", label: "Accessoires" },
  { id: "wohnen", label: "Wohnen" },
  { id: "buecher", label: "Bücher" },
];
