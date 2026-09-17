import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("sitemap", () => {
  it("lists only public canonical URLs with trailing slashes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(urls[0]).toBe("https://www.mima-second-hand.de/");
    expect(urls).toContain("https://www.mima-second-hand.de/regal-mieten/");
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
    expect(urls.join(" ")).not.toContain("/intern");
    expect(urls.join(" ")).not.toContain("/api/");
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
