import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    console.log('Before each test');
    await page.goto('https://sauce-demo.myshopify.com/');
});

test('test', async ({ page }) => {

    await test.step('create user', async () => {


        await page.getByRole('link', { name: 'Sign up' }).click();
        // await page.locator('#customer_register_link', {hasText: 'Sign up'}).click();--> throws an error for duplicate ids, one of them is hidden, the has text works but it's not the best practice
        // await page.getByLabel('First Name').fill('Santiago'); --> throws an error for duplicate ids, one of them is the div that contains the label
        await page.locator('input[name="customer[first_name]"]').fill('Santiago');
        await page.locator('input[name="customer[last_name]"]').fill('Perez');
        await page.locator('input[name="customer[email]"]').fill('santiago.ci9619@gmail.com');
        await page.locator('input[name="customer[password]"]').fill('MiClave12345');
        await page.getByRole('button', { name: 'Create' }).click();
    });



    await test.step('login', async () => {

        await page.getByRole('link', { name: 'Log In' }).click();
        await page.locator('input[name="customer[email]"]').fill('santiago.ci9619@gmail.com');
        await page.locator('input[name="customer[password]"]').fill('123456');
        await page.getByRole('button', { name: 'Sign In' }).click();


    });




});