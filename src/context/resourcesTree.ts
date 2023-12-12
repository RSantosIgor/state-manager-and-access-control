import { ResourceExtended } from "@/types/resource";
import {createContext} from "react"

export const ResourceContext = createContext<{resourcesResourceExtended: ResourceExtended[] | [], setResourceExtended: React.Dispatch<React.SetStateAction<ResourceExtended[]>> | null}>({
    resourcesResourceExtended: [],
    setResourceExtended: null
});