import { Readable, ReadableOptions } from "stream";
import { Page } from "puppeteer";
import { Store, StoreResponseDto } from "../interface"

export default class Newegg extends Readable implements Store {

    public constructor(private page: Page, private itemNumber: string, opts?: ReadableOptions) {
        super(opts ?? {
            objectMode: true,
        })
    }

    _read() {
        setTimeout(async () => {
            this.push(JSON.stringify(await this.scrape()) + "\n\n")
        }, 5000)
    }

    async scrape() {
        const data: StoreResponseDto = {
            cartLink: this.getCartLink(),
            inStock: await this.findStock(),
            itemNumber: this.itemNumber,
            productTitle: await this.getProductTitle()
        }
        return data;
    }

    async getProductTitle() {
        if (this.isProductPage())
            await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle0" })
        const productTitleHeading = await this.page.$("h1.product-title")
        return productTitleHeading?.evaluate(node => node.textContent)
    }

    async findStock() {
        while (!this.page.url().includes(this.itemNumber))
            await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle0" })
        const [outOfStockFlag] = await this.page.$x("//span[contains(.,'OUT OF STOCK')]")
        return !outOfStockFlag
    }

    getCartLink() {
        return `https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${this.itemNumber}`
    }

    async close() {
        await this.page.close()
        if (this.page.browser().pages.length < 1)
            await this.page.browser().close()
        this.emit("close")
    }

    private isProductPage() {
        return this.page.url().includes(this.itemNumber);
    }

}