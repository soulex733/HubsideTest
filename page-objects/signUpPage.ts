import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { faker, fakerFR } from "@faker-js/faker";

export class SignUpPage extends HelperBase {
    constructor(page: Page){
        super(page)
    }

    /**
     * This method is used to create an account with correct data
     */
    async createAccountWithCorrectData() {         
        const firstname = faker.person.firstName()
        const lastname = faker.person.lastName()
        const email = `${firstname+lastname.replace(' ', '')}${faker.number.int(1000)}@test.com`
        const password = faker.internet.password();
        //const phoneNumber = "+33189480356"
        const address = "110 bis Rue Jean-Pierre Timbaud"
        const city = "Paris"
        const zip = "75011"

        await this.page.locator('#firstname').fill(firstname)
        await this.page.locator('#lastname').fill(lastname)
        await this.page.locator('#telephone').fill(process.env.PHONE_NUMBER!)
        await this.page.locator('#street_1').fill(address)
        await this.page.waitForTimeout(500)
        await this.page.keyboard.press(" ");
        await this.page.waitForTimeout(2000)
        await this.page.keyboard.press('Backspace')
        await this.page.locator('[class="pac-item"]').click()    
        await this.page.locator('#city').fill(city)
        await this.page.locator('#zip').fill(zip)        
        await this.page.locator('#email_address').fill(email)
        await this.page.locator('#password').fill(password)
        await this.page.locator('#password-confirmation').fill(password)
        await this.page.locator('[class="action submit primary"]').click()
    }

}