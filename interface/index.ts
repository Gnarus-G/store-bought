import { Page } from "puppeteer"

export interface StoreParams {
    name: StoreName,
    itemNumber: string,
    xpaths: Record<"inStock" | "outOfStock" | "title", string>
    links: Record<"product" | "cart", string>
}

export type Status = "undetermined" | "instock" | "nostock"

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
    status: Status
    cartLink: string
}

export type StoreName = "newegg" | "amazon"