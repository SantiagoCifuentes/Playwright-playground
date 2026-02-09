import { test, expect } from '@playwright/test';
import post_api from '../../test-data/api-requests/static_post_api_example.json';

test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('POST API Tests', () => {


    test('Create a new resource', async ({ request }) => {
        const response = await request.post('/posts', { data: post_api });
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');
        expect(responseBody).toHaveProperty('id',101);//  I tried with 1 but JSONPlaceholder always returns id: 101 for POST requests (fake persistence)
        expect(responseBody).toMatchObject(post_api);//same as above, i had to change the id in the test data to 101 to make this assertion work, otherwise it would fail because of the id mismatch
        expect(responseBody).toHaveProperty('title', post_api.title);
        expect(typeof responseBody.id).toBe('number');
    });
});
