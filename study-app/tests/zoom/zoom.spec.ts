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

test("all main screens remain operable at an actual 200% page scale", async ({
  page,
}) => {
  const session = await page.context().newCDPSession(page);

  for (const route of routes) {
    await page.goto(route);
    await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(() => ({
        scale: window.visualViewport?.scale,
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      })),
      route,
    ).toEqual({ scale: 2, overflow: 0 });
    const firstControl = page.locator("main a, main button, main input, main select").first();
    await firstControl.focus();
    await expect(firstControl).toBeFocused();
  }
});
