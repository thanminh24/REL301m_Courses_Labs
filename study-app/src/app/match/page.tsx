import type { Metadata } from "next";
import { MatchGame } from "@/components/match-game";
import { getQuestions } from "@/domain/questions/repository";

export const metadata: Metadata = { title: "Match" };

export default function MatchPage() {
  return <MatchGame questions={getQuestions()} />;
}
