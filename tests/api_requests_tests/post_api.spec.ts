import { test, expect } from '@playwright/test';
import post_api from '../../test-data/api-requests/post_api_example.json';

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


    });
});
