import { ResourceExtended } from "@/types/resource";

export const calculateHowManyChildrenFromChildren = (resource: ResourceExtended) => {
    if (resource.children) {
        return resource.children
        .map((children: ResourceExtended) => children.children?.length || 0)
        .reduce((previous: number, next: number) => previous + next, 0)
    }
    return 0;
}