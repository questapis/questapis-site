import { describe, expect, it } from "vitest";
import { changelog } from "./changelog";
import { faqGroups } from "./help-content";
import { regions } from "./learning-regions";

describe("public support content", () => {
  it("keeps changelog entries newest first", () => {
    const dates = changelog.map((entry) => entry.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("does not duplicate FAQ questions", () => {
    const questions = faqGroups.flatMap((group) => group.questions.map((item) => item.question));
    expect(new Set(questions).size).toBe(questions.length);
  });

  it("documents limitations for every release that claims a foundation", () => {
    const foundation = changelog.find((entry) => entry.title.includes("foundation"));
    expect(foundation?.groups.some((group) => group.kind === "Known limitation")).toBe(true);
  });

  it("publishes a distinct playable quest for every Academy region", () => {
    expect(regions).toHaveLength(8);
    expect(new Set(regions.map((region) => region.slug)).size).toBe(8);
    expect(regions.every((region) => region.answers[region.correctAnswer] && region.answerKey)).toBe(true);
  });
});
