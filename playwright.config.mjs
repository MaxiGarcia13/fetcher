import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:4321';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.{spec,test}.ts',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
  },
  use: {
    baseURL: BASE_URL,
  },
});
