import { expect, test } from '@playwright/test';
import { fillRequest, sendButtonClick, sendRequest } from 'e2e/utils/request';
import { deleteKeyValueTableRow, getInputFieldValue, maskKeyValueTableRow, toggleKeyValueTableRowVisibility } from '../../utils/fill-key-value-table';

const url = 'https://example.test/api';
const method = 'GET';

const expectedRequestParameters = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
};

const expectedRequestHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer 1234567890',
};

test('should fill key value table', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');

  const response = await sendRequest(page, {
    method,
    url,
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
  });

  expect(response?.request().postDataJSON()).toEqual({
    url,
    method,
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
    body: expect.any(String),
  });
});

test('should delete key value table row', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');

  await fillRequest(page, {
    method,
    url,
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
  });

  await deleteKeyValueTableRow(page, 'params', 0 + 1);
  await deleteKeyValueTableRow(page, 'headers', 0 + 1);

  const response = await sendButtonClick(page);

  const { key2, key3 } = expectedRequestParameters;
  const { Accept, Authorization } = expectedRequestHeaders;

  expect(response?.request().postDataJSON()).toEqual({
    url,
    method,
    params: { key2, key3 },
    headers: { Accept, Authorization },
    body: expect.any(String),
  });
});

test('should mask key value table row', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');

  await fillRequest(page, {
    method,
    url,
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
  });

  await maskKeyValueTableRow(page, 'params', 0 + 1);

  const paramsInputFieldType = await getInputFieldValue(page, 0 + 1).getAttribute('type');
  expect(paramsInputFieldType).toBe('password');

  await maskKeyValueTableRow(page, 'headers', 0 + 1);

  const headersInputFieldType = await getInputFieldValue(page, 0 + 1).getAttribute('type');
  expect(headersInputFieldType).toBe('password');
});

test('should toggle key value table row visibility', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');

  await fillRequest(page, {
    method,
    url,
    params: expectedRequestParameters,
    headers: expectedRequestHeaders,
  });

  await toggleKeyValueTableRowVisibility(page, 'params', 0 + 1);
  await toggleKeyValueTableRowVisibility(page, 'params', 0 + 2);
  await toggleKeyValueTableRowVisibility(page, 'headers', 0 + 1);
  await toggleKeyValueTableRowVisibility(page, 'headers', 0 + 2);

  const response = await sendButtonClick(page);

  const { key3 } = expectedRequestParameters;
  const { Authorization } = expectedRequestHeaders;

  expect(response?.request().postDataJSON()).toEqual({
    url,
    method,
    params: { key3 },
    headers: { Authorization },
    body: expect.any(String),
  });
});
