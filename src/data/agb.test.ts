import { describe, expect, it } from "vitest";
import { AGB_DOCUMENT } from "@/data/agb";

describe("AGB document", () => {
  it("contains the supplied August 2026 terms with the confirmed owner", () => {
    expect(AGB_DOCUMENT.sections).toHaveLength(42);
    expect(AGB_DOCUMENT.published).toBe("August 2026");
    expect(AGB_DOCUMENT.party.city).toBe("Stockelsdorf");
    expect(AGB_DOCUMENT.party.ownerName).toBe("Miriam Vlot");
    expect(AGB_DOCUMENT.party.email).toBe("info@mima-secondhand.de");
    expect(AGB_DOCUMENT.sections[0]?.blocks[0]).toMatchObject({
      type: "clauses",
    });
    expect(
      AGB_DOCUMENT.sections[0]?.blocks[0]?.type === "clauses" &&
        AGB_DOCUMENT.sections[0].blocks[0].items[0]?.text.includes(
          "Inhaberin Miriam Vlot",
        ),
    ).toBe(true);
    expect(
      AGB_DOCUMENT.sections.some((section) =>
        section.blocks.some(
          (block) =>
            block.type === "clauses" &&
            block.items.some((item) => item.text.includes("15 %")),
        ),
      ),
    ).toBe(true);
  });
});
