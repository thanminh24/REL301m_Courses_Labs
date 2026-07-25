import type { Metadata } from "next";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { getQuestions } from "@/domain/questions/repository";

export const metadata: Metadata = { title: "Flashcards" };

export default function FlashcardsPage() {
  return <FlashcardDeck questions={getQuestions()} />;
}
