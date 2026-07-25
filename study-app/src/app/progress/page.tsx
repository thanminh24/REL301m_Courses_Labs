import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { getQuestions } from "@/domain/questions/repository";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  return <ProgressDashboard questions={getQuestions()} />;
}
