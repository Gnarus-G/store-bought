import { StoreResponseDto, Store } from "./interface";
import launchPage from "./utils/launchPage";
import logging from "./utils/logging";

const logger = logging("trace", "BotBought");

export function s(storeName: string, itemNumber: string): Promise<StoreResponseDto | null>;
export function s(storeName: string, itemNumber: string, register: (store: Store) => void): Promise<StoreResponseDto | null>;

export default async function s(storeName: string, itemNumber: string, register?: (store: Store) => void): Promise<StoreResponseDto | null> {
    const module = await import("./store/" + storeName);

    logger.info("Lanching... " + storeName)
    const page = await launchPage()
    const store: Store = new module.default(page, itemNumber)

    register && register(store)

    logger.info("Scraping... " + itemNumber)
    return null;
}