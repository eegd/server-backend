import log4js from "log4js"
import Config from "./Config"

log4js.configure({
  appenders: {
    std: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "[%p] [%d{yyyy-MM-dd hh:mm:ss}] [%f:%l] %m",
      },
    },
  },
  categories: { default: { appenders: ["std"], level: Config.isDev ? "trace" : "debug", enableCallStack: true } },
})

export let logger = log4js.getLogger()
