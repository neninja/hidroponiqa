import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    baseURL: "http://localhost",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    // video: 'on-first-retry',
  },
  projects: [
    {
      name: "backoffice setup",
      testDir: "./tests/backoffice",
      testMatch: /login-admin\.setup\.ts/,
    },
    {
      name: "backoffice",
      testDir: "./tests",
      use: {
        storageState: "playwright/auth/backoffice-admin.json",
      },
      dependencies: ["backoffice setup"],
      testMatch: /backoffice\/.*\.spec\.ts/,
    },
  ],
};

export default config;
