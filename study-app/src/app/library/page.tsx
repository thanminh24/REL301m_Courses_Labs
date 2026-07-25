import type { Metadata } from "next";
import { QuestionLibrary } from "@/components/question-library";
import { getQuestions } from "@/domain/questions/repository";

export const metadata: Metadata = { title: "Question bank" };

export default function LibraryPage() {
  return <QuestionLibrary questions={getQuestions()} />;
}
