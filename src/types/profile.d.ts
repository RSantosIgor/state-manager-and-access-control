import { BasicModel } from "./basic-model";

export type Profile = BasicModel & {
    first_name?: string,
    last_name?: string,
    email?: string,
    photo_url?: string,
}