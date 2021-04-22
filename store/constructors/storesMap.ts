import { Page } from "puppeteer";
import { Store, StoreName } from "../../interface";
import bestbuy from "./bestbuy";
import newegg from "./newegg";

const storesMap: Record<StoreName, (page: Page, itemNumber: string) => Store> = {
    newegg: newegg,
    bestbuy: bestbuy,
}

export default storesMap;