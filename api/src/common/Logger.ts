import log4js from "log4js"
import Config from "./Config"

export let logger = log4js.getLogger()
logger.level = Config.isDev ? "trace" : "debug"
