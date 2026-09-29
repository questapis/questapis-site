import { describe, expect, it } from "vitest";
import { changelog } from "./changelog";
import { faqGroups } from "./help-content";
import { allAcademyQuests, courseQuests, regions } from "./learning-regions";

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

  it("publishes three distinct playable quests for every Academy region", () => {
    expect(regions).toHaveLength(8);
    expect(courseQuests.every((course) => course.length === 3)).toBe(true);
    expect(allAcademyQuests).toHaveLength(24);
    expect(new Set(allAcademyQuests.map((quest) => quest.slug)).size).toBe(24);
    expect(allAcademyQuests.every((quest) => quest.answers[quest.correctAnswer] && quest.answerKey)).toBe(true);
  });
});
