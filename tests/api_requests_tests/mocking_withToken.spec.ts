
import { test, expect } from '@playwright/test';

test('mock  with invalid token', async ({ request, context }) => {

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

});

test('mock with valid token', async ({  context }) => {

    await context.route('**/auth/me', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: 15,
                username: 'emilys',
                email: 'emily.johnson@x.dummyjson.com',
                firstName: 'Emily',
                lastName: 'Johnson',
                gender: 'female',
                image: 'https://dummyjson.com/icon/emilys/128'
            })
        });

    })
    
});


