import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { StoreSelectPage } from "./storeSelectPage";
import { HomePage } from "./homePage";
import { CustomerAccountPage} from "./customerAccountPage";
import { SignUpPage } from "./signUpPage";
import { CartPage } from "./cartPage";
import { CheckoutPage } from "./checkoutPage";

export class PageManager {   

    private readonly page: Page
    private readonly storeSelectPage: StoreSelectPage
    private readonly homePage: HomePage
    private readonly customerAccountPage: CustomerAccountPage
    private readonly navigationPage: NavigationPage
    private readonly signUpPage: SignUpPage
    private readonly cartPage: CartPage
    private readonly checkoutPage: CheckoutPage

    constructor(page:Page){ 
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.storeSelectPage = new StoreSelectPage(this.page)
        this.homePage = new HomePage(this.page)
        this.customerAccountPage = new CustomerAccountPage (this.page)
        this.signUpPage = new SignUpPage (this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
    }

    route(){
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

    onCartPage() {
        return this.cartPage
    }

    onCheckoutPage(){
        return this.checkoutPage
    }

}