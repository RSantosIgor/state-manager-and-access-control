import { BasicModel } from "./basic-model"

export type Company = BasicModel & {
    name: string,
    description: string,
}