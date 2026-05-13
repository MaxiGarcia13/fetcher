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
    await page
      .getByTestId(`${HTTP_REQUEST_TEST_ID.REQUEST_OPTIONS_INPUT_VALUE}-${rowNumber}`)
      .fill(value);
  }
}
