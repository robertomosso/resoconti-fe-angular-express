import { UserModel } from "./user";

export interface LoginResponse {
  message: string,
  user: Partial<UserModel>,
  token: string,
}
