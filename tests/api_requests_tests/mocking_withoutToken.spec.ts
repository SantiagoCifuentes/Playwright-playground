
import { test, expect } from '@playwright/test';

test('mock  invalid login', async ({ request, context }) => {
  await context.route('**/auth/login', async route => {
    await route.fulfill({
      status: 400,
      body: JSON.stringify({ message: 'Invalid credentials' })
    });
  });

  const response = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'wrong'
    }
  });

  expect(response.status()).toBe(400);
});



test('mock  valid login', async ({ request, context }) => {
  await context.route('**/auth/login', async route => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ message: 'Login successful' })
    });
  });

  const response = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass'
    }
  });

  expect(response.status()).toBe(200);
});
