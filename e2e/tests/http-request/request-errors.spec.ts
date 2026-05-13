import { expect, test } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import { HTTP_METHODS } from '@/domain/http-request/methods.consts';
import {
  mockHttpRequestNetworkError,
  mockHttpRequestSuccess,
} from '../../mocks/mock-routes';
import { sendRequest } from '../../utils/request';

HTTP_METHODS.forEach((method) => {
  test(`shows a mocked 500 response for ${method}`, async ({ page }) => {
    await mockHttpRequestSuccess(page, 500, {
      message: 'Internal Server Error',
    });

    await page.goto('/');
    await page.waitForLoadState('load');

    await sendRequest(page, { method });

    await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
    await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText(
      'Internal Server Error',
    );
  });
  test(`shows a mocked network error for ${method}`, async ({ page }) => {
    await mockHttpRequestNetworkError(page);

    await page.goto('/');
    await page.waitForLoadState('load');

    await sendRequest(page, { method });

    await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
    await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText(
      'Failed to fetch',
    );
  });
});
