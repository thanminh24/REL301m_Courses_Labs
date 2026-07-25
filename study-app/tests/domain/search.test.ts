import { describe, expect, it } from "vitest";
import { getQuestions } from "@/domain/questions/repository";
import { filterQuestions } from "@/domain/questions/search";

describe("question search", () => {
  const questions = getQuestions();

  it("searches by ID and normalized concept", () => {
    expect(filterQuestions(questions, { query: "Q188" })).toHaveLength(1);
    expect(
      filterQuestions(questions, { query: "first-visit versus every-visit" }),
    ).toEqual(expect.arrayContaining([expect.objectContaining({ id: "Q188" })]));
  });

  it("searches answer options, explanations, takeaways, and rationales", () => {
    const source = questions.find((question) => question.id === "Q188")!;
    for (const query of [
      source.options.B,
      source.explanation,
      source.keyTakeaway,
      source.optionRationales.A,
    ]) {
      expect(filterQuestions(questions, { query })).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: source.id })]),
      );
    }
  });

  it("combines course, verdict, and favorite filters", () => {
    const result = filterQuestions(questions, {
      course: "C2",
      verdict: "incorrect",
      favorites: new Set(["Q002", "Q188", "Q224", "Q300"]),
    });
    expect(result.map((question) => question.id)).toEqual([
      "Q002",
      "Q188",
      "Q224",
    ]);
  });
});
