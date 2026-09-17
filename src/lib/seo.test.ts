import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assetUrl,
  canonicalUrl,
  isIndexableDeployment,
  pageMetadata,
  withTrailingSlash,
} from "./seo";

describe("canonical URL helpers", () => {
  it("adds a trailing slash to HTML routes", () => {
    expect(withTrailingSlash("/")).toBe("/");
    expect(withTrailingSlash("/regal-mieten")).toBe("/regal-mieten/");
    expect(withTrailingSlash("/faq/")).toBe("/faq/");
  });

  it("builds production canonicals with a trailing slash", () => {
    expect(canonicalUrl("/")).toBe("https://www.mima-second-hand.de/");
    expect(canonicalUrl("/regal-mieten")).toBe(
      "https://www.mima-second-hand.de/regal-mieten/",
    );
    expect(assetUrl("/logo-transparent.png")).toBe(
      "https://www.mima-second-hand.de/logo-transparent.png",
    );
  });

  it("puts the trailing-slash path on page metadata", () => {
    const meta = pageMetadata({
      title: "Regal mieten",
      description: "Test",
      path: "/regal-mieten",
    });
    expect(meta.alternates?.canonical).toBe("/regal-mieten/");
    expect(meta.openGraph?.url).toBe("/regal-mieten/");
  });
});

describe("isIndexableDeployment", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("indexes only Vercel production when VERCEL_ENV is set", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NODE_ENV", "production");
    expect(isIndexableDeployment()).toBe(false);

    vi.stubEnv("VERCEL_ENV", "production");
    expect(isIndexableDeployment()).toBe(true);
  });
});
