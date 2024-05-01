import { test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'


// Getting an authentication token an saving it in user.json file 
setup('authentication', async ({request}) => {  
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {email: "test733@test.com", password: "Test12345"}
        }
    })

    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    // Updating user object with accessToken value
    user.origins[0].localStorage[0].value = accessToken
    // Writing file to authFile
    fs.writeFileSync(authFile, JSON.stringify(user))

    // Creating a process.env variable to be used in config file
    process.env['ACCESS_TOKEN'] = accessToken
})