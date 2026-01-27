import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    console.log('Before each test');
    await page.goto('https://sauce-demo.myshopify.com/');
});


test('test', async ({ page }) => {

    await test.step('validating that cart button doesnt work on the first click', async () => {

        //theres a bug in the app in wich the cart button remains reloading  when its clicked. it only works after reloading the page

        await page.getByRole('link', { name: 'Grey jacket' }).click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
        await page.getByRole('link', { name: 'My Cart' }).click();
        await expect(page.getByRole('button', { name: 'Check Out' })).not.toBeVisible();

        //workaround
        await page.reload();
        await page.getByRole('link', { name: 'My Cart' }).click();
        await expect(page.getByRole('button', { name: 'Check Out' })).toBeVisible();

    });




});
