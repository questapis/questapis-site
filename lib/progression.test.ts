import { describe, expect, it } from "vitest";
import { levelFromXp, levelProgress } from "./progression";

describe("progression", () => {
  it("uses centralized cumulative thresholds", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(100)).toBe(2);
    expect(levelFromXp(259)).toBe(2);
  });

  it("returns progress within the current level", () => {
    expect(levelProgress(180)).toEqual({ level: 2, current: 80, required: 160, percent: 50 });
  });

  it("rejects forged invalid values", () => {
    expect(() => levelFromXp(-1)).toThrow();
    expect(() => levelFromXp(2.5)).toThrow();
  });
});

