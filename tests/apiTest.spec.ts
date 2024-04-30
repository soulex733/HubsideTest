import { test, expect, request} from '@playwright/test'
import tags from '../test-data/tags.json'

test.beforeEach(async ({page}) => {
    await page.route('*/**/api/tags', async route => {
        
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })    

    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name: "Email"}).fill('test733@test.com')
    await page.getByRole('textbox', {name: "Password"}).fill('Test12345')
    await page.getByRole('button').click()

})

test('has description', async ({page}) => {
    await page.waitForTimeout(1000)
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = "This is a MOCK test title"
        responseBody.articles[0].description = "This is a MOCK test description"

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })

    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK test description')
})

test('delete article', async ({page, request}) => {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {email: "test733@test.com", password: "Test12345"}
        }
    })

    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {title: "tes", description: "ttest", body: "test", tagList: []}
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })

    expect(articleResponse.status()).toEqual(201)

    await page.getByText('Global Feed').click()
    await page.getByText('ttest').click()
    await page.getByRole('button', {name: "Delete Article"}).first().click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).not.toContainText('tes')
    
})