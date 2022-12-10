import { Role } from "./authenticated.model";

export interface LoggedIn {
    accessToken: string,
    role: Role
}