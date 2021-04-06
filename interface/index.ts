import { Readable } from "stream";
import { Page } from "puppeteer";

export declare class Store extends Readable {
    public constructor(page: Page, itemNumber: string)
    scrape(): Promise<StoreResponseDto>
    findStock(): PromiseLike<boolean>
    getCartLink(): string
    getProductTitle(): PromiseLike<string | null>
}

export interface Item {
    number: string
    title: string
}

export interface StoreResponseDto {
    productTitle: string
    itemNumber: string
    inStock: boolean
    cartLink: string
}