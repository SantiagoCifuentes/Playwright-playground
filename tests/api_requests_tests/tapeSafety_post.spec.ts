import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { postRequestBody } from '../../src/utils/api_helper';


test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('POST API Tests', () => {
    test('type safety', async ({ request }) => {


        const title = faker.lorem.sentence();


        const requestBody = await postRequestBody(title, false);
        const response = await request.post('/posts', { data: requestBody });
        const responseBody = await response.json();
        console.log("Dynamic POST response body:", responseBody);

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');
        expect(responseBody).toHaveProperty('id', 101);
        // expect(responseBody).toMatchObject({userId: "2", id: 101, title: title, completed: false});
        expect(responseBody).toHaveProperty('title', title);

        expect(responseBody).toHaveProperty('completed');
        expect(typeof responseBody.id).toBe('number');
    });
});
