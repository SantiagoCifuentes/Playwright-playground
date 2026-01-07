import { test, expect } from '@playwright/test';


test('detecting duplciated ids, throws an error if duplicated ids are found', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');

  const duplicates = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    return ids.filter((id, i) => ids.indexOf(id) !== i);
  });

  if (duplicates.length > 0) {
    throw new Error(`duplicated ids found: ${[...new Set(duplicates)].join(', ')}`);
  }
});