import { expect, test } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import {
  mockHttpRequestNetworkError,
  mockHttpRequestSuccess,
} from '../../mocks/mock-routes';
import { sendRequest } from '../../utils/send-request';

test('shows a mocked 200 response', async ({ page }) => {
  await mockHttpRequestSuccess(page, 200, { message: 'Mocked OK' });
  await sendRequest(page);

  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText('Mocked OK');
});

test('shows a mocked 500 response', async ({ page }) => {
  await mockHttpRequestSuccess(page, 500, { message: 'Internal Server Error' });
  await sendRequest(page);

  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText(
    'Internal Server Error',
  );
});

test('shows a mocked network error', async ({ page }) => {
  await mockHttpRequestNetworkError(page);
  await sendRequest(page);

  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText(
    'Failed to fetch',
  );
});
