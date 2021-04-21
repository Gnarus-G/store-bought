import { Page } from "puppeteer";

export declare class Store {
    public readonly itemNumber: string;
    public constructor(page: Page, itemNumber: string)
    findStock(): Promise<void>
    getCartLink(): string
    getProductTitle(): string
    hasStock(): boolean
    close(): Promise<void>
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

export type StoreName = "newegg"