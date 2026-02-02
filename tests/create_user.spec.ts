
import { test } from '../src/fixtures/TestFixture';


test.beforeEach(async ({ homePage }) => {
  await homePage.goToUrl();
});

test('register and login user', async ({ loginPage, homePage,registerPage}) => {
 


  await test.step('create user', async () => {
    await homePage.goToSignUp();
    await registerPage.register(
      'Santiago',
      'Perez',
      'santiago.ci9619@gmail.com',
      'MiClave12345'
    );
  });

  await test.step('login', async () => {
    await homePage.goToLogin();
    await loginPage.login(
      'santiago.ci9619@gmail.com',
      '123456'
    );
  });
});