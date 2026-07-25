import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import bank from "../../src/data/generated/question-bank.json";
import qa from "../../src/data/generated/content-qa-manifest.json";

const STUDY_KEY = "rel301m-study-state-v1";
const FLASHCARD_KEY = "rel301m-flashcard-session-v1";
const LEARN_KEY = "rel301m-learn-session-v2";
const TEST_KEY = "rel301m-test-session-v1";
const MATCH_KEY = "rel301m-match-session-v1";
const routes = [
  "/",
  "/library/",
  "/flashcards/",
  "/match/",
  "/learn/",
  "/test/",
  "/progress/",
];

async function readStorage<T>(page: Page, key: string): Promise<T> {
  return page.evaluate(
    (storageKey) => JSON.parse(localStorage.getItem(storageKey) ?? "null"),
    key,
  );
}

function checksum(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("dashboard exposes every core study mode", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Understand the ideas/i }),
  ).toBeVisible();
  const mobileMenu = page.getByRole("button", { name: "Open navigation" });
  if (await mobileMenu.isVisible()) {
    await mobileMenu.click();
  }
  for (const name of [
    "Question bank",
    "Flashcards",
    "Match",
    "Learn",
    "Test",
    "Progress",
  ]) {
    await expect(
      page.getByRole("link", { name: new RegExp(name, "i") }).first(),
    ).toBeVisible();
  }
});

test("mobile navigation is inert while closed and restores focus after Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  const sidebar = page.locator("#study-navigation");
  await expect(sidebar).toHaveAttribute("aria-hidden", "true");
  await expect(sidebar).toHaveAttribute("inert", "");
  await menu.click();
  await expect(page.getByRole("link", { name: "Dashboard", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(sidebar).toHaveAttribute("aria-hidden", "true");
});

test("core routes do not overflow a 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of routes) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
});

test("question bank contains all 317 and searches options and explanations", async ({
  page,
}) => {
  const q188 = bank.questions.find((question) => question.id === "Q188")!;
  await page.goto("/library/");
  await expect(page.getByText("Showing 317 of 317")).toBeVisible();
  const search = page.getByPlaceholder(/Search ID/);
  await search.fill(q188.options.B);
  await expect(page.getByText("Q188", { exact: true })).toBeVisible();
  await search.fill(q188.explanation);
  await expect(page.getByText("Q188", { exact: true })).toBeVisible();
  await search.fill("Q188");
  await page.getByRole("button", { name: /Which Monte Carlo method/ }).click();
  await expect(
    page
      .locator(".answer-comparison strong")
      .filter({ hasText: /Both first-visit and every-visit/i }),
  ).toBeVisible();
});

test("Q004 preserves the exam association without teaching it as TD theory", async ({
  page,
}) => {
  await page.goto("/library/?q=Q004&id=Q004");
  await expect(page.getByText("Q004", { exact: true })).toBeVisible();
  await expect(
    page.locator(".answer-comparison strong").filter({
      hasText: "C. Flexibility in scheduling",
    }),
  ).toBeVisible();
  await expect(page.getByText(/only an exam-bank association/i)).toBeVisible();
  await expect(page.getByText(/defined by bootstrapping/i)).toBeVisible();
});

test("Flashcards resumes filters, requeues misses, and resets explicitly", async ({
  page,
}) => {
  await page.goto("/flashcards/");
  await page.getByLabel("Filter course").selectOption("C1");
  await expect(page.getByRole("button", { name: /Showing question/ })).toBeVisible();
  const before = await readStorage<{
    sessionId: string;
    order: string[];
    index: number;
    course: string;
  }>(page, FLASHCARD_KEY);
  await page.getByRole("button", { name: /Showing question/ }).click();
  await page.getByRole("button", { name: "Again" }).click();
  const afterMiss = await readStorage<typeof before>(page, FLASHCARD_KEY);
  expect(afterMiss.order).toHaveLength(before.order.length + 1);
  expect(afterMiss.course).toBe("C1");
  expect(afterMiss.index).toBe(1);

  await page.reload();
  await expect(page.getByLabel("Filter course")).toHaveValue("C1");
  const resumed = await readStorage<typeof before>(page, FLASHCARD_KEY);
  expect(resumed.sessionId).toBe(before.sessionId);
  expect(resumed.index).toBe(1);

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByLabel("Reset Flashcards session").click();
  await expect(page.getByLabel("Filter course")).toHaveValue("all");
  const reset = await readStorage<typeof before>(page, FLASHCARD_KEY);
  expect(reset.sessionId).not.toBe(before.sessionId);
  expect(reset.order).toHaveLength(317);
  expect(reset.index).toBe(0);
});

test("Flashcards reveals the next prompt after rating from a long mobile answer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/flashcards/");
  const firstCard = page.getByRole("button", { name: /Showing question Q001:/ });
  await firstCard.click();
  await page.getByRole("button", { name: "Good · next session" }).click();
  const nextCard = page.getByRole("button", { name: /Showing question Q002:/ });
  await expect(nextCard).toBeFocused();
  const box = await nextCard.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(74);
  expect(box!.y).toBeLessThan(740);
});

