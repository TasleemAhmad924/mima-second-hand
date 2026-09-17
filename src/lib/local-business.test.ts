import { describe, expect, it } from "vitest";
import { buildLocalBusinessJsonLd } from "./local-business";

describe("LocalBusiness JSON-LD", () => {
  it("uses confirmed Stockelsdorf facts and does not invent ratings", () => {
    const data = buildLocalBusinessJsonLd();
    expect(data["@type"]).toBe("LocalBusiness");
    expect(data.name).toBe("MiMa Second Hand");
    expect(data.address.addressLocality).toBe("Stockelsdorf");
    expect(data.logo).toContain("/logo-transparent.png");
    expect(data.image).toEqual(
      expect.arrayContaining([
        expect.stringContaining("/images/miriam-regal.jpg"),
      ]),
    );
    expect(data).not.toHaveProperty("telephone");
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("geo");
    expect(data).not.toHaveProperty("priceRange");
    expect(JSON.stringify(data)).not.toContain("Lübeck");
  });
});
