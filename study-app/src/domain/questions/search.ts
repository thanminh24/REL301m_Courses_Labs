import type { Question } from "@/data/question-schema";

export type QuestionFilters = {
  query?: string;
  course?: string;
  topic?: string;
  verdict?: Question["verdict"] | "all";
  evidence?: Question["evidence"]["type"] | "all";
  mastery?: "all" | "mastered" | "difficult";
  favorites?: ReadonlySet<string>;
  mastered?: ReadonlySet<string>;
  difficult?: ReadonlySet<string>;
};

export function filterQuestions(
  questions: Question[],
  filters: QuestionFilters,
): Question[] {
  const query = filters.query?.trim().toLocaleLowerCase() ?? "";
  return questions.filter((question) => {
    const matchesQuery =
      !query ||
      [
        question.id,
        question.stem,
        question.topic,
        question.concept,
        question.explanation,
        question.keyTakeaway,
        ...Object.values(question.options),
        ...Object.values(question.optionRationales),
      ].some((value) => value.toLocaleLowerCase().includes(query));
    const matchesCourse =
      !filters.course ||
      filters.course === "all" ||
      question.module.startsWith(filters.course);
    const matchesVerdict =
      !filters.verdict ||
      filters.verdict === "all" ||
      question.verdict === filters.verdict;
    const matchesTopic =
      !filters.topic ||
      filters.topic === "all" ||
      question.topic === filters.topic;
    const matchesEvidence =
      !filters.evidence ||
      filters.evidence === "all" ||
      question.evidence.type === filters.evidence;
    const matchesMastery =
      !filters.mastery ||
      filters.mastery === "all" ||
      (filters.mastery === "mastered" &&
        Boolean(filters.mastered?.has(question.id))) ||
      (filters.mastery === "difficult" &&
        Boolean(filters.difficult?.has(question.id)));
    const matchesFavorites =
      !filters.favorites || filters.favorites.has(question.id);
    return (
      matchesQuery &&
      matchesCourse &&
      matchesTopic &&
      matchesVerdict &&
      matchesEvidence &&
      matchesMastery &&
      matchesFavorites
    );
  });
}
