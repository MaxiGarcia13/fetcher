import { expect, test } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import {
  mockHttpRequestNetworkError,
  mockHttpRequestSuccess,
} from '../../mocks/mock-routes';
import { sendRequest } from '../../utils/send-request';

test('shows a mocked 200 response', async ({ page }) => {
  await mockHttpRequestSuccess(page, 200, { message: 'Mocked OK' });

  const expectedRequestHeaders = {
    'Content-Type': 'application/json',
  };

  const expectedRequestParameters = {
    param1: 'value1',
    param2: 'value2',
  };

  const requestUrl = 'https://example.test/api/params';

  const response = await sendRequest(page, {
    method: 'GET',
    url: requestUrl,
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
  });

  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
  await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText('Mocked OK');

  expect(response?.request().postDataJSON()).toEqual({
    url: requestUrl,
    method: 'GET',
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
    body: '{}',
  });
});

test('shows a mocked 500 response', async ({ page }) => {
  await mockHttpRequestSuccess(page, 500, {
    message: 'Internal Server Error',
  });
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
