import type { Question } from "@/data/question-schema";

const labels: Record<Question["verdict"], string> = {
  correct: "Verified",
  "acceptable-with-caveat": "Use with caveat",
  incorrect: "Bank key challenged",
  "bank-key-only": "Bank-only",
};

export function VerdictBadge({ verdict }: { verdict: Question["verdict"] }) {
  return (
    <span className={`verdict verdict-${verdict}`}>{labels[verdict]}</span>
  );
}
