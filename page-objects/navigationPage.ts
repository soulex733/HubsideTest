import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

     async customerAccountPage(){
        await this.page.getByRole('link', { name: 'Profil' }).click()        
     }
}