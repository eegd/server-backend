import express from "express"
import { logger } from "./common/Logger"
import * as dbAgent from "./db/agent"

const userRouter = express.Router()

userRouter.post("/create", async function (req, res) {
  let resObj: any = {
    success: false,
  }

  try {
    await dbAgent.getUser(req.body.id)

    logger.info("user already exist")
    resObj.success = true
  } catch (err) {
    try {
      logger.info("user not exist, create a new user")
      await dbAgent.createUser(req.body.id, req.body.email)

      resObj.success = true
    } catch (err) {
      logger.error(`create user error: ${err}`)
      resObj.error = err
    }
  }

  res.send(resObj)
})

userRouter.post("/info", async function (req, res) {
  let resObj: any = {
    success: false,
  }

  try {
    const user = await dbAgent.getUser(req.body.id)
    resObj.info = user
    resObj.success = true
  } catch (err) {
    logger.error(`get user info error ${err}`)
    resObj.error = err
  }
  res.send(resObj)
})

export default userRouter