test("Flashcard shortcuts do not hijack focused controls", async ({ page }) => {
  await page.goto("/flashcards/");
  await expect
    .poll(async () => Boolean(await readStorage(page, FLASHCARD_KEY)))
    .toBe(true);
  const flip = page.getByRole("button", { name: /Showing question Q001:/ });
  await expect(flip).toHaveAttribute("aria-expanded", "false");
  await flip.focus();
  await page.keyboard.press("ArrowRight");
  const nextFlip = page.getByRole("button", { name: /Showing question Q002:/ });
  await expect(nextFlip).toBeFocused();
  const star = page.getByRole("button", { name: "Star" });
  await star.press("Space");
  await expect(star).toHaveAttribute("aria-pressed", "true");
  await expect(nextFlip).toHaveAttribute("aria-expanded", "false");
});

test("mastery requires successful recall in two distinct sessions", async ({
  page,
}) => {
  await page.goto("/flashcards/");
  const firstQuestion = await page.locator(".card-meta span").first().textContent();
  expect(firstQuestion).toBe("Q001");
  await page.getByRole("button", { name: /Showing question/ }).click();
  await page.getByRole("button", { name: /Easy/ }).click();
  let study = await readStorage<{ mastered: string[] }>(page, STUDY_KEY);
  expect(study.mastered).not.toContain("Q001");

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByLabel("Reset Flashcards session").click();
  await expect(page.locator(".card-meta span").first()).toHaveText("Q001");
  await page.getByRole("button", { name: /Showing question/ }).click();
  await page.getByRole("button", { name: /Easy/ }).click();
  study = await readStorage<{ mastered: string[] }>(page, STUDY_KEY);
  expect(study.mastered).toContain("Q001");
});

test("Learn restores wrong-answer feedback and can reset the round", async ({
  page,
}) => {
  await page.goto("/learn/");
  await expect
    .poll(async () => Boolean(await readStorage(page, LEARN_KEY)))
    .toBe(true);
  const initial = await readStorage<{ seed: number; queueIds: string[] }>(
    page,
    LEARN_KEY,
  );
  const questionId = await page.locator(".card-meta span").first().innerText();
  const current = bank.questions.find((item) => item.id === questionId)!;
  const wrongIndex = ["A", "B", "C", "D"].findIndex(
    (letter) => letter !== current.examAnswer.letter,
  );
  await page.locator(".answer-option").nth(wrongIndex).click();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText(/Best answer:/)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/Best answer:/)).toBeVisible();
  const resumed = await readStorage<{
    seed: number;
    queueIds: string[];
    checked: boolean;
  }>(page, LEARN_KEY);
  expect(resumed.seed).toBe(initial.seed);
  expect(resumed.queueIds).toEqual(initial.queueIds);
  expect(resumed.checked).toBe(true);

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset session" }).click();
  const reset = await readStorage<{ seed: number; index: number; checked: boolean }>(
    page,
    LEARN_KEY,
  );
  expect(reset.seed).toBe(initial.seed + 1);
  expect(reset.index).toBe(0);
  expect(reset.checked).toBe(false);
});

