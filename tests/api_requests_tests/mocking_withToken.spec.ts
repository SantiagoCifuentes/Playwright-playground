import { test, expect } from '@playwright/test';
//these tests are not really working because request doesnt work with route and route 
    // is only for page but we are using request.get to make the request so it is not intercepting the request and
    //  fulfilling the response so we are not getting the mocked response but we are getting the actual response from the server and that is why the test is 
    // failing 
test('mock auth endpoint with invalid token', async ({ page }) => {
    await page.route('**/auth/me', async (route) => {
        const authHeader = route.request().headers()['authorization'];

        if (authHeader !== 'Bearer valid-token') {
            await route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'Invalid or missing token' }),
            });
            return;
        }

        await route.continue();
    });

    await page.goto('https://dummyjson.com');

    const result = await page.evaluate(async () => {
        const response = await fetch('https://dummyjson.com/auth/me', {
            headers: { Authorization: 'Bearer invalid-token' },
        });

        const body = await response.json();
        return { status: response.status, body };
    });

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Invalid or missing token');
});

test('mock auth endpoint with valid token', async ({ page }) => {
    await page.route('**/auth/me', async (route) => {
        const authHeader = route.request().headers()['authorization'];

        if (authHeader === 'Bearer valid-token') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 15,
                    username: 'emilys',
                }),
            });
            return;
        }

        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Invalid or missing token' }),
        });
    });

    await page.goto('https://dummyjson.com');

    const result = await page.evaluate(async () => {
        const response = await fetch('https://dummyjson.com/auth/me', {
            headers: { Authorization: 'Bearer valid-token' },
        });

        const body = await response.json();
        return { status: response.status, body };
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ id: 15, username: 'emilys' });
});
