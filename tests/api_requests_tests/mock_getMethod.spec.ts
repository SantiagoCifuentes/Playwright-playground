import { test, expect } from '@playwright/test';

    //these tests are not really working because request doesnt work with route and route 
    // is only for page but we are using request.get to make the request so it is not intercepting the request and
    //  fulfilling the response so we are not getting the mocked response but we are getting the actual response from the server and that is why the test is 
    // failing 
test('mock get product details', async ({ page }) => {
    await page.route('**/products/1', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                category: 'smartphones',
                price: 549,
                discountPercentage: 12.96
            })
            

        });
        const response =  await request.get('https://dummyjson.com/products/1');
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body).toHaveProperty('title', 'iPhone 9');
        expect(body.title).toBe('iPhone 9');
        expect(route.request().method()).toBe('GET'); // Assert that the request method is GET
        expect(route.request().url()).toContain('/products/1'); // Assert that the request URL contains the expected endpoint


    })
});
