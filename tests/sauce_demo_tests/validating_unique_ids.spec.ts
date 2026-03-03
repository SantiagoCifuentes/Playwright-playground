import { test, expect } from '@playwright/test';


test('detect duplicated IDs and throw an error when duplicates are found', {tag: '@unique-ids'},async ({ page }) => {
    test.fail()// this test is expected to fail because the page contains duplicated ids
  await page.goto('https://sauce-demo.myshopify.com/');

  const duplicates = await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
    return ids.filter((id, i) => ids.indexOf(id) !== i);
  });

  if (duplicates.length > 0) {
    throw new Error(`duplicated ids found: ${[...new Set(duplicates)].join(', ')}`);
  }
});