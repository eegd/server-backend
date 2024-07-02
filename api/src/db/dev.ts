export interface AccessTokenInfo {
  token: string
  userId: string
  expire: number
  ctime: number
}

export interface AccessToken {
  getInfo(): Promise<AccessTokenInfo>
}
