import { test, expect } from '@playwright/test';
import patchRequest from '../../test-data/api-requests/put_api_example.json';


test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('Put API Tests', () => {
    test('put safety', async ({ request }) => {


        const patchResponse = await request.patch('/posts/1', { data: patchRequest });
        const patchResponseBody = await patchResponse.json();
        console.log("PATCH response body:", patchResponseBody);
        expect(patchResponse.status()).toBe(200);
        expect(patchResponse.statusText()).toBe('OK');
       
        expect(patchResponseBody).toHaveProperty('title', patchRequest.title);
      

    });


});
