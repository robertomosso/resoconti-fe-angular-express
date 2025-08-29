import { Role } from "../enums/role.enum"

export interface UserModel {
    id: string,
    name: string
    email: string,
    password: string,
    mustChangePassword: boolean,
    fileId: string,
    role: Role
}
