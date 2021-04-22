import { StoreConstructor } from "../../interface";
import StoreImpl from "../StoreImpl";

export const bestbuy: StoreConstructor = (page, itemNumber) =>
    new StoreImpl({
        itemNumber,
        name: "bestbuy",
        xpaths: {
            inStock: "//div[contains(.,'Add to Cart')]",
            outOfStock: "//button[contains(.,'Sold Out')]",
            title: "//div[@class='sku-title']"
        },
        links: {
            cart: `https://api.bestbuy.com/click/-/${itemNumber}/cart`,
            product: `https://api.bestbuy.com/click/-/${itemNumber}/pdp`
        }
    }, page)

export default bestbuy;