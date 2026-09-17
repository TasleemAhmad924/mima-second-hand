import { describe, expect, it } from "vitest";
import { web3forms } from "@/config/web3forms";

describe("Web3Forms", () => {
  it("uses the public HTTPS submit endpoint and a UUID access key", () => {
    expect(web3forms.submitUrl).toBe("https://api.web3forms.com/submit");
    expect(web3forms.accessKey).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });
});
