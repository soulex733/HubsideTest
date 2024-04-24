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
        const pm = new PageManager(page)

        await test.step('Step 1 - Login', async () => {                     
            await pm.route().loginAsCustomer()
            await expect(page).toHaveURL(/index/) 
    })

        await test.step('Step 2 - Add product to cart', async () => {
            await pm.route().addProductToCart()
            await page.waitForTimeout(500)
            await page.locator('.step1').getByRole('button', {name: 'close'}).click()
             
        })

        await test.step('Step 3 - Go to Cart', async () => {
            await pm.route().goToCart()
            await expect(page).toHaveURL(/cart/)
        })

        await test.step('Step 4 - Go to Checkout', async () => {
            await pm.onCartPage().goToCheckout()
            await expect(page).toHaveURL(/cart/)
        })

    })

})