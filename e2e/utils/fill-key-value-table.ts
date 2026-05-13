import type { Page } from '@playwright/test';
import { HTTP_REQUEST_TEST_ID } from '@/constants/tests/http-request';

export async function fillKeyValueTable(
  page: Page,
  entries: Array<[string, string]>,
): Promise<void> {
  for (let index = 0; index < entries.length; index++) {
    const [key, value] = entries[index];
    const rowNumber = index + 1;

    await page
      .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_INPUT_KEY}-${rowNumber}`)
      .fill(key);
    await getInputFieldValue(page, rowNumber)
      .fill(value);
  }
}

export async function deleteKeyValueTableRow(
  page: Page,
  tab: 'params' | 'headers',
  index: number,
): Promise<void> {
  await page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-${tab}`)
    .click();

  await page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TABLE_ROW_DELETE_BUTTON}-${index}`)
    .click();
}

export async function maskKeyValueTableRow(
  page: Page,
  tab: 'params' | 'headers',
  rowNumber: number,
): Promise<void> {
  await page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-${tab}`)
    .click();
  await page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TABLE_ROW_MASK_BUTTON}-${rowNumber}`)
    .click();
}

export async function toggleKeyValueTableRowVisibility(
  page: Page,
  tab: 'params' | 'headers',
  rowNumber: number,
): Promise<void> {
  await page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TAB}-${tab}`)
    .click();
  await page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_TABLE_ROW_VISIBILITY_BUTTON}-${rowNumber}`)
    .click();
}

export function getInputFieldValue(
  page: Page,
  rowNumber: number,
) {
  return page
    .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_INPUT_VALUE}-${rowNumber}`);
}
