'use client'
/* eslint-disable react/no-children-prop */
import { Metadata } from "next";
import ButtonDropdown from "./components/buttonDropdown";
import { Peoples } from "./components/peoples";
import { useContext, useEffect, useState } from "react";
import BasicModal from "@/app/components/modal";
import { CreateEditResource } from "./components/createEditResource";
import resource, { getResourcesTree } from "@/models/resource";
import company from "@/models/company";
import unit from "@/models/unit";
import departament from "@/models/departament";

import { Resource, ResourceExtended } from "@/types/resource";
import { ResourceList } from "./components/resourceList";
import { ResourceContext } from "@/context/resourcesTree";

export const metadata: Metadata = {
  title: "Resources"
}

export default function Resources() {

  const [modalOpen, setModalOpen] = useState(false);
  const [resourceType, setResourceType] = useState('company');
  const [resourcesData, setResourcesData] = useState<ResourceExtended[]>([])
  const resourcesContext = useContext(ResourceContext);

  const handleButton = (resourceType: string) => {
      setResourceType(resourceType);
      setModalOpen(!modalOpen);
  }

  useEffect(() => {
    setResourcesData(resourcesContext.resourcesResourceExtended);
  }, [resourcesContext.resourcesResourceExtended]);

  return (
  <div className="w-100p h-full mt-3 flex flex-col gap-5">
    <BasicModal 
      open={modalOpen} 
      setOpen={setModalOpen} 
      children={<CreateEditResource resourcesData={resourcesData} currentResource={null} resourceType={resourceType} setOpen={setModalOpen}/>} 
    />
    <div className="flex w-full justify-end">
        <ButtonDropdown handleButton={handleButton}/>
    </div>
      <ResourceList resourcesData={resourcesData}/>
  </div>
  );
}