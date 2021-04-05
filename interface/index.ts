import { Page } from "puppeteer";

export declare class Store {
    public constructor(page: Page, itemNumber: string)
    hasStock(): PromiseLike<boolean>
    getCartLink(): string
    getProductTitle(): PromiseLike<string | null>
}

export interface Item {
    number: string
    title: string
}

export interface BoughtResponse {
    inStock: boolean
    cartLink: string
}