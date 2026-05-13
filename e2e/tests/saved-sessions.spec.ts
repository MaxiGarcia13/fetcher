import { expect, test } from '@playwright/test';
import { fillRequest } from 'e2e/utils/request';
import { SAVED_SESSIONS_TEST_ID } from '@/constants/test-ids';

test('should save and load a session', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('load');

  await fillRequest(page, {
    method: 'GET',
    url: 'https://example.test/api',
  });

  await page
    .getByTestId('new-session-button')
    .nth(1)
    .click();

  const item = page.getByTestId(SAVED_SESSIONS_TEST_ID.SAVED_SESSIONS_LIST_ITEM).nth(0);

  await expect(item).toBeVisible();
  await expect(item).toContainText('GET');
  await expect(item).toContainText('example.test');
});

test('should remove a session', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('load');

  await fillRequest(page, {
    method: 'GET',
    url: 'https://example.test/api',
  });

  await page
    .getByTestId('new-session-button')
    .nth(1)
    .click();

  await page.getByTestId(SAVED_SESSIONS_TEST_ID.SAVED_SESSIONS_LIST_ITEM_REMOVE_BUTTON).nth(0).click();

  await expect(page.getByTestId(SAVED_SESSIONS_TEST_ID.SAVED_SESSIONS_LIST_ITEM).nth(0)).not.toBeVisible();
});
