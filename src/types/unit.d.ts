import { BasicModel } from "./basic-model"

export type Unit = BasicModel & {
    name: string,
    description: string,
    resource_id: number
}