import { buildSitemapXml } from "@/lib/sitemap";

export const dynamic = "force-static";

/**
 * Custom route so Google Search Console gets XML with charset and without
 * Next's `Content-Disposition: filename=…` metadata-file header.
 */
export function GET() {
  return new Response(buildSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
