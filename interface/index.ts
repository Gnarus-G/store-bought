import { Page } from "puppeteer"

export interface StoreParams {
    name: StoreName,
    itemNumber: string,
    xpaths: Record<"inStock" | "outOfStock" | "title", string>
    links: Record<"product" | "cart", string>
}

export type StockStatus = "undetermined" | "instock" | "nostock"

export interface Store {
    readonly params: StoreParams;
    findStock(): Promise<void>
    toDto(): StoreResponseDto
    close(): Promise<void>
}

export type StoreConstructor = (page: Page, itemNumber: string) => Store

export interface Item {
    number: string
    title: string
}

export interface StoreResponseDto {
    productTitle: string
    itemNumber: string
    status: StockStatus
    cartLink: string
}

export const ALL_STORES = ["newegg", "amazon"] as const;

export type StoreName = (typeof ALL_STORES)[number]