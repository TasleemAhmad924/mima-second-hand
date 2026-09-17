import { describe, expect, it } from "vitest";
import { ccm19, ccm19ScriptSrc } from "@/config/ccm19";

describe("CCM19 embed", () => {
  it("loads the German cloud snippet over https", () => {
    const src = ccm19ScriptSrc();
    expect(src.startsWith("https://cloud.ccm19.de/app.js?")).toBe(true);
    expect(src).toContain("lang=de_DE");
    expect(src).toContain(`domain=${ccm19.domainId}`);
    expect(src).not.toContain("http://");
  });
});
