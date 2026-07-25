import bank from "@/data/generated/question-bank.json";
import { questionSchema, type Question } from "@/data/question-schema";

const questions = bank.questions.map((question) =>
  questionSchema.parse(question),
);

export function getQuestions(): Question[] {
  return questions;
}

export function getQuestion(id: string): Question | undefined {
  return questions.find((question) => question.id === id);
}
