import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class HomePage extends HelperBase {

    constructor(page: Page){
        super(page)
    }


    // async clickAccountLink(){

    //     await this.page.getByRole('link', { name: 'Profil' }).click()

    // }
}