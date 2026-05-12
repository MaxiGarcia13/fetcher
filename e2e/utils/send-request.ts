import type { Page } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';

interface SendRequestOptions {
  method?: string;
  url?: string;
}

export async function sendRequest(
  page: Page,
  { method = 'GET', url = 'https://example.test/api' }: SendRequestOptions = {},
): Promise<void> {
  await page.goto('/');

  await page.getByTestId(HTTP_REQUEST_TEST_ID.METHOD_SELECT).selectOption(method);
  await page.getByTestId(HTTP_REQUEST_TEST_ID.URL_INPUT).fill(url);
  await page.getByTestId(HTTP_REQUEST_TEST_ID.SEND_BUTTON).click();
}
