import { Readable, ReadableOptions } from "stream";
import { Store } from "../interface";
import getProductDataFromStore from "./getProductDataFromStore";
import logging from "../utils/logging";

const logger = logging("trace", "Newegg StoreStream");


export default class StoreStream extends Readable {

    constructor(private store: Store, opts?: ReadableOptions) {
        super(opts)
    }

    async _read() {
        try {
            if (!this.store.hasStock()) {
                const data = await getProductDataFromStore(this.store)
                this.push(JSON.stringify(data) + "\n\n")
            } else {
                this.push(null)
            }
        } catch (error) {
            logger.warn(error)
        }
    }

    async close() {
        this.emit("end")
        await this.store.close()
        this.destroy()
    }

}