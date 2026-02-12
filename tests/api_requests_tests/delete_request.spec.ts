import { test, expect } from '@playwright/test';
import putRequest from '../../test-data/api-requests/put_api_example.json';


test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('delete API Tests', () => {
    test('delete safety', async ({ request }) => {


        const deleteResponse = await request.delete('/posts/1');
        console.log("DELETE response status:", deleteResponse.status());
        console.log("DELETE response status text:", deleteResponse.statusText());
        expect(deleteResponse.status()).toBe(200);
        expect(deleteResponse.statusText()).toBe('OK');
        const deleteResponseBody = await deleteResponse.text();
        console.log("DELETE response body:", deleteResponseBody);
       
    });


});
