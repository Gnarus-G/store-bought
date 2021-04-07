import { Store, StoreResponseDto } from "../interface";

export default async function getProductDataFromStore(store: Store) {
    await store.findStock()
    const data: StoreResponseDto = {
        cartLink: store.getCartLink(),
        inStock: store.hasStock(),
        itemNumber: store.itemNumber,
        productTitle: store.getProductTitle() || "unkown"
    }
    return data;
}