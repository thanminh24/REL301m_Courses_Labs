import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/production",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report-production" }]],
  use: {
    baseURL: "http://127.0.0.1:3200",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    serviceWorkers: "allow",
  },
  projects: [{ name: "chromium-production", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command:
      "python3 -m http.server 3200 --bind 127.0.0.1 --directory out >/dev/null 2>&1",
    url: "http://127.0.0.1:3200",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
