import { Page } from "puppeteer";

declare class Store {
    public constructor(page: Page)
    hasStock(itemNumber: string): PromiseLike<boolean>
    getCartLink(itemNumber: string): string
    getProductTitle(itemNumber: string): PromiseLike<string | null> 
}

interface Item {
    number: string
    title: string
}

interface BoughtResponse {
    inStock: boolean
    cartLink: string
}