import { describe, expect, it } from "vitest";
import {
  SEEDED_SHELVES,
  STORE_LAYOUT,
  STORE_MAP_TRACE,
  STORE_ZONES,
  buildShelfSeed,
  exactShelfCount,
} from "@/data/store-layout";

describe("store layout from the client floor plan", () => {
  it("does not treat any drawn total as confirmed inventory", () => {
    expect(exactShelfCount.status).toBe("open");
    expect(STORE_LAYOUT.metadata.exactShelfCount.status).toBe("open");
    expect(STORE_LAYOUT.metadata.verbalShelfMention).toBe(140);
    expect(STORE_MAP_TRACE).toBe(false);
  });

  it("builds unique layout-local visual bays from traced rows", () => {
    const shelves = buildShelfSeed();
    expect(shelves.length).toBeGreaterThan(0);
    expect(new Set(shelves.map((shelf) => shelf.label)).size).toBe(
      shelves.length,
    );
    expect(SEEDED_SHELVES.every((shelf) => shelf.active)).toBe(true);
    expect(STORE_ZONES.map((zone) => zone.id)).toEqual(
      STORE_LAYOUT.zones.map((zone) => zone.id),
    );
  });

  it("represents the marked store areas", () => {
    const kinds = STORE_LAYOUT.fixtures.map((fixture) => fixture.kind);
    expect(kinds).toEqual(
      expect.arrayContaining([
        "kitchen",
        "wc",
        "fitting",
        "play",
        "stairs",
      ]),
    );
    expect(STORE_LAYOUT.rows.some((item) => item.kind === "central")).toBe(
      true,
    );
    expect(STORE_LAYOUT.rows.some((item) => item.kind === "wall")).toBe(true);
  });

  it("keeps four central aisles with the fourth row shorter", () => {
    const a = STORE_LAYOUT.rows.find((item) => item.id === "row-aisle-a");
    const b = STORE_LAYOUT.rows.find((item) => item.id === "row-aisle-b");
    const c = STORE_LAYOUT.rows.find((item) => item.id === "row-aisle-c");
    const d = STORE_LAYOUT.rows.find((item) => item.id === "row-aisle-d");
    expect(a && b && c && d).toBeTruthy();
    expect(a?.unitCount).toBe(26);
    expect(b?.unitCount).toBe(26);
    expect(c?.unitCount).toBe(26);
    expect(d?.unitCount).toBe(16);
    expect(d!.height).toBeLessThan(a!.height);
    expect(d!.height).toBeLessThan(b!.height);
    expect(d!.height).toBeLessThan(c!.height);
    expect(
      STORE_LAYOUT.rows.filter((item) => item.id.startsWith("row-south-"))
        .length,
    ).toBeGreaterThanOrEqual(4);
    expect(STORE_LAYOUT.rows.some((item) => item.id === "row-six")).toBe(true);
  });

  it("uses the confirmed open-shelf type", () => {
    expect(STORE_LAYOUT.shelfTypes[0]).toMatchObject({
      widthCm: 90,
      depthCm: 49,
      heightCm: 181,
    });
  });
});
