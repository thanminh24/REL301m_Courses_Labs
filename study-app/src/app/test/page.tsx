import type { Metadata } from "next";
import { PracticeTest } from "@/components/practice-test";
import { getQuestions } from "@/domain/questions/repository";

export const metadata: Metadata = { title: "Practice Test" };

export default function TestPage() {
  return <PracticeTest questions={getQuestions()} />;
}
