import { test, expect } from '@playwright/test';



test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('POST API Tests', () => {
    test('type safety', async ({ request }) => {


        const getResponse = await request.get('/posts/1/comments');
        const getResponseBody = await getResponse.json();
        console.log("GET response body after POST:", getResponseBody);
        expect(getResponse.status()).toBe(200);
        // expect(getResponseBody).toHaveProperty('id', 1);
        // expect(getResponseBody).toHaveProperty('title');
        // expect(typeof getResponseBody.id).toBe('number');

    });


});
