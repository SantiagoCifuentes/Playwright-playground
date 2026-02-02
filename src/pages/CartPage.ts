import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    readonly addToCartButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.checkoutButton = page.getByRole('button', { name: 'Check Out' });
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async checkoutButtonShouldNotBeVisible() {
    await expect(this.checkoutButton).not.toBeVisible();
  }

    async checkoutButtonShouldBeVisible() {
    await expect(this.checkoutButton).toBeVisible();
  }
}