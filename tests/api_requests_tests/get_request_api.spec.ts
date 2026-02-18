import { test, expect } from '@playwright/test';

const BASE_URL = 'https://dummyjson.com';

test.describe('Products API - DummyJSON', () => {

  test('get product by id', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('price');
  });


  test('get non-existent product', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/999999`);

    expect(response.status()).toBe(404);
  });

});