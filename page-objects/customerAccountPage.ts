import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CustomerAccountPage extends HelperBase {

    constructor(page: Page){
        super(page)
    }

    /**
     * This method is used to Log in into My Account with existing customer
     * @param email Specify an existing email
     * @param password Use valid password for the existing account
     */
    async signIn(email: string, password: string) {
        const loginForm = this.page.locator('[class="page-wrapper"]').locator('[class="block block-customer-login"]')
        await loginForm.locator('#email').fill(email)
        await loginForm.locator('#pass').fill(password)
        await loginForm.locator('#send2').click()
    }

    async signUp() {
        await this.page.locator('[class="action create primary"]').click()       

    }


}