import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { PageManager } from '../page-objects/pageManager'

export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async acceptCookies() {
        await this.page.waitForTimeout(1000)
        const cookieButton = this.page.locator('#tarteaucitronPersonalize2')
        if (await cookieButton.isVisible()) {
            await cookieButton.click()
        }
     } 
    
    async customerAccountPage(){
        await this.page.locator('[class="page-wrapper"]').getByRole('link', { name: 'Profil' }).click()        
     }

    async loginAsCustomer() {
        const pm = new PageManager (this.page)
        await pm.onStoreSelectPage().selectFrStore()
        await pm.route().customerAccountPage()       
        await pm.onCustomerAccountPage().signIn('mytvo+1@smile.fr', 'Test12345')        
     }

    async addProductToCart() {
        await this.page.locator('#ui-id-3').click()
        await this.page.locator('#ui-id-9').click()
        await this.page.locator('[class="products wrapper grid products-grid"]').getByRole('listitem').first().locator('[class="action tocart primary"]').click()
     }
     
     async addProductToCartFromPDP() {
        await this.page.goto('https://mcstaging.hubside.store/fr/iphone-14-128go-mauve.html')
        await this.page.waitForTimeout(1000)
        await this.page.locator('[class="action primary small tocart tocart-sidebar"]').click()
     }   

    async goToCart() {
        await this.page.locator('[class="minicart-wrapper"]').click()
     }
}