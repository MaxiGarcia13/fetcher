import type { Locator, Page } from '@playwright/test';
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

/** Paste into Monaco as one edit — keyboard typing hits auto-close and corrupts JSON. */
async function pasteIntoMonaco(editor: Locator, value: string) {
  await editor.locator('.view-line').first().click({ clickCount: 3 });
  await editor.evaluate((root, text) => {
    const textarea = root.querySelector('textarea');
    if (!textarea) {
      throw new Error('Monaco textarea not found');
    }

    const data = new DataTransfer();
    data.setData('text/plain', text);
    textarea.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
      cancelable: true,
    }));
  }, value);
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
    await pasteIntoMonaco(bodyEditor, body);
    // onChange is debounced; URL updates once the store receives the new body.
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

export async function selectResponseMode(page: Page, mode: 'buffered' | 'stream') {
  await page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_MODE_SELECT).selectOption(mode);
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_MODE_SELECT)).toHaveValue(mode);
}

export async function selectStreamFormat(page: Page, format: 'sse' | 'ndjson' | 'bytes') {
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_FORMAT_SELECT)).toBeVisible();
  await page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_FORMAT_SELECT).selectOption(format);
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_FORMAT_SELECT)).toHaveValue(format);
}

export async function sendStreamRequest(
  page: Page,
  options: SendRequestOptions & { format?: 'sse' | 'ndjson' | 'bytes' } = {},
) {
  const { format = 'sse', ...requestOptions } = options;

  await fillRequest(page, requestOptions);
  await selectResponseMode(page, 'stream');
  await selectStreamFormat(page, format);

  return sendButtonClick(page);
}
