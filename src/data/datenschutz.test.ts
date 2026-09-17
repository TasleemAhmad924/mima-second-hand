import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import type { LegalBlock } from "@/lib/legal/types";
import {
  DATENSCHUTZ_SECTIONS,
  DATENSCHUTZ_SOURCE,
} from "@/data/datenschutz";

function blockText(block: LegalBlock): string {
  switch (block.type) {
    case "h3":
    case "p":
    case "lead":
    case "formula":
    case "caps":
      return block.text;
    case "link":
      return `${block.label} ${block.href}`;
    case "rich":
      return block.parts.map((part) => part.text).join("");
    case "ul":
      return block.items.join(" ");
    case "clauses":
      return block.items
        .flatMap((item) => [
          item.text,
          ...(item.bullets ?? []),
          item.aside ?? "",
        ])
        .join(" ");
  }
}

function documentText(): string {
  return DATENSCHUTZ_SECTIONS.flatMap((section) => [
    section.title,
    ...section.blocks.map(blockText),
  ]).join("\n");
}

describe("Datenschutzerklärung", () => {
  it("publishes the supplied e-recht24 text with confirmed controller facts", () => {
    const text = documentText();

    expect(DATENSCHUTZ_SECTIONS).toHaveLength(7);
    expect(DATENSCHUTZ_SOURCE.href).toBe("https://www.e-recht24.de");
    expect(text).toContain(siteConfig.owner.name);
    expect(text).toContain(siteConfig.name);
    expect(text).toContain(siteConfig.address.street);
    expect(text).toContain(siteConfig.address.city);
    expect(text).toContain(siteConfig.contact.email);
    expect(text).toContain(siteConfig.contact.phone);
    expect(text).toContain("IONOS SE");
    expect(text).toContain("Instagram");
    expect(text).toContain("Meta Platforms Ireland Limited");
    expect(text).toContain("Newsletterdaten");
    expect(text).toContain("Google Analytics");
    expect(text).toContain("Google Fonts sind lokal installiert");
    expect(text).toContain("Google Maps");
    expect(text).toContain("Web3Forms");
    expect(text).toContain("WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO");
    expect(text).not.toContain("2 / 11");
    expect(text).not.toContain("wird derzeit vorbereitet");
  });
});
