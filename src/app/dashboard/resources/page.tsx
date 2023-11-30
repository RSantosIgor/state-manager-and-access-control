'use client'
/* eslint-disable react/no-children-prop */
import { Metadata } from "next";
import ButtonDropdown from "./components/buttonDropdown";
import { Peoples } from "./components/peoples";
import { useEffect, useState } from "react";
import BasicModal from "@/app/components/modal";
import { NewResource } from "./components/newResource";
import resource, { getResourcesTree } from "@/models/resource";
import company from "@/models/company";
import unit from "@/models/unit";
import departament from "@/models/departament";

import { Resource, ResourceExtended } from "@/types/resource";
import { ResourceList } from "./components/resourceList";

export const metadata: Metadata = {
  title: "Resources"
}

export default function Resources() {

  const [modalOpen, setModalOpen] = useState(false);
  const [resourceType, setResourceType] = useState('company');
  const [resourcesData, setResourcesData] = useState<ResourceExtended[]>([])
  const [resourcesRaw, setResourcesRaw] = useState<Resource[]>([]);

  const handleButton = (resourceType: string) => {
      setResourceType(resourceType);
      setModalOpen(!modalOpen);
  }

  useEffect(() => {
    getResource();
  }, []);

  const getResource = async () => {
    const {data, error} = await resource.getAll();
    const companies = await getCompanies();
    const units = await getUnits();
    const departaments = await getDepartaments();
    const resources = data?.map(d => resource.factory(d));
    const resourceTree = await getResourcesTree(data || [], [...companies, ...units, ...departaments]);
    
    setResourcesData(resources || []);
    setResourcesData(resourceTree);
    console.log(resourceTree);
  }

  const getCompanies = async () => {
    const {data, error} = await company.getAll();
    if(data) {
      return data.map(d => company.factory(d));
    } else if (error) {
      console.log(error);
    }
    return [];
  }

  const getUnits = async () => {
    const {data, error} = await unit.getAll();
    if(data) {
      return data.map(d => unit.factory(d));;
    } else if (error) {
      console.log(error);
    }
    return [];
  }

  const getDepartaments = async () => {
    const {data, error} = await departament.getAll();
    if(data) {
      return data.map(d => departament.factory(d));;
    } else if (error) {
      console.log(error);
    }
    return [];
  }

  return (
  <div className="w-100p h-full mt-3 flex flex-col gap-5">
    <BasicModal 
      open={modalOpen} 
      setOpen={setModalOpen} 
      children={<NewResource resourcesData={resourcesData} resourceArrayDataRaw={resourcesRaw} resourceType={resourceType} setOpen={setModalOpen}/>} 
    />
    <div className="flex w-full justify-end">
        <ButtonDropdown handleButton={handleButton}/>
    </div>
    {/* COMPANY */}
      <ResourceList resourcesData={resourcesData}/>
    {/* UNIT */}
    <div className="pl-[3%]">
      <div className=" w-full sm:overflow-auto !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
        <header className="relative flex items-center px-6 border border-t-0 border-b-0 border-r-0 border-l-5 border-l-indigo-500 rounded-t-[20px] justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            <p>
              UNIDADE 1 
            </p>
          </div>
          <div className="text-sm font-bold text-indigo-600">
              Ver mais
          </div>
        </header>
        <div>
          <p className="text-sm font-semibold text-gray-600 font-semibold p-3">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a
            document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
          </p>
        </div>
        <div className="mt-3 border-t border-gray-600 p-0.5 flex items-center justify-between">
          <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
            Departamentos: 0
          </p>
          <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
            Pessoas: 0
          </p>
        </div>
        <div className="mt-1 p-0.5 flex items-center justify-end"> 
          <Peoples/>
        </div>
      </div>
    </div>
    {/* DEPARTAMENT */}
    <div className="pl-[6%]">
      <div className=" w-full sm:overflow-auto !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
      <header className="relative flex items-center px-6 border border-t-0 border-b-0 border-r-0 border-l-5 border-l-indigo-500 rounded-t-[20px] justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            <p>
              DEPARTAMENTO
            </p>
          </div>
          <div className="text-sm font-bold text-indigo-600">
              Ver mais
          </div>
        </header>
        <div>
          <p className="text-sm font-semibold text-gray-600 font-semibold p-3">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a
            document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
          </p>
        </div>
        <div className="mt-3 border-t border-gray-600 p-0.5 flex items-center justify-end">
          <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
            Pessoas: 0
          </p>
        </div>
        <div className="mt-1 p-0.5 flex items-center justify-end"> 
          <Peoples/>
        </div>
      </div>
    </div>
  </div>
  );
}