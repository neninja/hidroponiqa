import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    baseURL: 'http://localhost',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    // video: 'on-first-retry',
  },
};

export default config;
