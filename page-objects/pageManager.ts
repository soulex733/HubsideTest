import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { StoreSelectPage } from "./storeSelectPage";
import { HomePage } from "./homePage";
import { CustomerAccountPage} from "./customerAccountPage";
import { SignUpPage } from "./signUpPage";

export class PageManager {   

    private readonly page: Page
    private readonly storeSelectPage: StoreSelectPage
    private readonly homePage: HomePage
    private readonly customerAccountPage: CustomerAccountPage
    private readonly navigationPage: NavigationPage
    private readonly signUpPage: SignUpPage

    constructor(page:Page){ 
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.storeSelectPage = new StoreSelectPage(this.page)
        this.homePage = new HomePage(this.page)
        this.customerAccountPage = new CustomerAccountPage (this.page)
        this.signUpPage = new SignUpPage (this.page)
    }

    navigateTo(){
        return this.navigationPage
    }
    
    onStoreSelectPage() {
        return this.storeSelectPage
    }

    onHomePage() {
        return this.homePage
    }

    onCustomerAccountPage() {
        return this.customerAccountPage
    }

    onSignUpPage() {
        return this.signUpPage
    }

}