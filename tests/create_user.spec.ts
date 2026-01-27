import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.goToUrl();
});

test('register and login user', async ({ page }) => {
  const home = new HomePage(page);
  const auth = new LoginPage(page);

  await test.step('create user', async () => {
    await home.goToSignUp();
    await auth.register(
      'Santiago',
      'Perez',
      'santiago.ci9619@gmail.com',
      'MiClave12345'
    );
  });

  await test.step('login', async () => {
    await home.goToLogin();
    await auth.login(
      'santiago.ci9619@gmail.com',
      '123456'
    );
  });
});