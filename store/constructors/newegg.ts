import { StoreConstructor } from "../../interface";
import StoreImpl from "../StoreImpl";

export const newegg: StoreConstructor = (page, itemNumber) =>
    new StoreImpl({
        itemNumber,
        name: "newegg",
        xpaths: {
            inStock: "//strong[contains(.,'In stock')]",
            outOfStock: "//strong[contains(.,'OUT OF STOCK')]",
            title: "//h1[@class='product-title']"
        },
        links: {
            cart: `https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${itemNumber}`,
            product: `https://newegg.com/p/${itemNumber}`
        }
    }, page)

export default newegg;