test("Learn advances immediately after the best answer", async ({ page }) => {
  await page.goto("/learn/");
  const firstId = await page.locator(".card-meta span").first().innerText();
  const current = bank.questions.find((item) => item.id === firstId)!;
  await page.locator(".answer-option").nth(
    ["A", "B", "C", "D"].indexOf(current.examAnswer.letter),
  ).click();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.locator(".card-meta span").first()).not.toHaveText(firstId);
  await expect(page.getByText(/Best answer:/)).toHaveCount(0);
});

test("Test instant-practice mode reveals feedback after a response", async ({
  page,
}) => {
  await page.goto("/test/");
  await page.getByLabel("Number of questions").fill("5");
  await page.getByLabel("Feedback timing").selectOption("instant");
  await page.getByRole("button", { name: "Start test" }).click();
  await page.locator(".test-question").first().locator("label").first().click();
  await page.getByRole("button", { name: "Check this question" }).click();
  await expect(
    page.locator(".test-question").first().getByText("Answer to use in the exam bank"),
  ).toBeVisible();
});

test("Test keeps Q188 single-choice while grading its conceptual nuance separately", async ({
  page,
}) => {
  await page.goto("/library/");
  await page.getByLabel("Add Q188 to favorites").click();
  await page.goto("/test/");
  await page.getByLabel("Question set").selectOption("favorites");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect(page.locator(".test-question input[type=radio]")).toHaveCount(4);
  await expect(page.locator(".test-question input[type=checkbox]")).toHaveCount(0);
  await page.getByLabel(/First-visit Monte Carlo/).check();
  await expect(page.locator(".test-question input:checked")).toHaveCount(1);
  await page.getByRole("button", { name: "Submit test" }).first().click();
  await expect(page.getByText("1/1", { exact: true })).toBeVisible();
  await expect(page.getByText("0/0", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Correct with nuance · 1" }),
  ).toBeVisible();
  await page.locator(".review-item", { hasText: "Q188" }).locator("summary").click();
  await expect(page.getByRole("button", { name: "Understood" })).toBeVisible();
});

test("Test supports all 317 canonical questions", async ({ page }) => {
  test.slow();
  await page.goto("/test/");
  await page.getByRole("button", { name: "Use all 317 questions" }).click();
  await expect(page.getByLabel("Number of questions")).toHaveValue("317");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect(page.locator(".test-question")).toHaveCount(1);
  const snapshot = await readStorage<{ questionIds: string[] }>(page, TEST_KEY);
  expect(snapshot.questionIds).toHaveLength(317);
  await expect(
    page.getByRole("navigation", { name: "Test question navigator" }).locator("button"),
  ).toHaveCount(22);
  await page.getByRole("button", { name: "Next 20 questions" }).click();
  await expect(page.getByText("Question 21 of 317")).toBeVisible();
});

test("Test restores the active prompt after mobile Start, step, and navigator moves", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/test/");
  await page.getByLabel("Number of questions").fill("40");
  await page.getByRole("button", { name: "Start test" }).click();
  const prompt = page.locator(".test-question");
  await expect(prompt).toBeFocused();
  let box = await prompt.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(250);
  expect(box!.y).toBeLessThan(740);

  await page.getByRole("button", { name: "Next question" }).click();
  await expect(prompt).toBeFocused();
  await expect(page.getByText("Question 2 of 40")).toBeVisible();

  await page.getByRole("button", { name: "Next 20 questions" }).click();
  await expect(prompt).toBeFocused();
  await expect(page.getByText("Question 21 of 40")).toBeVisible();
  box = await prompt.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(250);
  expect(box!.y).toBeLessThan(740);
});

