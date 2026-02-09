import { test, expect } from '@playwright/test';

import { formatAPIRequest } from '../../src/utils/api_helper'; 
import path from 'path';
import fs from 'fs';

test.use({
    baseURL: "https://jsonplaceholder.typicode.com"
})

test.describe('POST API Tests', () => {
    test('Create a new resource', async ({ request }) => {
        const dynamicDataPath = path.join(__dirname, '../../test-data/api-requests/dynamic_post_api_example.json');
        const dynamicDataTemplate = fs.readFileSync(dynamicDataPath, 'utf-8');

        // Values to replace in the dynamic data template: userId, id, title
        const valuesToReplace = ["2", 101, "hablalo"];
        
        const formattedDynamicData =  await formatAPIRequest(dynamicDataTemplate, valuesToReplace);
        const response = await request.post('/posts', { data: JSON.parse(formattedDynamicData) });
        const responseBody = await response.json();
        console.log("Dynamic POST response body:", responseBody);

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');
        expect(responseBody).toHaveProperty('id',101);
        expect(responseBody).toMatchObject({userId: "2", id: 101, title: "hablalo"});
        expect(responseBody).toHaveProperty('title', "hablalo");
        expect(typeof responseBody.id).toBe('number');
    });
});
