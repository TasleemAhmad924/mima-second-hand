import { describe, expect, it } from "vitest";
import { STORE_PLAN } from "@/data/store-plan";

describe("customer-facing store plan", () => {
  it("keeps a simple irregular footprint", () => {
    expect(STORE_PLAN.outline.length).toBeGreaterThanOrEqual(6);
    expect(STORE_PLAN.outline.length).toBeLessThanOrEqual(9);
    const xs = STORE_PLAN.outline.map(([x]) => x);
    const ys = STORE_PLAN.outline.map(([, y]) => y);
    expect(new Set(xs).size).toBeGreaterThan(3);
    expect(new Set(ys).size).toBeGreaterThan(3);
  });

  it("uses integer geometry so SSR and the browser match", () => {
    const numbers = [
      ...STORE_PLAN.outline.flat(),
      ...STORE_PLAN.shelves.flatMap((item) => [
        item.x,
        item.y,
        item.width,
        item.height,
      ]),
      ...STORE_PLAN.rooms.flatMap((item) => [
        item.x,
        item.y,
        item.width,
        item.height,
      ]),
      STORE_PLAN.stairs.x,
      STORE_PLAN.stairs.y,
      STORE_PLAN.stairs.width,
      STORE_PLAN.stairs.height,
      ...STORE_PLAN.labels.flatMap((item) => [item.x, item.y]),
    ];
    expect(numbers.every(Number.isInteger)).toBe(true);
  });

  it("makes four central aisles the visual anchor, with one shorter row", () => {
    const aisles = STORE_PLAN.shelves.filter((item) => item.kind === "aisle");
    expect(aisles).toHaveLength(4);
    const heights = aisles.map((item) => item.height).sort((a, b) => b - a);
    expect(heights[3]).toBeLessThan(heights[0]);
    expect(new Set(aisles.map((item) => item.width)).size).toBe(1);
  });

  it("groups wall shelves instead of tracing every module", () => {
    const walls = STORE_PLAN.shelves.filter((item) => item.kind === "wall");
    expect(walls.length).toBeGreaterThanOrEqual(3);
    expect(walls.length).toBeLessThanOrEqual(6);
  });

  it("keeps the play area inset from the south-west corner", () => {
    const play = STORE_PLAN.rooms.find((room) => room.kind === "play");
    expect(play).toBeDefined();
    const maxY = Math.max(...STORE_PLAN.outline.map(([, y]) => y));
    const minX = Math.min(...STORE_PLAN.outline.map(([x]) => x));
    expect(play!.y + play!.height).toBeLessThanOrEqual(maxY - 12);
    expect(play!.x).toBeGreaterThanOrEqual(minX + 8);
  });

  it("marks the visitor rooms without extra interaction", () => {
    expect(STORE_PLAN.rooms.map((room) => room.kind).sort()).toEqual(
      ["fitting", "kitchen", "play", "wc"].sort(),
    );
    const texts = STORE_PLAN.labels.map((label) => label.text);
    expect(texts).toEqual(
      expect.arrayContaining([
        "Mittelgänge",
        "Küche",
        "WC",
        "Umkleide",
        "Spielecke",
        "Treppe",
      ]),
    );
    expect(
      STORE_PLAN.legend
        .filter((item) => item.group === "primary")
        .map((item) => item.label),
    ).toEqual(["Mittelgänge", "Wandregale"]);
    expect(
      STORE_PLAN.legend
        .filter((item) => item.group === "secondary")
        .map((item) => item.label),
    ).toEqual(["Küche", "WC", "Umkleide", "Spielecke", "Treppe"]);
    expect(
      STORE_PLAN.legend.every(
        (item) => item.color.startsWith("#") && item.color.length === 7,
      ),
    ).toBe(true);
  });
});
