import bodyParser from "body-parser"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import Config from "./common/Config"
import { logger } from "./common/Logger"

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const app = express()
app.disable("x-powered-by")

if (Config.CORSUrl.length > 0) {
  const corsOptions = {
    origin: [Config.CORSUrl],
    optionsSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function urlLog(req: Request, res: Response, next: NextFunction) {
  logger.trace(`API Req: ${req.originalUrl}, API Host: ${JSON.stringify(req.hostname)}`)
  next()
})

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK")
})

app.use(function errLog(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Error: [${err}] for request [${req.originalUrl} ${JSON.stringify(req.body)}]`)
  res.status(500).send("Internal Server Error")
})

app.listen(Config.port, () => {
  logger.info(`Express server backend started: http://localhost:${Config.port} (${Config.currentEnv})`)
})
