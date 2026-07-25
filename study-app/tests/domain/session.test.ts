import { describe, expect, it } from "vitest";
import { getQuestion, getQuestions } from "@/domain/questions/repository";
import {
  createAdaptiveQueue,
  gradeConceptAnswer,
  gradeExamAnswer,
  gradeSingleChoiceConceptAnswer,
  gradeWrittenConceptAnswer,
} from "@/domain/study/session";

describe("study sessions", () => {
  it("prioritizes difficult questions and avoids duplicates", () => {
    const queue = createAdaptiveQueue(
      getQuestions(),
      ["Q188", "Q002"],
      ["Q001"],
      10,
    );
    expect(queue.slice(0, 2).map((question) => question.id).sort()).toEqual([
      "Q002",
      "Q188",
    ]);
    expect(new Set(queue.map((question) => question.id)).size).toBe(10);
  });

  it("grades school-bank and conceptual answers independently", () => {
    const question = getQuestion("Q188");
    expect(question).toBeDefined();
    expect(gradeExamAnswer(question!, ["A"])).toBe(true);
    expect(gradeExamAnswer(question!, ["A", "B"])).toBe(false);
    expect(gradeConceptAnswer(question!, ["A", "B"])).toBe(true);
    expect(gradeConceptAnswer(question!, ["A"])).toBe(false);
    expect(gradeSingleChoiceConceptAnswer(question!, ["A"])).toBeNull();
    expect(
      gradeSingleChoiceConceptAnswer(getQuestion("Q224")!, ["C"]),
    ).toBeNull();
  });

  it("returns manual grading for corrected free-form items", () => {
    const question = getQuestion("Q002");
    expect(gradeConceptAnswer(question!, ["C"])).toBeNull();
    expect(gradeWrittenConceptAnswer(question!, question!.examAnswer.text)).toBeNull();
    const nonUniqueManualReview = getQuestion("Q229");
    expect(gradeConceptAnswer(nonUniqueManualReview!, ["C"])).toBeNull();
    expect(
      gradeWrittenConceptAnswer(
        nonUniqueManualReview!,
        nonUniqueManualReview!.conceptualAnswer.aliases[0] ?? "",
      ),
    ).toBeNull();
  });
});
