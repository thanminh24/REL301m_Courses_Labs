export type Attempt = {
  questionId: string;
  mode: "flashcards" | "learn" | "test" | "match";
  sessionId: string;
  correct: boolean;
  conceptCorrect: boolean | null;
  selected: string[];
  at: string;
};

export type StudyState = {
  version: 1;
  favorites: string[];
  mastered: string[];
  difficult: string[];
  attempts: Attempt[];
  dailyGoal: number;
  lastStudiedAt: string | null;
};

export const initialStudyState: StudyState = {
  version: 1,
  favorites: [],
  mastered: [],
  difficult: [],
  attempts: [],
  dailyGoal: 20,
  lastStudiedAt: null,
};
