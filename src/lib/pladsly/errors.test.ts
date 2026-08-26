import { describe, it, expect } from "vitest";
import {
  IntegrationError,
  userMessageFor,
  statusFor,
} from "@/lib/pladsly/errors";

describe("IntegrationError factories", () => {
  it("carry the right code and status", () => {
    expect(IntegrationError.notConfigured("x").status).toBe(503);
    expect(IntegrationError.notImplemented("x").status).toBe(501);
    expect(IntegrationError.unavailable("x").status).toBe(502);
    expect(IntegrationError.timeout("x").status).toBe(504);
    expect(IntegrationError.rateLimited("x").status).toBe(429);
    expect(IntegrationError.invalidInput("x").status).toBe(400);
    expect(IntegrationError.notFound("x").status).toBe(404);
  });
});

describe("userMessageFor", () => {
  it("never leaks internal error text", () => {
    const err = IntegrationError.unavailable("secret-endpoint /v1/keys");
    const msg = userMessageFor(err);
    expect(msg).not.toContain("secret-endpoint");
    expect(msg).toMatch(/nicht erreichbar/i);
  });

  it("gives a specific message for invalid input", () => {
    expect(userMessageFor(IntegrationError.invalidInput("date"))).toMatch(
      /ungültig/i,
    );
  });

  it("defaults unknown errors to a safe message", () => {
    expect(userMessageFor(new Error("boom"))).toMatch(/nicht erreichbar/i);
    expect(statusFor(new Error("boom"))).toBe(502);
  });
});