test("Test applies filters and rejects an empty filtered set", async ({ page }) => {
  await page.goto("/test/");
  await page.getByLabel("Question set").selectOption("favorites");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect(page.getByText(/No questions match these filters/)).toBeVisible();

  await page.goto("/library/");
  await page.getByLabel("Add Q188 to favorites").click();
  await page.goto("/test/");
  await page.getByLabel("Question set").selectOption("favorites");
  await page.getByLabel("Verification status").selectOption("incorrect");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect(page.locator(".test-question")).toHaveCount(1);
  await expect(page.locator(".test-question")).toContainText("Q188");
});

test("written Test persists responses, navigator state, flags, and reset", async ({
  page,
}) => {
  await page.goto("/test/");
  await page.getByLabel("Number of questions").fill("5");
  await page.getByLabel("Response format").selectOption("written");
  await page.getByRole("button", { name: "Start test" }).click();
  const textarea = page.locator(".test-question textarea").first();
  await textarea.fill("a considered written response");
  await page.locator(".test-question").first().getByRole("button", {
    name: "Flag for review",
  }).click();
  await expect(
    page.getByRole("button", { name: "Question 1: answered, flagged" }),
  ).toBeVisible();
  const active = await readStorage<{
    phase: string;
    questionIds: string[];
    writtenAnswers: Record<string, string>;
    flagged: string[];
  }>(page, TEST_KEY);
  expect(active.phase).toBe("active");
  expect(active.flagged).toEqual([active.questionIds[0]]);

  await page.reload();
  await expect(page.locator(".test-question textarea").first()).toHaveValue(
    "a considered written response",
  );
  await expect(
    page.getByRole("button", { name: "Question 1: answered, flagged" }),
  ).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset session" }).click();
  await expect(page.getByRole("button", { name: "Start test" })).toBeVisible();
  await expect(page.getByLabel("Response format")).toHaveValue("mcq");
});

