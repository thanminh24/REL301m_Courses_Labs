import type { Question } from "@/data/question-schema";
import { VerdictBadge } from "./verdict-badge";

export function QuestionExplanation({ question }: { question: Question }) {
  return (
    <div className="explanation-panel">
      <div className="explanation-heading">
        <VerdictBadge verdict={question.verdict} />
        <span className="evidence-label">
          {question.evidence.type === "lecture"
            ? `${question.evidence.lecture} · slides ${question.evidence.slides}`
            : question.evidence.type === "book"
              ? question.evidence.locator?.section
              : "Canonical tested question bank"}
        </span>
      </div>
      <div className="answer-comparison">
        <div>
          <small>Answer to use in the exam bank</small>
          <strong>
            {question.examAnswer.letter}. {question.examAnswer.text}
          </strong>
        </div>
        <div>
          <small>Conceptually accurate answer</small>
          <strong>
            {question.conceptualAnswer.display ||
              (question.conceptualAnswer.acceptedLetters.length
                ? question.conceptualAnswer.acceptedLetters.join(" + ")
                : question.verdict === "bank-key-only"
                  ? "Not independently verified; use the bank key for the exam"
                  : question.verdict === "incorrect"
                    ? "Requires a corrected free-form answer"
                    : "Manual conceptual review required")}
          </strong>
        </div>
      </div>
      <p>{question.explanation}</p>
      <p className="takeaway">
        {!/^remember\s*:/i.test(question.keyTakeaway) && (
          <strong>Remember: </strong>
        )}
        {question.keyTakeaway}
      </p>
      <div className="rationale-list">
        {(["A", "B", "C", "D"] as const).map((letter) => (
          <div key={letter}>
            <strong>{letter}</strong>
            <p>{question.optionRationales[letter]}</p>
          </div>
        ))}
      </div>
      {question.evidence.caution && (
        <p className="source-caution">
          <strong>Source note:</strong> {question.evidence.caution}
        </p>
      )}
    </div>
  );
}
