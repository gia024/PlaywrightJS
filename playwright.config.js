// playwright.config.js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000, // 5 seconds for expect conditions
  },
  fullyParallel: true,
  retries: 0, // you can set to 1 or 2 in CI
  reporter: 'html', // see results with: npx playwright show-report
  use: {
    baseURL: 'https://pin-dev.naxadev.com/login',
      headless: false,
      launchOptions: {
        args: ['--start-maximized'],
      },
      viewport: null,
    ignoreHTTPSErrors: true,
    video: 'on', // or 'retain-on-failure'
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});