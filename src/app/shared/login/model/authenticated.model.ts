export enum Role { PATIENT, DOCTOR, MANAGER, SECRETARY }
export interface Authenticated {
    username: string,
    role: Role,
    name: string,
    surname: string
}