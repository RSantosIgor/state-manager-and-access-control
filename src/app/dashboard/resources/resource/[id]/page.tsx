'use client'
import Details from "@/app/components/details";
import { ResourceContext } from "@/context/resourcesTree";
import { getResourceFromTree } from "@/models/resource";
import { useContext } from "react";

export default function ResourceDetail({ params }: { params: { id: number } }) {
    const id = Number(params.id);
    const resourceC = useContext(ResourceContext);
    const resourceData = getResourceFromTree(id, resourceC.resourcesResourceExtended);
    return (
        <div>
            { resourceData && <Details resource={resourceData}/> }
        </div>
    );
}