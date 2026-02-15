
import { test, expect } from '@playwright/test';

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

test('mock with valid token', async ({ request, context }) => {

    await context.route('**/auth/me', async route => { // it doesnt have any  expect because we are just mocking the response and not making any assertions in this test
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: 15,
                username: 'emilys',
                
            })
        });
    });

    const response = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            Authorization: 'Bearer valid-token'
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.username).toBe('emilys');
});
