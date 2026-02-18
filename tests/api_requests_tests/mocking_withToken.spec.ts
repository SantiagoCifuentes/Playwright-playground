
import { test, expect } from '@playwright/test';

//these tests are not really working because request doesnt work with route and route 
    // is only for page but we are using request.get to make the request so it is not intercepting the request and
    //  fulfilling the response so we are not getting the mocked response but we are getting the actual response from the server and that is why the test is 
    // failing 

test('mock with invalid token', async ({ request, context }) => {

    await context.route('**/auth/me', async route => {
        const authHeader = route.request().headers()['authorization'];

        if (!authHeader || authHeader !== 'Bearer valid-token') { // Simulate unauthorized response for missing or invalid token
            await route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Invalid or missing token'
                })
            });
        } else {
            await route.continue();
        }
    });

    const response = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            Authorization: 'Bearer invalid-token' // Simulate an invalid token in the request
        }
    });

    expect(response.status()).toBe(401);
});

test('mock with valid token', async ({ request, context, page }) => {

    await page.route('**/auth/me', async route => { // it doesnt have any  expect because we are just mocking the response and not making any assertions in this test
        await route.fulfill({                           //with context didnt work because we were using request.get and request doesnt intercepet browser request
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: 15,
                username: 'emilys',

            })
        });
    });

    await page.goto('https://example.com');

    // const response = await request.get('https://dummyjson.com/auth/me', {
    //     headers: {
    //         Authorization: 'Bearer valid-token'
    //     }
    // });


    const data = await page.evaluate(async () => {
        const res = await fetch('https://dummyjson.com/auth/me', {
            headers: {
                Authorization: 'Bearer valid-token'
            }
        });
        return res.json();
    }) as { username: string; id: number };// this was because data was throwing an error because it didnt know the type of data we were returning from the page.evaluate function so we had to specify the type of data we were returning from the page.evaluate function
    expect(data.username).toBe('emilys');
});
