import { Browser } from "puppeteer";
import { StoreResponseDto, Store } from "./interface";
import getProductDataFromStore from "./store/getProductDataFromStore";
import StoreStream from "./store/StoreStream";
import launchBrowser from "./utils/launchBrowser";
import logging from "./utils/logging";

const logger = logging("trace", "BotBought");

let browser: Browser | undefined;

/**
 * Open a page in a browser to parse information about
 * an item in the given store.
 * @param storeName for any supported store
 * @param itemNumber for the given store
 * @param register to consume a stream of the product data
 * @returns product data or null if a stream was consumed
 */
export default async function storeBought(storeName: string, itemNumber: string, register?: (stream: StoreStream) => void): Promise<StoreResponseDto | null> {
    const module = await import("./store/" + storeName);

    browser = browser ? browser : await launchBrowser();

    logger.info("Lanching... " + storeName)
    const page = await browser.newPage()
    const store: Store = new module.default(page, itemNumber)

    logger.info("Scraping... " + itemNumber)
    if (register)
        register(new StoreStream(store))
    else
        return await getProductDataFromStore(store)
    return null;
}

export const closeBrowser = async () => {
    await browser?.close()
}