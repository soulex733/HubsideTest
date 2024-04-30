import { test, expect} from '@playwright/test'
import tags from '../test-data/tags.json'

test.beforeEach(async ({page}) => {
    await page.route('*/**/api/tags', async route => {
        
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = "This is a test title"
        responseBody.articles[0].description = "This is a test description"

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/')
})

test('has title', async ({page}) => {
    //await page.waitForTimeout(2000)
    await expect(page.locator('app-article-list p').first()).toContainText('This is a test description')
})