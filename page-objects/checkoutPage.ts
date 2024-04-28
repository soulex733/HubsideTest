import { FrameLocator, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CheckoutPage extends HelperBase {
    
    private readonly iframe: FrameLocator

    constructor(page: Page) {
        super(page)
        this.iframe = this.page.locator('#stripe-payment-element').frameLocator('[name*="__privateStripeFrame"]')
        
    }
    
    async homeDelivery() {
        await this.page.locator('#row_method_bestway_tablerate').click()
        await this.page.locator('#continue-to-payment-trigger').click()
    }

    async creditCardPayment() {
        //const iframe = this.page.locator('#stripe-payment-element').frameLocator('[name*="__privateStripeFrame"]')
        await this.page.locator('[for="stripe_payments"]').click()
        await this.page.waitForTimeout(1000)
        await this.page.waitForLoadState('domcontentloaded')   
        await this.iframe.locator('#Field-numberInput').fill('4111111111111111')
        await this.iframe.locator('#Field-expiryInput').fill('1025')
        await this.iframe.locator('#Field-cvcInput').fill('111')
        await this.page.locator('#place-order-trigger').click()
    }

}