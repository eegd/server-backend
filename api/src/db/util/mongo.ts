import mongoose from "mongoose"

const url = process.env.MONGO_URL || "mongodb://localhost:27017"
mongoose.connect(url, {
  user: process.env.MONGO_USERNAME || "root",
  pass: process.env.MONGO_PASSWORD || "pass",
  dbName: process.env.MONGO_DATABASE || "db",
})

export const connection = mongoose.connection
export const model = mongoose.model
export const Schema = mongoose.Schema
