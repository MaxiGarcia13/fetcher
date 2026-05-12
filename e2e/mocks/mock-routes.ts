import type { Page } from '@playwright/test';

const HTTP_REQUEST_PROXY = '**/api/v1/http-request';

export async function mockHttpRequestSuccess(
  page: Page,
  status: number = 200,
  body: Record<string, unknown> = { message: 'Mocked OK' },
): Promise<void> {
  await page.route(HTTP_REQUEST_PROXY, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}

export async function mockHttpRequestNetworkError(page: Page): Promise<void> {
  await page.route(HTTP_REQUEST_PROXY, async (route) => {
    await route.abort('failed');
  });
}
