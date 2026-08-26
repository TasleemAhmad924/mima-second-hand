import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Absolute path beginning with "/", used for canonical + OG url. */
  path: string;
}

/**
 * Builds per-page metadata with a unique title, description, canonical URL and
 * Open Graph / Twitter fields. The document <title> receives the site suffix via
 * the template in the root layout; OG titles include it explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const ogTitle = `${title} · ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      title: ogTitle,
      description,
    },
  };
}
