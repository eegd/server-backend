import crypto from "crypto"
import { logger } from "../../common/Logger"
import { AccessToken, AccessTokenInfo } from "../dev"
import mysql from "../util/mysql"

class AccessTokenImpl implements AccessToken {
  tokenId: string
  userId: string
  expire: number
  ctime: number

  constructor(tokenId: string, userId: string, expire: number, ctime: number) {
    this.tokenId = tokenId
    this.userId = userId
    this.expire = expire
    this.ctime = ctime
  }

  async getInfo(): Promise<AccessTokenInfo> {
    return {
      token: this.tokenId,
      userId: this.userId,
      expire: this.expire,
      ctime: this.ctime,
    }
  }
}

export async function createAccessToken(userId: string, expire?: Date): Promise<AccessToken> {
  try {
    let token = crypto.randomBytes(64).toString("base64")
    let query_str = `
        insert into access_token (token_id, user_id, expire)
        values (?, ?, ?)
    `
    await mysql.query(query_str, [token, userId, expire])
    return await getAccessToken(token)
  } catch (err) {
    logger.error(`user [${userId}] createAccessToken error: ${err}`)
    throw `user [${userId}] createAccessToken error: ${err}`
  }
}

export async function getAccessToken(tokenId: string): Promise<AccessToken> {
  try {
    let query_str = `
        select token_id, user_id, UNIX_TIMESTAMP(TIMESTAMP(expire)) as expire, UNIX_TIMESTAMP(TIMESTAMP(ctime)) as ctime
        from access_token
        where token_id = ?
    `
    let rows = await mysql.query(query_str, [tokenId])
    if (rows.length > 0) {
      let row = rows[0]
      return new AccessTokenImpl(row.token_id, row.user_id, row.expire, row.ctime)
    } else {
      throw "getAccessToken not found"
    }
  } catch (err) {
    logger.error(`getAccessToken [${tokenId}] error: ${err}`)
    throw `getAccessToken [${tokenId}] error`
  }
}

export default { createAccessToken, getAccessToken }
