import { defineConfig, devices } from "@playwright/test";

const liveBaseURL = process.env.PLAYWRIGHT_GITHUB_PAGES_BASE_URL;

export default defineConfig({
  testDir: "./tests/github-pages",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report-pages" }]],
  use: {
    baseURL: liveBaseURL ?? "http://127.0.0.1:3204",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    serviceWorkers: "allow",
  },
  projects: [{ name: "chromium-pages", use: { ...devices["Desktop Chrome"] } }],
  webServer: liveBaseURL
    ? undefined
    : {
        command:
          "mkdir -p .pages-smoke/rel301m && cp -a out/. .pages-smoke/rel301m/ && python3 -m http.server 3204 --bind 127.0.0.1 --directory .pages-smoke >/dev/null 2>&1",
        url: "http://127.0.0.1:3204/rel301m/",
        reuseExistingServer: false,
        timeout: 30_000,
      },
});
