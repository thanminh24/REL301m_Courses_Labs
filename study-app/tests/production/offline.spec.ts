import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/library/",
  "/flashcards/",
  "/match/",
  "/learn/",
  "/test/",
  "/progress/",
];

test("all seven main routes reload from the production service worker offline", async ({
  page,
  context,
}) => {
  test.slow();
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });

  await context.setOffline(true);
  const coldDeepLink = await context.newPage();
  await coldDeepLink.goto("/library/?q=Q004&id=Q004", {
    waitUntil: "domcontentloaded",
  });
  await expect(coldDeepLink.locator("main")).toBeVisible();
  await expect(coldDeepLink.getByText("Q004", { exact: true })).toBeVisible();
  await expect(
    coldDeepLink.getByRole("heading", { name: "Question bank" }),
  ).toBeVisible();
  await coldDeepLink.close();
  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/This site can.t be reached/i);
  }
});

test("service-worker hash update isolates caches and preserves local progress", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    await caches.open("rel301m-study-old-data-old-app");
    await caches.open("unrelated-application-cache");
    localStorage.setItem("sw-update-progress-proof", "preserved");
  });

  await page.reload();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect
    .poll(() =>
      page.evaluate(async () => {
        const names = await caches.keys();
        return {
          study: names.filter((name) => name.startsWith("rel301m-study-")),
          unrelated: names.includes("unrelated-application-cache"),
          progress: localStorage.getItem("sw-update-progress-proof"),
        };
      }),
    )
    .toEqual({
      study: [expect.stringMatching(/^rel301m-study-[a-f0-9]{8}-[a-f0-9]{8}$/)],
      unrelated: true,
      progress: "preserved",
    });
});
