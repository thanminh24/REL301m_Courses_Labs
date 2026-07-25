import { z } from "zod";

export const answerLetterSchema = z.enum(["A", "B", "C", "D"]);
export type AnswerLetter = z.infer<typeof answerLetterSchema>;

export const questionSchema = z.object({
  id: z.string().regex(/^Q\d{3}$/),
  module: z.string(),
  course: z.string(),
  topic: z.string(),
  concept: z.string(),
  stem: z.string().min(3),
  options: z.record(answerLetterSchema, z.string()),
  examAnswer: z.object({ letter: answerLetterSchema, text: z.string() }),
  verdict: z.enum([
    "correct",
    "acceptable-with-caveat",
    "incorrect",
    "bank-key-only",
  ]),
  conceptualAnswer: z.object({
    kind: z.enum(["single", "multiple", "freeform", "manual-review"]),
    acceptedLetters: z.array(answerLetterSchema),
    display: z.string().nullable(),
    aliases: z.array(z.string()),
  }),
  explanation: z.string().min(40),
  keyTakeaway: z.string().min(12),
  optionRationales: z.record(answerLetterSchema, z.string().min(12)),
  evidence: z.object({
    type: z.enum(["lecture", "book", "question-bank"]),
    lecture: z.string().nullable(),
    slides: z.string().nullable(),
    relatedLecture: z.string().nullable(),
    relatedSlides: z.string().nullable(),
    locator: z
      .object({
        title: z.string(),
        printed_pages: z.array(z.number()).optional(),
        section: z.string().optional(),
      })
      .nullable(),
    caution: z.string().nullable(),
  }),
  confidence: z.string(),
  depth: z.string(),
  sourceQuality: z.string(),
  duplicateCluster: z.string().nullable(),
});

export type Question = z.infer<typeof questionSchema>;
