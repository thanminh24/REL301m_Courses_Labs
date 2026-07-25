import type { AnswerLetter, Question } from "@/data/question-schema";

export function shuffle<T>(values: readonly T[]): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function shuffleSeeded<T>(values: readonly T[], seed: number): T[] {
  const result = [...values];
  let state = seed >>> 0;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function createAdaptiveQueue(
  questions: Question[],
  difficult: string[],
  mastered: string[],
  size = 10,
  seed = 1,
): Question[] {
  const difficultSet = new Set(difficult);
  const masteredSet = new Set(mastered);
  const priority = shuffleSeeded(
    questions.filter((question) => difficultSet.has(question.id)),
    seed,
  );
  const unseen = shuffleSeeded(
    questions.filter(
      (question) =>
        !difficultSet.has(question.id) && !masteredSet.has(question.id),
    ),
    seed + 1,
  );
  const masteredQuestions = shuffleSeeded(
    questions.filter((question) => masteredSet.has(question.id)),
    seed + 2,
  );
  return [...priority, ...unseen, ...masteredQuestions].slice(0, size);
}

export function gradeExamAnswer(
  question: Question,
  selected: AnswerLetter[],
): boolean {
  return selected.length === 1 && selected[0] === question.examAnswer.letter;
}

export function gradeConceptAnswer(
  question: Question,
  selected: AnswerLetter[],
): boolean | null {
  if (
    question.conceptualAnswer.kind === "manual-review" ||
    question.conceptualAnswer.kind === "freeform"
  ) {
    return null;
  }
  const accepted = question.conceptualAnswer.acceptedLetters;
  if (!accepted.length) return null;
  return (
    accepted.length === selected.length &&
    accepted.every((letter) => selected.includes(letter))
  );
}

export function gradeSingleChoiceConceptAnswer(
  question: Question,
  selected: AnswerLetter[],
): boolean | null {
  if (question.conceptualAnswer.kind === "multiple") return null;
  return gradeConceptAnswer(question, selected);
}

const normalizeWrittenAnswer = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

export function gradeWrittenConceptAnswer(
  question: Question,
  response: string,
): boolean | null {
  if (
    question.conceptualAnswer.kind === "manual-review" ||
    question.conceptualAnswer.kind === "freeform"
  ) {
    return null;
  }
  const accepted = [
    question.conceptualAnswer.display,
    ...question.conceptualAnswer.aliases,
  ]
    .filter((value): value is string => Boolean(value))
    .map(normalizeWrittenAnswer);
  if (!accepted.length) return null;
  return accepted.includes(normalizeWrittenAnswer(response));
}
