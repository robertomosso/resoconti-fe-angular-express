import { UserModel } from "./user.interface";

export interface LoginResponse {
  message: string,
  user: Partial<UserModel>,
  token: string,
}
