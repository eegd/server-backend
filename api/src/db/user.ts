export interface UserInfo {
  id: string
  email: string
}

export interface User {
  getInfo(): Promise<UserInfo>
}
