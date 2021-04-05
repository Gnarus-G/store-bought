import { Page } from "puppeteer";

export declare class Store {
    public constructor(page: Page)
    hasStock(itemNumber: string): PromiseLike<boolean>
    getCartLink(itemNumber: string): string
    getProductTitle(itemNumber: string): PromiseLike<string | null> 
}

export interface Item {
    number: string
    title: string
}

export interface BoughtResponse {
    inStock: boolean
    cartLink: string
}