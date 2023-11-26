import { Profile } from "@/types/profile";
import {createContext} from "react"

export const AuthContext = createContext<{profile: Profile | {}, setProfile: React.Dispatch<React.SetStateAction<Profile>> | null}>({
    profile: {},
    setProfile: null
});