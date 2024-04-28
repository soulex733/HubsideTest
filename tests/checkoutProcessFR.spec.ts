import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    await page.goto('/')
    await pm.route().acceptCookies()

})

test.describe('Checkout Process test suite', () => {

    test('Create an order', async ({page}) => {
        test.setTimeout(60000)
        const pm = new PageManager(page)

        await test.step('Step 1 - Login', async () => {                     
            await pm.route().loginAsCustomer()
            await expect(page).toHaveURL(/index/) 
    })

        await test.step('Step 2 - Add product to cart', async () => {
            await pm.route().addProductToCart()
            await page.waitForTimeout(1000)
            await page.locator('.step1').getByRole('button', {name: 'close'}).click()          
        })

        await test.step('Step 3 - Go to Cart', async () => {
            await pm.route().goToCart()            
            await page.waitForTimeout(2000)
            await expect(page).toHaveURL(/cart/)
        })

        await test.step('Step 4 - Go to Checkout', async () => {
            await pm.onCartPage().goToCheckout() 
            await page.waitForTimeout(2000)            
        })

        await test.step('Step 5 - Complete order', async () => {
            await pm.onCheckoutPage().homeDelivery()
            await pm.onCheckoutPage().creditCardPayment()
                        
            //await page.waitForTimeout(5000)            
            //await expect(page.locator('[class="checkout-success"]')).toBeVisible()          
        })

    })

})