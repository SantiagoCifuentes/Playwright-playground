import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[name="customer[first_name]"]');
    this.lastName = page.locator('input[name="customer[last_name]"]');
    this.email = page.locator('input[name="customer[email]"]');
    this.password = page.locator('input[name="customer[password]"]');
    this.createButton = page.getByRole('button', { name: 'Create' });
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.createButton.click();
  }
}