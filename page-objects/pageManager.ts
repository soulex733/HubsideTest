import { Page, expect } from "@playwright/test";
import { StoreSelectPage } from "./storeSelectPage";

export class PageManager {
   

    private readonly page: Page
    private readonly storeSelectPage: StoreSelectPage

    constructor(page:Page){ 
        this.page = page
        this.storeSelectPage = new StoreSelectPage(this.page)
    }

    onStoreSelectPage() {
        return this.storeSelectPage;
    }

}