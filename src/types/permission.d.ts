import { BasicModel } from "./basic-model"
import { Profile } from "./profile"

export type Permission = BasicModel & {
    user_id: string,
    resource_id: number,
    role: Role
}

export type PermissionExtended = Permission & {
    user?: Profile
}

export type Role = 'manager' | 'writer' | 'reader';