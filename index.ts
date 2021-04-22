import { StoreConstructor, StoreName } from "./interface";
import StoreStream from "./store/StoreStream";
import launchBrowser from "./utils/launchBrowser";
import logging from "./utils/logging";

const logger = logging("trace", "StoreBought");

// const storeMap: Record<StoreName, (page: Page, itemNumber: string) => Store> = {
//     newegg,
//     bestbuy
// }

const setup = async (launch: typeof launchBrowser) => {

    const browser = await launch();

    return async (storeName: StoreName, itemNumber: string, register?: (stream: StoreStream) => void) => {

        logger.info("Lanching... " + storeName)
        const page = await browser.newPage()
        // const store = storeMap[storeName](page, itemNumber);
        const getStore: StoreConstructor = require(`./store/constructors/${storeName}`).default
        const store = getStore(page, itemNumber);

        logger.info("Scraping... " + itemNumber)
        if (register)
            register(new StoreStream(store))
        else {
            await store.findStock()
            return store.toDto();
        }
        return null;
    }
}

/**
 * Open a page in a browser to parse information about
 * an item in the given store.
 * @param storeName for any supported store
 * @param itemNumber for the given store
 * @param register to consume a stream of the product data
 * @returns product data or null if a stream was consumed
 */
const getStoreBought = () => setup(launchBrowser);
export default getStoreBought;