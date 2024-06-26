import mysql from "mysql"

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "db",
  charset: "utf8mb4",
})

let query = function (sql: string, values?: Array<any>): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

export default { query }
