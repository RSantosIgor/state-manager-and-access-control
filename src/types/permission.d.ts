import { BasicModel } from "./basic-model"

export type Permission = BasicModel & {
    user_id: string,
    resource_id: number,
    role: Role
}

export type Role = 'manager' | 'writer' | 'reader';