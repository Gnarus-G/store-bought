import { StoreConstructor } from "../../interface";
import StoreImpl from "../StoreImpl";

export const amazon: StoreConstructor = (page, itemNumber) =>
    new StoreImpl({
        itemNumber,
        name: "amazon",
        xpaths: {
            inStock: "//span[contains(.,'In Stock')]",
            outOfStock: "//span[contains(.,'Currently unavailable')]",
            title: "//span[@id='productTitle']"
        },
        links: {
            cart: `https://www.amazon.com/gp/aws/cart/add.html?ASIN.1=${itemNumber}&Quantity.1=1`,
            product: `https://www.amazon.com/dp/${itemNumber}`
        }
    }, page)

export default amazon