test("written Test leaves free-form concepts for explicit self-review", async ({
  page,
}) => {
  await page.goto("/library/");
  await page.getByLabel("Add Q002 to favorites").click();
  await page.goto("/test/");
  await page.getByLabel("Question set").selectOption("favorites");
  await page.getByLabel("Response format").selectOption("written");
  await page.getByRole("button", { name: "Start test" }).click();
  await page.locator(".test-question textarea").fill(
    bank.questions.find((question) => question.id === "Q002")!.examAnswer.text,
  );
  await expect(
    page.getByRole("button", { name: "Question 1: answered" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Submit test" }).first().click();
  await expect(page.getByText(/1 question\(s\) require/)).toBeVisible();
  await page.locator(".review-item", { hasText: "Q002" }).locator("summary").click();
  const understood = page.getByRole("button", { name: "Understood" });
  const notYet = page.getByRole("button", { name: "Not yet" });
  await expect(understood).toBeVisible();
  await expect(notYet).toBeVisible();
  await understood.click();
  await expect(understood).toHaveAttribute("aria-pressed", "true");
  await expect(understood).toBeDisabled();
  await expect(notYet).toBeDisabled();
  await expect(page.getByText("Self-rating saved for this test session.")).toBeVisible();
});

test("invalid Test snapshot recovers to safe setup state", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(
    ([key, value]) => localStorage.setItem(key, value),
    [TEST_KEY, JSON.stringify({ version: 1, phase: "active", questionIds: ["Q999"] })],
  );
  await page.goto("/test/");
  await expect(page.getByRole("button", { name: "Start test" })).toBeVisible();
  const recovered = await readStorage<{ phase: string; questionIds: string[] }>(
    page,
    TEST_KEY,
  );
  expect(recovered.phase).toBe("setup");
  expect(recovered.questionIds).toEqual([]);
});

test("corrupt Flashcards, Learn, and Match snapshots recover safely", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(
    ({ flash, learn, match }) => {
      localStorage.setItem(flash, '{"version":1,"dataHash":"stale","order":["Q999"]}');
      localStorage.setItem(learn, '{"version":1,"dataHash":"stale","queueIds":[]}');
      localStorage.setItem(match, '{"version":1,"dataHash":"stale","matched":["Q999"]}');
    },
    { flash: FLASHCARD_KEY, learn: LEARN_KEY, match: MATCH_KEY },
  );
  await page.goto("/flashcards/");
  await expect(page.getByRole("button", { name: /Showing question Q001:/ })).toBeVisible();
  await page.goto("/learn/");
  await expect(page.locator(".learn-card")).toBeVisible();
  await page.goto("/match/");
  await expect(page.locator(".match-tile")).toHaveCount(12);
});

test("same-hash malformed session structures fail closed", async ({ page }) => {
  await page.goto("/flashcards/");
  await expect
    .poll(async () => Boolean(await readStorage(page, FLASHCARD_KEY)))
    .toBe(true);
  await page.evaluate(
    ({ key, hash }) => {
      const snapshot = JSON.parse(localStorage.getItem(key)!);
      localStorage.setItem(
        key,
        JSON.stringify({
          ...snapshot,
          dataHash: hash,
          index: snapshot.order.length + 10,
          topic: "not-a-real-topic",
        }),
      );
    },
    { key: FLASHCARD_KEY, hash: qa.datasetHash },
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: /Showing question Q001:/ }),
  ).toBeVisible();

  await page.goto("/match/");
  const firstQuestionText = await page
    .locator(".match-tile.question")
    .first()
    .textContent();
  const roundQuestionId = firstQuestionText?.match(/Q\d{3}/)?.[0];
  expect(roundQuestionId).toBeTruthy();
  await page.evaluate(
    ({ key, id, hash }) => {
      const snapshot = JSON.parse(localStorage.getItem(key)!);
      localStorage.setItem(
        key,
        JSON.stringify({
          ...snapshot,
          dataHash: hash,
          matched: Array(6).fill(id),
        }),
      );
    },
    { key: MATCH_KEY, id: roundQuestionId!, hash: qa.datasetHash },
  );
  await page.reload();
  await expect(page.locator(".match-tile")).toHaveCount(12);
  await expect(page.getByText("Round cleared", { exact: true })).toHaveCount(0);

  await page.goto("/test/");
  await expect
    .poll(async () => Boolean(await readStorage(page, TEST_KEY)))
    .toBe(true);
  await page.evaluate(
    ({ key, hash }) => {
      const snapshot = JSON.parse(localStorage.getItem(key)!);
      localStorage.setItem(
        key,
        JSON.stringify({
          ...snapshot,
          dataHash: hash,
          phase: "results",
          questionIds: [],
        }),
      );
    },
    { key: TEST_KEY, hash: qa.datasetHash },
  );
  await page.reload();
  await expect(page.getByRole("button", { name: "Start test" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("NaN%");
});

test("timed Test resumes and auto-submits an expired deadline", async ({ page }) => {
  await page.goto("/test/");
  await page.getByLabel("Timed mode").check();
  await page.getByLabel("Number of questions").fill("5");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect
    .poll(async () => Boolean(await readStorage(page, TEST_KEY)))
    .toBe(true);
  await page.evaluate(
    ({ key, deadline }) => {
      const snapshot = JSON.parse(localStorage.getItem(key)!);
      localStorage.setItem(key, JSON.stringify({ ...snapshot, deadline }));
    },
    { key: TEST_KEY, deadline: Date.now() - 1000 },
  );
  await page.reload();
  await expect(page.getByRole("heading", { name: "Your two-score result" })).toBeVisible();
});

test("submitting unanswered Test items does not record failures", async ({ page }) => {
  await page.goto("/test/");
  await page.getByLabel("Number of questions").fill("5");
  await page.getByRole("button", { name: "Start test" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Submit test" }).first().click();
  await expect(page.getByText("Unanswered · 5")).toBeVisible();
  const progress = await readStorage<{
    attempts: unknown[];
    difficult: string[];
  }>(page, STUDY_KEY);
  expect(progress.attempts).toHaveLength(0);
  expect(progress.difficult).toHaveLength(0);
});

test("study modes remain usable in memory when browser storage is blocked", async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const method of ["getItem", "setItem", "removeItem"] as const) {
      Object.defineProperty(Storage.prototype, method, {
        configurable: true,
        value() {
          throw new DOMException("Blocked for test", "SecurityError");
        },
      });
    }
  });

  await page.goto("/flashcards/");
  await expect(page.getByText("Saving is unavailable.")).toBeVisible();
  const card = page.getByRole("button", { name: /Showing question Q001:/ });
  await card.click();
  await expect(
    page.getByRole("button", { name: "Showing answer for Q001; flip to question" }),
  ).toHaveAttribute("aria-expanded", "true");

  await page.goto("/learn/");
  await page.locator(".answer-option").first().click();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText(/Correct for the exam bank|Bank answer:/)).toBeVisible();

  await page.goto("/match/");
  await page.locator(".match-tile.question").first().click();
  await expect(page.getByText(/Question selected/)).toBeVisible();

  await page.goto("/test/");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect(page.locator(".test-question")).toHaveCount(1);
  await expect(page.getByText(/This study view needs another try/i)).toHaveCount(0);
});

