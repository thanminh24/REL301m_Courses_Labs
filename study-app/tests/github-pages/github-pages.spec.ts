import { expect, test } from "@playwright/test";

const prefix = "/rel301m";
const routes = [
  "/",
  "/library/",
  "/flashcards/",
  "/match/",
  "/learn/",
  "/test/",
  "/progress/",
];

test("the GitHub Pages export keeps navigation, assets, and manifest under /rel301m", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failed.push(response.url());
  });
  await page.goto(`${prefix}/`);
  await expect(
    page.getByRole("heading", { name: /Understand the ideas/i }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Learn", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/learn/$`));
  await expect(page.locator(".learn-card")).toBeVisible();

  const manifest = await page.request.get(`${prefix}/manifest.webmanifest`);
  expect(manifest.ok()).toBe(true);
  await expect(manifest.json()).resolves.toMatchObject({
    start_url: `${prefix}/`,
    scope: `${prefix}/`,
  });
  expect(failed).toEqual([]);
});

test("a cold query deep link and every study route work offline under /rel301m", async ({
  page,
  context,
}) => {
  test.slow();
  await page.goto(`${prefix}/`);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);

  const coldPage = await context.newPage();
  await coldPage.goto(`${prefix}/library/?q=Q004&id=Q004`, {
    waitUntil: "domcontentloaded",
  });
  await expect(coldPage.getByText("Q004", { exact: true })).toBeVisible();
  await coldPage.close();

  for (const route of routes) {
    await page.goto(`${prefix}${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toBeVisible();
  }
});
