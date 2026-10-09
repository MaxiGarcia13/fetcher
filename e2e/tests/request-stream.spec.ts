import { expect, test } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/test-ids/http-request';
import { mockHttpRequestSseStream } from '../mocks/mock-routes';
import { sendStreamRequest } from '../utils/request';

test('streams SSE events into the stream response viewer', async ({ page }) => {
  await mockHttpRequestSseStream(page);

  await page.goto('/');
  await page.waitForLoadState('load');

  await sendStreamRequest(page, {
    method: 'GET',
    url: 'https://example.test/api/chat',
    format: 'sse',
  });

  const streamResponse = page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_RESPONSE);
  await expect(streamResponse).toBeVisible({ timeout: 15_000 });

  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_STATUS)).toHaveText('Done', {
    timeout: 15_000,
  });
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_EVENT_COUNT)).toContainText('3');

  const events = page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_EVENTS);
  await expect(events).toBeVisible();
  await expect(events).toContainText('Hello');
  await expect(events).toContainText('world');

  await page.getByRole('tab', { name: 'Assembled' }).click();
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_ASSEMBLED)).toContainText('Hello');

  await page.getByRole('tab', { name: 'Chat' }).click();
  const chat = page.getByTestId(HTTP_REQUEST_TEST_ID.STREAM_CHAT);
  await expect(chat).toBeVisible();
  await expect(chat).toContainText('Hello world');
});
