import { Readable, ReadableOptions } from "stream";
import { Store } from "../interface";
import getProductDataFromStore from "./getProductDataFromStore";
import logging from "../utils/logging";

const logger = logging("trace", "Newegg StoreStream");


export default class StoreStream extends Readable {

    constructor(private store: Store, opts?: ReadableOptions) {
        super(opts)
        this.on("end", this.close)
    }

    async _read() {
        try {
            if (!this.store.hasStock()) {
                const data = await getProductDataFromStore(this.store)
                this.push(JSON.stringify(data) + "\n\n")
            } else {
                this.emit("end")
            }
        } catch (error) {
            logger.warn(error)
        }
    }

    async close() {
        this.pause()
        this.store.close()
        this.destroy()
    }

}