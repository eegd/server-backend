import { User, UserInfo } from "../user"
import { logger } from "../../common/Logger"
import mysql from "../util/mysql"

class UserImpl implements User {
  id: string
  email: string

  constructor(id: string, email: string) {
    this.id = id
    this.email = email
  }

  async getInfo(): Promise<UserInfo> {
    return {
      id: this.id,
      email: this.email,
    }
  }
}

export async function createUser(id: string, email: string): Promise<User> {
  try {
    let query_str = `
        insert into user (user_id, user_email)
        values(?, ?)
    `
    await mysql.query(query_str, [id, email])

    return new UserImpl(id, email)
  } catch (err) {
    logger.error(`user [id: ${id} email: ${email}] createUser error: ${err}`)
    throw `user [${id}] cannot be created`
  }
}

export async function getUser(id: string): Promise<User> {
  try {
    let query_str = `
        select user_email from user
        where user_id = ?
    `
    let rows = await mysql.query(query_str, [id])
    let row = rows[0]

    return new UserImpl(id, row.user_email)
  } catch (err) {
    logger.error(`user [${id}] getUser error: ${err}`)
    throw `user [${id} not found]`
  }
}

export default { createUser, getUser }
