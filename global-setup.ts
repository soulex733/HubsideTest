import { request, expect } from "@playwright/test"
import user from '../HubsideTest/.auth/user.json'
import fs from 'fs'

async function globalSetup() {
    const authFile = '.auth/user.json'
    const context = await request.newContext()

    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {email: "test733@test.com", password: "Test12345"}
        }
    })

    const responseBody = await responseToken.json()
    const accessToken = responseBody.user.token
    // Updating user object with accessToken value
    user.origins[0].localStorage[0].value = accessToken
    // Writing file to authFile
    fs.writeFileSync(authFile, JSON.stringify(user))

    // Creating a process.env variable to be used in config file
    process.env['ACCESS_TOKEN'] = accessToken
    
    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {title: "Global Likes test article", description: "ttest", body: "test", tagList: []}
        },
        headers: {
            'Authorization': `Token ${process.env.ACCESS_TOKEN}`
        }
    })
    expect(articleResponse.status()).toEqual(201)
    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup;