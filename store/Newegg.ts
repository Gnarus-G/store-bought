import { Page } from "puppeteer";
import { Store } from "../interface"

export default class Newegg implements Store {

    public constructor(private page: Page, private itemNumber: string) { }

    async getProductTitle() {
        if (this.isProductPage())
            await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle0" })
        const productTitleHeading = await this.page.$("h1.product-title")
        return productTitleHeading?.evaluate(node => node.textContent)
    }

    async hasStock() {
        while (!this.page.url().includes(this.itemNumber))
            await this.page.goto(`https://newegg.com/p/${this.itemNumber}`, { waitUntil: "networkidle0" })
        const [outOfStockFlag] = await this.page.$x("//span[contains(.,'OUT OF STOCK')]")
        return !outOfStockFlag
    }

    getCartLink() {
        return `https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${this.itemNumber}`
    }

    private isProductPage() {
        return this.page.url().includes(this.itemNumber);
    }

}