test("a mid-session storage failure warns and retries the pending mode save", async ({
  page,
}) => {
  await page.goto("/test/");
  await page.getByLabel("Number of questions").fill("5");
  await page.getByRole("button", { name: "Start test" }).click();
  await expect
    .poll(async () => Boolean(await readStorage(page, TEST_KEY)))
    .toBe(true);
  await page.evaluate(() => {
    const storageWindow = window as typeof window & {
      __rel301mOriginalSetItem?: Storage["setItem"];
    };
    storageWindow.__rel301mOriginalSetItem = Storage.prototype.setItem;
    Object.defineProperty(Storage.prototype, "setItem", {
      configurable: true,
      value() {
        throw new DOMException("Quota blocked for test", "QuotaExceededError");
      },
    });
  });
  await page.locator('input[type="radio"]').first().check();
  await expect(page.getByText("Saving is unavailable.")).toBeVisible();

  await page.evaluate(() => {
    const storageWindow = window as typeof window & {
      __rel301mOriginalSetItem?: Storage["setItem"];
    };
    Object.defineProperty(Storage.prototype, "setItem", {
      configurable: true,
      value: storageWindow.__rel301mOriginalSetItem,
    });
  });
  await page.getByRole("button", { name: "Retry saving" }).click();
  await expect(page.getByText("Saving is unavailable.")).toHaveCount(0);
  const saved = await readStorage<{ answers: Record<string, string[]> }>(
    page,
    TEST_KEY,
  );
  expect(Object.values(saved.answers).flat()).toHaveLength(1);
  await page.reload();
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(1);
});

