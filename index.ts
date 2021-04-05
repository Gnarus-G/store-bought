import { BoughtResponse, Store } from "./interface";
import launchPage from "./utils/launchPage";
import { StockStatus } from "./utils";
import logging from "./utils/logging";

const logger = logging("trace", "BotBought");

function logItemStatus(itemName: string, isInStock: boolean) {
    let str = itemName + ": "
    str += isInStock ? StockStatus.STOCK_FOUND : StockStatus.NO_STOCK
    isInStock && logger.trace(str)
    !isInStock && logger.error(str);
}

export default async function (storeName: string, itemNumber: string): Promise<BoughtResponse> {
    const module = await import("./store/" + storeName);

    logger.info("Lanching...")
    const page = await launchPage()
    const store: Store = new module.default(page)

    logger.info("Checking stock...")
    const inStock = await store.hasStock(itemNumber)
    logItemStatus((await store.getProductTitle(itemNumber))?.substring(0, 30) ?? itemNumber, inStock)

    await page.close()

    return {
        inStock,
        cartLink: store.getCartLink(itemNumber)
    }
}