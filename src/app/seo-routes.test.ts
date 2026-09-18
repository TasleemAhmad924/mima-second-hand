import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import { buildSitemapXml, sitemapEntries } from "@/lib/sitemap";

describe("sitemap", () => {
  it("lists only public canonical URLs with trailing slashes", () => {
    const entries = sitemapEntries("2026-09-18");
    const urls = entries.map((entry) => entry.url);
    expect(urls[0]).toBe("https://www.mima-second-hand.de/");
    expect(urls).toContain("https://www.mima-second-hand.de/regal-mieten/");
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
    expect(urls.join(" ")).not.toContain("/intern");
    expect(urls.join(" ")).not.toContain("/api/");
  });

  it("emits date-only lastmod XML that Search Console can parse", () => {
    const xml = buildSitemapXml(sitemapEntries("2026-09-18"));
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
      true,
    );
    expect(xml).toContain(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    );
    expect(xml).toContain("<lastmod>2026-09-18</lastmod>");
    expect(xml).not.toMatch(/<lastmod>[^<]*T/);
  });
});

describe("robots", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("blocks crawling on preview deployments", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.disallow).toBe("/");
    expect(result.sitemap).toBeUndefined();
  });

  it("allows production crawling except intern and API routes", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.allow).toBe("/");
    expect(rules.disallow).toEqual(["/intern/", "/api/"]);
    expect(result.sitemap).toBe("https://www.mima-second-hand.de/sitemap.xml");
  });
});
