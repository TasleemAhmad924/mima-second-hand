import { describe, it, expect } from "vitest";
import { mapPladslyProduct, mapPladslyProducts } from "@/lib/pladsly/products.server";
import { IntegrationError } from "@/lib/pladsly/errors";
import type { PladslyProductDTO } from "@/lib/pladsly/types";

describe("mapPladslyProduct", () => {
  it("maps a complete DTO into the UI product shape", () => {
    const dto: PladslyProductDTO = {
      id: "abc",
      title: "Wollpullover",
      category: "Fashion",
      size: "M",
      available: true,
      imageUrl: "https://cdn.example/x.jpg",
    };
    const product = mapPladslyProduct(dto);
    expect(product.id).toBe("abc");
    expect(product.title).toBe("Wollpullover");
    expect(product.category).toBe("mode");
    expect(product.detail).toContain("Gr. M");
    expect(product.detail).toContain("verfügbar");
    expect(product.image).toBe("https://cdn.example/x.jpg");
  });

  it("maps unknown categories to a safe default", () => {
    const product = mapPladslyProduct({ id: "1", title: "X", category: "weird" });
    expect(product.category).toBe("mode");
  });

  it("falls back to a placeholder image when none is provided", () => {
    const product = mapPladslyProduct({ id: "1", title: "X" });
    expect(product.image).toMatch(/^\/images\//);
  });

  it("throws malformed on missing identity fields", () => {
    // @ts-expect-error intentional malformed input
    expect(() => mapPladslyProduct({ title: "no id" })).toThrow(IntegrationError);
  });
});

describe("mapPladslyProducts", () => {
  it("maps a list and skips malformed entries", () => {
    const result = mapPladslyProducts([
      { id: "1", title: "Ok" },
      { title: "broken" },
      { id: "2", title: "Also ok", category: "home" },
    ]);
    expect(result).toHaveLength(2);
    expect(result[1].category).toBe("wohnen");
  });

  it("returns an empty array for an empty list", () => {
    expect(mapPladslyProducts([])).toEqual([]);
  });

  it("throws malformed when the payload is not an array", () => {
    expect(() => mapPladslyProducts({} as unknown)).toThrow(IntegrationError);
  });
});
