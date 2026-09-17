import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Absolute path beginning with "/", used for canonical + OG url. */
  path: string;
}

export function siteOrigin(): string {
  return siteConfig.url.replace(/\/$/, "");
}

/** HTML routes use a trailing slash to match `trailingSlash: true`. */
export function withTrailingSlash(path: string): string {
  if (path === "" || path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function canonicalUrl(path: string): string {
  const origin = siteOrigin();
  const normalized = withTrailingSlash(path);
  return normalized === "/" ? `${origin}/` : `${origin}${normalized}`;
}

export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${normalized}`;
}

/**
 * Preview/staging (Vercel `VERCEL_ENV !== production`) must not be indexed.
 * Production Vercel and other production hosts may be indexed.
 */
export function isIndexableDeployment(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === "production";
  return process.env.NODE_ENV === "production";
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
  const canonical = withTrailingSlash(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      title: ogTitle,
      description,
    },
  };
}
