import { test } from '@playwright/test';


test('detect duplicate IDs and throw an error when duplicates are found', { tag: '@unique-ids' }, async ({ page }) => {
  test.fail(); // This test is expected to fail because the page contains duplicate IDs.
  await page.goto('https://sauce-demo.myshopify.com/');

  const duplicates = await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
    return ids.filter((id, i) => ids.indexOf(id) !== i);
  });

  if (duplicates.length > 0) {
    throw new Error(`Duplicate IDs found: ${[...new Set(duplicates)].join(', ')}`);
  }
});