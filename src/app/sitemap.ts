import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const routes = [
  "/",
  "/regal-mieten",
  "/so-funktionierts",
  "/preise",
  "/entdecken",
  "/ueber-mima",
  "/faq",
  "/kontakt",
  "/mein-mima",
  "/impressum",
  "/datenschutz",
  "/agb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: canonicalUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
