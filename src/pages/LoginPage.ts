import { Locator, Page } from '@playwright/test';
import 'dotenv/config';


export class LoginPage {

    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly createButton: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[name="customer[first_name]"]');
        this.lastNameInput = page.locator('input[name="customer[last_name]"]');
        this.emailInput = page.locator('input[name="customer[email]"]');
        this.passwordInput = page.locator('input[name="customer[password]"]');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async register(name: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.createButton.click();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}