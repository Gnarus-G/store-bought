import { Logger } from "log4js";
import { Page } from "puppeteer"
import { StockStatus, Store, StoreParams } from "../interface"
import logging from "../utils/logging";

export default class StoreImpl implements Store {

    private logger: Logger;
    private status: StockStatus = "undetermined";
    private productTitle = "";

    constructor(public readonly params: StoreParams, private page: Page) {
        this.logger = logging("trace", params.name);
    }

    async close(): Promise<void> {
        this.logger.debug(`Now attempting to close the page for item#: ${this.params.itemNumber}`)
        await this.page.close()
        this.logger.info(`Closed the page for item#: ${this.params.itemNumber}`)
    }

    async findProductTitle() {
        this.logger.debug("Reading Product title...")
        const [productTitleHeading] = await this.page.$x(this.params.xpaths.title)
        this.productTitle = await productTitleHeading?.evaluate(node => node.textContent)
    }

    async findStock() {
        this.logger.debug("Navigating to the product page...")
        await this.page.goto(this.params.links.product, { waitUntil: "networkidle2" })

        this.logger.debug("Looking at stock flag...")
        const [inStockFlag] = await this.page.$x(this.params.xpaths.inStock)

        if (inStockFlag)
            this.status = "instock";
        else {
            const [outOfStockFlag] = await this.page.$x(this.params.xpaths.outOfStock)
            outOfStockFlag && (this.status = "nostock");
        }

        if (!this.productTitle)
            await this.findProductTitle()
    }

    toDto() {
        return {
            cartLink: this.params.links.cart,
            status: this.status,
            itemNumber: this.params.itemNumber,
            productTitle: this.productTitle || 'no product title found'
        }
    }
}