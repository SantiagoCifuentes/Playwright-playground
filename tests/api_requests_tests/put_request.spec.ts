import { test, expect } from '@playwright/test';
import putRequest from '../../test-data/api-requests/put_api_example.json';


test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('Put API Tests', () => {
    test('put safety', async ({ request }) => {


        const putResponse = await request.put('/posts/1', { data: putRequest });
        const putResponseBody = await putResponse.json();
        console.log("PUT response body:", putResponseBody);

    });


});
