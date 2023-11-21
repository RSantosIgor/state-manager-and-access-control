import { BasicModel } from "./basic-model"

export type Permission = BasicModel & {
    userId: string,
    resourceId: number,
    role: Role
}

export type Role = 'manager' | 'writer' | 'reader';