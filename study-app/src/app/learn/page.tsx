import type { Metadata } from "next";
import { LearnSession } from "@/components/learn-session";
import { getQuestions } from "@/domain/questions/repository";

export const metadata: Metadata = { title: "Adaptive Learn" };

export default function LearnPage() {
  return <LearnSession questions={getQuestions()} />;
}
