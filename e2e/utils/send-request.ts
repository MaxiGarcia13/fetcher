import type { Page } from '@playwright/test';
import { waitForMockHttpRequest } from 'e2e/mocks/mock-routes';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import { fillKeyValueTable } from './fill-key-value-table';

interface SendRequestOptions {
  method?: string;
  url?: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
}

export async function sendRequest(
  page: Page,
  {
    method = 'GET',
    url = 'https://example.test/api',
    params,
    headers,
    body,
  }: SendRequestOptions = {},
) {
  await page.goto('/');
  await page.waitForLoadState('load');

  await page.getByTestId(HTTP_REQUEST_TEST_ID.METHOD_SELECT).selectOption(method);
  await page.getByTestId(HTTP_REQUEST_TEST_ID.URL_INPUT).fill(url);

  if (params) {
    await page.getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-params`).click();

    await fillKeyValueTable(page, Object.entries(params));
  }

  if (headers) {
    await page.getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-headers`).click();

    await fillKeyValueTable(page, Object.entries(headers));
  }

  if (body !== undefined) {
    await page.getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-body`).click();

    await page.waitForTimeout(1000);

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');

    await page.keyboard.type(body);

    await page.waitForTimeout(1000);
  }

  const requestFinished = waitForMockHttpRequest(page);
  await page.getByTestId(HTTP_REQUEST_TEST_ID.SEND_BUTTON).click();

  return requestFinished;
}
