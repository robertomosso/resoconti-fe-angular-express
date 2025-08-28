import { UserModel } from "./user.interface";

export interface GetUsersResponse {
    users: Partial<UserModel[]>;
}