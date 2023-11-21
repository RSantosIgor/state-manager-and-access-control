import { BasicModel } from "./basic-model";

export type Profile = BasicModel & {
    firstName: string,
    lastName?: string,
    email: string,
    photoUrl?: string,
}