export default class Config {
  static readonly isDev = process.env.NODE_ENV === "dev"
  static readonly currentEnv = process.env.NODE_ENV ?? "dev"
  static readonly port = process.env.ENDPOINT_PORT ? parseInt(process.env.ENDPOINT_PORT) : 3000

  static get CORSUrl(): string {
    return process.env.CORS_URL || ""
  }

  static get internalApiUrl() {
    return (process.env.CONTROLLER_URL ?? "localhost:3000") + "/internal"
  }

  static get internalDbUrl() {
    return Config.internalApiUrl + "/db"
  }
}
