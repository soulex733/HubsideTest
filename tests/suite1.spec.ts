import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')

})

test.describe('Customer Account test suite', () => {

    test('Login with existing customer', async ({page}) => {
        const pm = new PageManager(page)
        await pm.onStoreSelectPage().selectFrStore()
        await pm.navigateTo().customerAccountPage()       
        await pm.onLoginPage().signIn('mytvo+1@smile.fr', 'Test12345')
        await expect(page).toHaveURL(/index/)
    })

    test('Login with non-existingg customer', async ({page}) => {
        const pm = new PageManager(page)
        //const randomFullName = faker.person.fullName()
        // const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()
        await pm.onStoreSelectPage().selectFrStore()
        await pm.navigateTo().customerAccountPage()
        await pm.onLoginPage().signIn(randomEmail, randomPassword) 
        await page.waitForTimeout(2000)       
        await expect(page.locator('.message-error error message')).toBeVisible()


    })

})