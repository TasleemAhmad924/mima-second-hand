import { describe, expect, it } from "vitest";
import { recommendRentalPlan } from "@/lib/rental-recommender";

describe("rental-model recommender", () => {
  it("maps a short stay to 2 Wochen", () => {
    expect(recommendRentalPlan("up-to-2-weeks", "many")).toBe("wochen-2");
  });

  it("maps about 3-4 weeks to 4 Wochen", () => {
    expect(recommendRentalPlan("about-4-weeks")).toBe("wochen-4");
  });

  it("maps long-term intent to 3 Monate", () => {
    expect(recommendRentalPlan("up-to-3-months", "few")).toBe("monate-3");
  });

  it("upgrades several weeks only when volume is many", () => {
    expect(recommendRentalPlan("several-weeks", "some")).toBe("wochen-4");
    expect(recommendRentalPlan("several-weeks", "many")).toBe("monate-3");
  });
});
