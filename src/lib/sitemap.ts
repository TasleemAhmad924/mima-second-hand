import { canonicalUrl } from "@/lib/seo";

/** Public HTML routes only. No /intern, no /api. */
export const SITEMAP_PATHS = [
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
] as const;

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: "monthly";
  priority: number;
}

export function sitemapEntries(
  lastModified = new Date().toISOString().slice(0, 10),
): SitemapEntry[] {
  return SITEMAP_PATHS.map((path) => ({
    url: canonicalUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

export function buildSitemapXml(entries = sitemapEntries()): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority === 1 ? "1.0" : entry.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
