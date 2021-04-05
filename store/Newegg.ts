import { Page } from "puppeteer";
import { Store } from "../interface"

export default class Newegg implements Store {

    public constructor(private page: Page) { }

    async getProductTitle(itemNumber: string) {
        if (!this.page.url().includes(itemNumber))
            await this.page.goto(`https://newegg.com/p/${itemNumber}`, { waitUntil: "networkidle0" })
        const productTitleHeading = await this.page.$("h1.product-title")
        return productTitleHeading?.evaluate(node => node.textContent)
    }

    async hasStock(itemNumber: string) {
        await this.page.goto(`https://newegg.com/p/${itemNumber}`, { waitUntil: "networkidle0" })
        const [outOfStockFlag] = await this.page.$x("//span[contains(.,'OUT OF STOCK')]")
        return !outOfStockFlag
    }

    getCartLink(itemNumber: string) {
        return `https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${itemNumber}`
    }

}