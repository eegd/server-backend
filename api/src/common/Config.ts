export default class Config {
  static readonly isDev = process.env.NODE_ENV === "dev"
  static readonly currentEnv = process.env.NODE_ENV ?? "dev"
  static readonly port = process.env.ENDPOINT_PORT ? parseInt(process.env.ENDPOINT_PORT) : 3000
}
