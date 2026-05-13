import type { Page, Response } from '@playwright/test';

const ENDPOINT_PATH = '/api/v1/http-request';
const HTTP_REQUEST_PROXY = `**${ENDPOINT_PATH}`;

export async function mockHttpRequestSuccess(
  page: Page,
  status: number = 200,
  body: Record<string, unknown> = { message: 'Mocked OK' },
) {
  await page.route(HTTP_REQUEST_PROXY, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}

/** Resolves when the outbound proxy request finishes; `null` if aborted or network-failed (no response). */
export async function waitForMockHttpRequest(page: Page): Promise<Response | null> {
  const request = await page.waitForRequest((req) => req.url().includes(ENDPOINT_PATH));
  return request.response();
}

export async function mockHttpRequestNetworkError(page: Page): Promise<void> {
  await page.route(HTTP_REQUEST_PROXY, async (route) => {
    await route.abort('failed');
  });
}
