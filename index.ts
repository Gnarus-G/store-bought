import { Browser } from "puppeteer";
import { StoreResponseDto, Store } from "./interface";
import launchBrowser from "./utils/launchBrowser";
import logging from "./utils/logging";

const logger = logging("trace", "BotBought");

let browser: Browser | null = null;

export default async function s(storeName: string, itemNumber: string, register?: (store: Store) => void): Promise<StoreResponseDto | null> {
    const module = await import("./store/" + storeName);

    browser = browser ? browser : await launchBrowser();

    logger.info("Lanching... " + storeName)
    const page = await browser.newPage()
    const store: Store = new module.default(page, itemNumber)

    logger.info("Scraping... " + itemNumber)
    if (register)
        register(store)
    else
        return store.scrape();
    return null;
}

export const closeBrowser = async () => {
    await browser?.close()
}