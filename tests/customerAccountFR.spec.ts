import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    await page.goto('/')
    await pm.route().acceptCookies()

})

test.describe('Customer Account test suite', () => {

    test('Create new account', async ({page}) => {
        const pm = new PageManager(page)

        await pm.onStoreSelectPage().selectFrStore()
        await pm.route().customerAccountPage()         
        await page.waitForLoadState('domcontentloaded')  
        await pm.onCustomerAccountPage().signUp()        
        await page.waitForLoadState('domcontentloaded')
        await pm.onSignUpPage().createAccountWithCorrectData()                
        await expect(page).toHaveURL(/index/)  
    })
    
    test('Login with existing customer', async ({page}) => {
        const pm = new PageManager(page)

        await pm.route().loginAsCustomer()
        await expect(page).toHaveURL(/index/)
        await expect(page).toHaveScreenshot()
        //await page.locator('.account-nav').getByRole('listitem').last().click()
    })
    
    test('Login with non-existing customer', async ({page}) => {
        const pm = new PageManager(page)
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()

        await pm.onStoreSelectPage().selectFrStore()
        await pm.route().customerAccountPage()
        await pm.onCustomerAccountPage().signIn(randomEmail, randomPassword) 
        await page.waitForTimeout(2000)       
        await expect(page.locator('[class="message-error error message"]')).toBeVisible()
    })

    // DOESNT WORK WITH CAPTCHA
    // test('Check error messages with incorrect login data', async ({page}) => {
    //     const pm = new PageManager(page)
       
    //     await pm.onStoreSelectPage().selectFrStore()
    //     await pm.route().customerAccountPage()
    //     await pm.onCustomerAccountPage().signIn('asd@asd', '')        
    //     await page.waitForTimeout(1000)            
    //     await expect(page.locator('#email-error')).toHaveText('Veuillez entrer une adresse email valide (Ex : johndoe@domain.com).')
    //     await expect(page.locator('#pass-error')).toBeVisible()
    //     await page.locator('[class="page-wrapper"]').locator('#pass').fill('123qwe')
    //     await page.locator('.js-show-password').click()


    // })

    test('Check hide password', async ({page}) => {
        const pm = new PageManager(page)
        
        await pm.onStoreSelectPage().selectFrStore()
        await pm.route().customerAccountPage()
        await page.locator('[class="page-wrapper"]').locator('#pass').fill('123qwe')
        await page.waitForTimeout(1000)
        await page.locator('[class="textfield_icon js-show-password"]').click()
        await expect(page.locator('[class="textfield_icon js-show-password is-active"]')).toBeVisible()
        await expect(page.locator('[class="page-wrapper"]').locator('#pass')).toHaveAttribute('type', 'text')
    })

   

})