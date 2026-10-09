import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { waitForMockHttpRequest } from '../mocks/mock-routes';
import { fillKeyValueTable } from './fill-key-value-table';

interface SendRequestOptions {
  method?: string;
  url?: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
}

export async function fillRequest(page: Page, {
  method = 'GET',
  url = 'https://example.test/api',
  params,
  headers,
  body,
}: SendRequestOptions = {}) {
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

    const bodyEditor = page.getByTestId(HTTP_REQUEST_TEST_ID.REQUEST_BODY_EDITOR);
    await expect(bodyEditor).toBeVisible();

    const urlBeforeBodyEdit = page.url();
    const textarea = bodyEditor.locator('textarea');
    await textarea.focus();
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.insertText(body);

    await expect(bodyEditor).toHaveText(body);
    // Editor onChange is debounced (100ms) before the request store/URL update.
    await expect.poll(() => page.url()).not.toEqual(urlBeforeBodyEdit);
  }
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
  await fillRequest(page, { method, url, params, headers, body });

  return sendButtonClick(page);
}

export async function sendButtonClick(page: Page) {
  const requestFinished = waitForMockHttpRequest(page);
  await page.getByTestId(HTTP_REQUEST_TEST_ID.SEND_BUTTON).click();
  return requestFinished;
}
