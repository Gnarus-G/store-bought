import { Readable, ReadableOptions } from "stream";
import { Page } from "puppeteer";
import { Store, StoreResponseDto } from "../interface"

export default class Newegg extends Readable implements Store {

    public constructor(private page: Page, private itemNumber: string, opts?: ReadableOptions) {
        super(opts)
        this.on("end", async () => {
            console.log(`Newegg page closing now...`)
            await this.page.close()
        })
    }

    _read() {
        setTimeout(async () => {
            if (this.page.isClosed()) return
            const data = await this.scrape();
            this.push(JSON.stringify(data) + "\n\n")
            data.inStock && this.emit("end")
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
        await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle0" })
        const productTitleHeading = await this.page.$("h1.product-title")
        return productTitleHeading?.evaluate(node => node.textContent)
    }

    async findStock() {
        await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle0" })
        const [outOfStockFlag] = await this.page.$x("//span[contains(.,'OUT OF STOCK')]")
        return !outOfStockFlag
    }

    getCartLink() {
        return `https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${this.itemNumber}`
    }

}