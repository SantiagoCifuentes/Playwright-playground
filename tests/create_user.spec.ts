
import { test } from '../src/fixtures/TestFixture';
import  users  from '../test-data/users.json';


test.beforeEach(async ({ homePage }) => {
  await homePage.goToUrl();
});

test('register and login user', async ({ loginPage, homePage,registerPage}) => {
 


  await test.step('register user', async () => {
    await homePage.goToSignUp();
    await registerPage.register(
      users.validUser.firstName,
      users.validUser.lastName,
      users.validUser.email,
      users.validUser.password
    );
  });

  await test.step('login', async () => {
    await homePage.goToLogin();
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );
  });
});