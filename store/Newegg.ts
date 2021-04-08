import { Page } from "puppeteer";
import { Store } from "../interface"
import logging from "../utils/logging";

const logger = logging("trace", "Newegg Store");

export default class Newegg implements Store {

    private productTitle = "";
    private done = false;

    public constructor(private page: Page, public readonly itemNumber: string) { }

    private async findProductTitle() {
        logger.debug("Reading Product title...")
        const productTitleHeading = await this.page.$("h1.product-title")
        this.productTitle = await productTitleHeading?.evaluate(node => node.textContent)
    }

    async findStock() {
        logger.debug("Navigating to the product page...")
        await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle2" })

        logger.debug("Looking at stock flag...")
        const [outOfStockFlag] = await this.page.$x("//strong[contains(.,'OUT OF STOCK')]")
        this.done = !outOfStockFlag

        if (!this.productTitle)
            await this.findProductTitle()
    }

    getProductTitle() {
        return this.productTitle
    }

    getCartLink() {
        return `https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${this.itemNumber}`
    }

    hasStock() {
        return this.done;
    }

    async close() {
        logger.debug(`Now attempting to close the page for item#: ${this.itemNumber}`)
        await this.page.close()
        logger.info(`Closed the page for item#: ${this.itemNumber}`)
    }

}