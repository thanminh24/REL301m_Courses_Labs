import { describe, expect, it } from "vitest";
import bank from "@/data/generated/question-bank.json";
import qa from "@/data/generated/content-qa-manifest.json";
import { questionSchema } from "@/data/question-schema";

describe("canonical question bank", () => {
  it("contains every ID Q001 through Q317 exactly once", () => {
    const ids = bank.questions.map((question) => question.id);
    expect(ids).toEqual(
      Array.from(
        { length: 317 },
        (_, index) => `Q${String(index + 1).padStart(3, "0")}`,
      ),
    );
    expect(new Set(ids).size).toBe(317);
  });

  it("passes the runtime schema for all records", () => {
    expect(() =>
      bank.questions.forEach((question) => questionSchema.parse(question)),
    ).not.toThrow();
  });

  it("preserves audited verdict and evidence totals", () => {
    expect(bank.counts.verdicts).toEqual({
      correct: 149,
      incorrect: 31,
      "acceptable-with-caveat": 99,
      "bank-key-only": 38,
    });
    expect(bank.counts.evidence).toEqual({
      lecture: 225,
      book: 54,
      "question-bank": 38,
    });
  });

  it("keeps exam and conceptual answers separate on known anomalies", () => {
    const byId = Object.fromEntries(
      bank.questions.map((question) => [question.id, question]),
    );
    expect(byId.Q002.examAnswer.letter).toBe("C");
    expect(byId.Q002.conceptualAnswer.acceptedLetters).toEqual([]);
    expect(byId.Q004.examAnswer.letter).toBe("C");
    expect(byId.Q004.conceptualAnswer.kind).toBe("manual-review");
    expect(byId.Q004.explanation).toMatch(/exam-bank association/i);
    expect(byId.Q004.explanation).toMatch(/bootstrapping/i);
    expect(byId.Q188.examAnswer.letter).toBe("A");
    expect(byId.Q188.conceptualAnswer.acceptedLetters).toEqual(["A", "B"]);
    expect(byId.Q224.examAnswer.letter).toBe("C");
    expect(byId.Q224.conceptualAnswer.acceptedLetters).toEqual(["B", "C"]);
  });

  it("has a passing content QA row for every question", () => {
    expect(qa.rows).toHaveLength(317);
    for (const row of qa.rows) {
      expect(Object.values(row)).not.toContain(false);
    }
  });
});
