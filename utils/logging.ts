import { getLogger } from "log4js"

export default (logLevel: "trace" | "info" | "debug", category?: string) => {
    const logger = getLogger(category)
    logger.level = logLevel
    return logger;
}
