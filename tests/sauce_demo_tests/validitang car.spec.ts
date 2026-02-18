import { test } from '../../src/fixtures/TestFixture';

test.beforeEach(async ({ homePage }) => {
  await homePage.goToUrl();
});

test('cart button requires page reload to work (known bug)', async ({ page, homePage, cartPage }) => {


  await test.step('validating that cart button doesnt work on the first click', async () => {

    await homePage.openProduct('Grey jacket');
    await cartPage.addToCart();

    await homePage.openCart();
    await cartPage.checkoutButtonShouldNotBeVisible();
    // workaround for known bug
    await page.reload();
    await homePage.openCart();

    // await product.checkoutButtonShouldBeVisible();
  });
});