test("Match excludes challenged items and restores its selected tile", async ({
  page,
}) => {
  const eligible = bank.questions.filter(
    (question) =>
      question.verdict !== "incorrect" &&
      question.verdict !== "bank-key-only" &&
      question.conceptualAnswer.acceptedLetters.length === 1 &&
      question.conceptualAnswer.acceptedLetters[0] === question.examAnswer.letter,
  );
  await page.goto("/match/");
  await expect(
    page.getByText(`Only ${eligible.length} unambiguous`, { exact: false }),
  ).toBeVisible();
  for (const tile of await page.locator(".match-tile.question").allTextContents()) {
    const id = tile.match(/Q\d{3}/)?.[0];
    expect(eligible.some((question) => question.id === id)).toBe(true);
  }
  const first = page.locator(".match-tile.question").first();
  await first.click();
  await expect
    .poll(async () => {
      const snapshot = await readStorage<{ selectedKey: string | null } | null>(
        page,
        MATCH_KEY,
      );
      return snapshot?.selectedKey ?? null;
    })
    .toMatch(/-q$/);
  const selected = await readStorage<{ selectedKey: string | null }>(page, MATCH_KEY);
  expect(selected.selectedKey).toMatch(/-q$/);
  await page.reload();
  await expect(page.locator(".match-tile.selected")).toHaveCount(1);
  const resumed = await readStorage<{ selectedKey: string | null }>(page, MATCH_KEY);
  expect(resumed.selectedKey).toBe(selected.selectedKey);

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset session" }).click();
  await expect(page.locator(".match-tile.selected")).toHaveCount(0);
  const reset = await readStorage<{ roundNumber: number; selectedKey: null }>(
    page,
    MATCH_KEY,
  );
  expect(reset.roundNumber).toBeGreaterThan(1);
  expect(reset.selectedKey).toBeNull();
});

test("Match remains accessible after selecting a tile", async ({ page }) => {
  await page.goto("/match/");
  await page.locator(".match-tile.question").first().click();
  await expect(page.getByText(/Question selected/)).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});

test("invalid progress import never mutates existing browser progress", async ({
  page,
}) => {
  await page.goto("/library/");
  await page.getByLabel("Add Q188 to favorites").click();
  await page.goto("/progress/");
  await page.getByLabel("Daily question goal").fill("35");
  const before = await readStorage(page, STUDY_KEY);
  page.once("dialog", (dialog) => dialog.accept());
  await page.locator('input[type="file"]').setInputFiles({
    name: "tampered-progress.json",
    mimeType: "application/json",
    buffer: Buffer.from(
      JSON.stringify({
        exportVersion: 1,
        dataHash: "wrong",
        checksum: "00000000",
        state: { version: 1, favorites: [], dailyGoal: 5 },
      }),
    ),
  });
  await expect(page.getByRole("status")).toHaveText("That backup is not valid.");
  expect(await readStorage(page, STUDY_KEY)).toEqual(before);
  await expect(page.getByLabel("Daily question goal")).toHaveValue("35");

  const malformedState = {
    ...(before as Record<string, unknown>),
    dataHash: qa.datasetHash,
    attempts: [
      {
        questionId: "Q999",
        mode: "learn",
        sessionId: "invalid-shape",
        correct: true,
        conceptCorrect: true,
        selected: ["A"],
        at: "not-a-date",
      },
    ],
  };
  const serializedState = JSON.stringify(malformedState);
  page.once("dialog", (dialog) => dialog.accept());
  await page.locator('input[type="file"]').setInputFiles({
    name: "invalid-shape-progress.json",
    mimeType: "application/json",
    buffer: Buffer.from(
      JSON.stringify({
        exportVersion: 1,
        dataHash: qa.datasetHash,
        checksum: checksum(serializedState),
        state: malformedState,
      }),
    ),
  });
  await expect(page.getByRole("status")).toHaveText("That backup is not valid.");
  expect(await readStorage(page, STUDY_KEY)).toEqual(before);
});

test("progress settings persist and reset with confirmation", async ({ page }) => {
  await page.goto("/progress/");
  const goal = page.getByLabel("Daily question goal");
  await goal.fill("35");
  await page.reload();
  await expect(goal).toHaveValue("35");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset progress" }).click();
  await expect(page.getByText("Local progress reset.")).toBeVisible();
  await expect(goal).toHaveValue("20");
});

test("all routes have no serious or critical accessibility violations", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
      route,
    ).toEqual([]);
  }
});
