import { test, expect } from '@playwright/test';
import putApiRequestBody from '../../test-data/api-requests/put_api_example.json';


test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('Get API Tests', () => {
    test('type safety', async ({ request }) => {


        const getResponse = await request.get('/comments',{ params: { postId: '1' } });
        const getResponseBody = await getResponse.json();
        console.log("GET response body after POST:", getResponseBody);
        expect(getResponse.status()).toBe(200);
        expect(getResponse.statusText()).toBe('OK');
        expect(Array.isArray(getResponseBody)).toBeTruthy();
        expect(getResponseBody.length).toBeGreaterThan(0);

    });


});
