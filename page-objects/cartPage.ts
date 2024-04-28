import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CartPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async goToCheckout() {
        await this.page.locator('[class="action pagebuilder-mobile-hidden primary checkout"]').click()
    }

}