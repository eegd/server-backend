import express, { NextFunction, Request, Response } from "express"
import bodyParser from "body-parser"
import Config from "./common/Config"

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const app = express()

app.use(bodyParser.json())

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.log("Error: " + err)
})

app.listen(Config.port, () => {
  console.log(`Express server backend started: http://localhost:${Config.port} (${Config.currentEnv})`)
})
