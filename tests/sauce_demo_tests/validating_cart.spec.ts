import { test } from '../../src/fixtures/TestFixture';

test.beforeEach(async ({ homePage }) => {
  await homePage.goToUrl();
});

test('cart button requires page reload on first interaction (known issue)', async ({ page, homePage, cartPage }) => {
  await test.step('validate cart behavior on first click', async () => {
    await homePage.openProduct('Grey jacket');
    await cartPage.addToCart();

    await homePage.openCart();
    await cartPage.checkoutButtonShouldNotBeVisible();

    await page.reload();
    await homePage.openCart();
  });
});