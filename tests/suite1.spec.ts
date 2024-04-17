import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async({page}) => {
    await page.goto('/')       
})

test.describe('Homepage', () => {

    test('Login with existing customer', async ({page}) => {
        const pm = new PageManager(page)
        await pm.onStoreSelectPage().selectFrStore()
    })

})