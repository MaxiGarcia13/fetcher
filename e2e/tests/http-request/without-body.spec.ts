import { expect, test } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';
import { METHODS_EXCLUDED_FROM_BODY } from '@/domain/http-request/methods.consts';
import {
  mockHttpRequestSuccess,
} from '../../mocks/mock-routes';
import { sendRequest } from '../../utils/send-request';

METHODS_EXCLUDED_FROM_BODY.forEach((method) => {
  test(`shows a mocked 200 response for ${method}`, async ({ page }) => {
    await mockHttpRequestSuccess(page, 200, { method, message: 'Mocked OK' });

    const expectedRequestHeaders = {
      'Content-Type': 'application/json',
    };

    const expectedRequestParameters = {
      param1: 'value1',
      param2: 'value2',
    };

    const requestUrl = 'https://example.test/api/params';

    const response = await sendRequest(page, {
      method,
      url: requestUrl,
      params: expectedRequestParameters,
      headers: expectedRequestHeaders,
    });

    await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toBeVisible();
    await expect(page.getByTestId(HTTP_REQUEST_TEST_ID.RESPONSE_EDITOR)).toContainText('Mocked OK');

    expect(response?.request().postDataJSON()).toEqual({
      url: requestUrl,
      method,
      params: expectedRequestParameters,
      headers: expectedRequestHeaders,
      body: '{}',
    });

    expect(await page.getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-body`).isDisabled()).toBe(true);
  });
});
