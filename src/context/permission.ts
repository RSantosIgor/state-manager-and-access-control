import { PermissionExtended } from './../types/permission.d';
import {createContext} from "react"

export const PermissionContext = createContext<{myPermissions: PermissionExtended[] | [], setMyPermissions: React.Dispatch<React.SetStateAction<PermissionExtended[]>> | null}>({
    myPermissions: [],
    setMyPermissions: null
});