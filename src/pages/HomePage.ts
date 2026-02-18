import { Locator, Page } from '@playwright/test';
import 'dotenv/config';

export class HomePage {

    readonly page: Page;


    constructor(page: Page) { //we passe the page because each test will have its own page instance
        this.page = page;

    }

    //methods
    async goToUrl() {
        if (process.env.TEST_EXECUTION_ENV === 'qa') {
            await this.page.goto(`${process.env.HOME_URL}`);
            console.log('Navigated to QA environment');
        }
        // else if (process.env.TEST_EXECUTION_MODE === 'dev') {
        //     await this.page.goto(`${process.env.YOUTUBE_URL}`);
        //     console.log('Navigated to DEV environment');
        // }
    }

    async goToSignUp() {
        await this.page.getByRole('link', { name: 'Sign up' }).click();
    }

    async goToLogin() {
        await this.page.getByRole('link', { name: 'Log In' }).click();
    }

    async openProduct(productName: string) {
        await this.page.getByRole('link', { name: productName }).click();
    }

    async openCart() {
        await this.page.getByRole('link', { name: 'My Cart' }).click();
    }


}