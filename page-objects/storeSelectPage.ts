import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class StoreSelectPage extends HelperBase {
    private storeDropdown: Locator

    constructor(page: Page){
        super(page)
        this.storeDropdown = this.page.locator('.website-switcher-label-wrap')
    }
    
    async selectFrStore(){
        await this.page.waitForTimeout(1000)
        await this.storeDropdown.click()
        await this.page.locator('.website-switcher-dropdown-list').click()
        await this.page.waitForSelector('.website-switcher-dropdown-list', { state: 'visible' })
        await this.page.locator('a[data-store="fr"]').click()               
        await this.page.locator(':text-is("Go")').click()
    }

}