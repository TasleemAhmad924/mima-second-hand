import type { MetadataRoute } from "next";
import { isIndexableDeployment, siteOrigin } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/intern/", "/api/"],
    },
    sitemap: `${siteOrigin()}/sitemap.xml`,
    host: siteConfig.url,
  };
}
