
import { test, expect } from '@playwright/test';



const baseURL = 'https://dummyjson.com';

test.describe('Authentication tests @authAPI',  () => {

  test(' valid login', async ({ request }) => {
    console.log('Testing valid login...');
    const response = await request.post(`${baseURL}/auth/login`, {
      data: {
        username: 'emilys',
        password: 'emilyspass'
      }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Assert that the response contains the expected properties
    const token = responseBody.accessToken ?? responseBody.token;
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(10);
  });


  test('invalid login', async ({ request }) => {
    const response = await request.post(`${baseURL}/auth/login`, {
      data: {
        username: 'emilys',
        password: 'wrongpassword'
      }

    });
    // console.log(response);

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    console.log(responseBody);

    // Assert that the response contains the expected error message
    expect(responseBody).toHaveProperty('message', 'Invalid credentials');

  });

  test('auth with token', async ({ request }) => {

    const login = await request.post(`${baseURL}/auth/login`, {
      data: {
        username: 'emilys',
        password: 'emilyspass'
      }
    });


    // console.log(login);
    expect(login.status()).toBe(200);

    const loginResponse = await login.json();
    // console.log(loginResponse);
    const token = loginResponse.accessToken ?? loginResponse.token;

    const response = await request.get(`${baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}` // Use the valid token in the request
      }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    // console.log(responseBody);
    expect(responseBody.username).toBe('emilys');



  });



  test('auth with invalid token', async ({ request }) => {

    const response = await request.get(`${baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer invalidtoken` // Use an invalid token in the request
      }
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);

  });
});

