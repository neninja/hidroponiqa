import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  use: {
    headless: true,
    baseURL: "http://localhost",
    viewport: { width: 1366, height: 1024 },
    screenshot: "only-on-failure",
    //video: "on", // debug
  },
  projects: [
    {
      name: "backoffice setup",
      testDir: "./tests/backoffice",
      testMatch: /login-admin\.setup\.ts/,
    },
    {
      name: "backoffice",
      use: {
        storageState: "playwright/auth/backoffice-admin.json",
      },
      dependencies: ["backoffice setup"],
      testMatch: /backoffice\/.*\.spec\.ts/,
    },
    {
      name: "API",
      testMatch: /api\/.*\.spec\.ts/,
    },
    {
      name: "Documentação",
      testMatch: /docs\/.*\.spec\.ts/,
    },
  ],
};

export default config;
