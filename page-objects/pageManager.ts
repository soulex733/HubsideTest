import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { StoreSelectPage } from "./storeSelectPage";
import { HomePage } from "./homePage";
import { LoginPage } from "./loginPage";

export class PageManager {   

    private readonly page: Page
    private readonly storeSelectPage: StoreSelectPage
    private readonly homePage: HomePage
    private readonly loginPage: LoginPage
    private readonly navigationPage: NavigationPage

    constructor(page:Page){ 
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.storeSelectPage = new StoreSelectPage(this.page)
        this.homePage = new HomePage(this.page)
        this.loginPage = new LoginPage(this.page)
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

    onLoginPage() {
        return this.loginPage
    }

}