import { test, expect } from '@playwright/test';



test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('Get API Tests', () => {
    test('type safety', async ({ request }) => {


        const getResponse = await request.get('/posts/1/comments');
        const getResponseBody = await getResponse.json();
        console.log("GET response body after POST:", getResponseBody);
        expect(getResponse.status()).toBe(200);
        expect(getResponse.statusText()).toBe('OK');
        expect(Array.isArray(getResponseBody)).toBeTruthy();
        expect(getResponseBody.length).toBeGreaterThan(0);

    });


});
