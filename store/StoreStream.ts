import { Readable, ReadableOptions } from "stream";
import { Store } from "../interface";
import logging from "../utils/logging";

const logger = logging("trace", "Newegg StoreStream");

enum STORESTREAM_EVENTS {
    DATA = "data",
    STOCKFOUND = "stockfound",
    END = "end"
}

export default class StoreStream extends Readable {

    constructor(private store: Store, opts?: ReadableOptions) {
        super(opts)
    }

    async _read() {
        try {
            switch (this.store.toDto().status) {
                case "undetermined":
                case "nostock":
                    await this.store.findStock()
                    this.push(JSON.stringify(this.store.toDto()) + "\n\n")
                    break;
                case "instock":
                    this.emit(STORESTREAM_EVENTS.STOCKFOUND, this.store.toDto());
                    this.push(null);
                    break;
            }
        } catch (error) {
            logger.warn(error)
        }
    }

    async close() {
        this.emit(STORESTREAM_EVENTS.END)
        await this.store.close()
        this.destroy()
    }

}