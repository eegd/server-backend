import express from "express"
import moment from "moment"
import { logger } from "./common/Logger"
import * as dbAgent from "./db/agent"

const userRouter = express.Router()

/**
 * @api {post} /api/db/user/create createUser
 * @apiParam {String} id
 * @apiParam {String} email
 */
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

/**
 * @api {post} /api/db/user/info getUserInfo
 * @apiParam {String} token
 */
userRouter.post("/info", async function (req, res) {
  let resObj: any = {
    success: false,
  }

  try {
    let userId = ""
    let token = await dbAgent.getAccessToken(req.body.token)
    let tokenInfo = await token.getInfo()
    
    if (tokenInfo.expire === null || tokenInfo.expire > moment().unix()) {
      userId = tokenInfo.userId
    }

    const user = await dbAgent.getUser(userId)
    resObj.info = await user.getInfo()
    resObj.success = true
  } catch (err) {
    logger.error(`get user info error ${err}`)
    resObj.error = err
  }
  res.send(resObj)
})

/**
 * @api {put} /api/db/user/token/create createApiAccessToken
 * @apiParam {String} id
 * @apiParam {String} expire
 */
userRouter.put("/token/create", async function (req, res) {
  let resObj: any = {
    success: false,
  }

  try {
    await dbAgent.getUser(req.body.id)
    const expire = req.body.expire ? new Date(req.body.expire) : undefined

    let token = await dbAgent.createAccessToken(req.body.id, expire)
    let tokenInfo = await token.getInfo()

    resObj.token = tokenInfo.token
    resObj.success = true
  } catch (err) {
    logger.error(`add access token error: ${err}`)
    resObj.error = err
  }

  res.send(resObj)
})

export default userRouter
