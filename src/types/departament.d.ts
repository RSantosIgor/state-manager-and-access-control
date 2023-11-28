import { BasicModel } from "./basic-model"

export type Departament = BasicModel & {
    name: string,
    description: string,
    resource_id: number
}