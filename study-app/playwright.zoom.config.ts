import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/zoom",
  reporter: [["list"]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3103",
    viewport: { width: 640, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "python3 -m http.server 3103 --bind 127.0.0.1 --directory out >/dev/null 2>&1",
    url: "http://127.0.0.1:3103",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
