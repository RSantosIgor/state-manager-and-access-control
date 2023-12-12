'use client';
import { Roles } from "@/enum/roles";
import { PermissionExtended } from "@/types/permission";
import { ResourceExtended } from "@/types/resource";
import Image from "next/image";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import BasicModal from "../modal";
import { useContext, useEffect, useState } from "react";
import { ResourceContext } from "@/context/resourcesTree";
import Permissions from "../permissions";
import permissionModel from "@/models/permission";
import userModel from "@/models/profile";
import supabaseBrowser from "@/lib/supabase/supabase-browser";

export default function Details ({resource}: {resource: ResourceExtended}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [resourcesData, setResourcesData] = useState<ResourceExtended[]>([]);
  const [p, setP] = useState<PermissionExtended | null>(null);
  const resourcesContext = useContext(ResourceContext);

  const modalOpenButton = (permissionArg: PermissionExtended | null) => {
      setP(permissionArg)
      setModalOpen(!modalOpen);
  }

  const submitCreateOrEdit = async (permission: any) => {
    setModalOpen(false);
    if(p) {
      updatePermission(permission);
    } else {
      createPermission(permission);
    }
  }

  const updatePermission = async (permission: any) => {
    console.log('updatePermission', permission);
    await permissionModel.update(permission.id, {role: permission.role}, supabaseBrowser);
  }

  const createPermission = async (permission: any) => {
    console.log('createPermission', permission);
    const {data}: {data: any} = await userModel.getByEmail(permission.email, supabaseBrowser);
    console.log('user', data);
    if(data) {
      const user_id = data[0].id;
      const permissionObj = permissionModel.factory({...permission, user_id});
      await permissionModel.create(permissionObj);
    }
  }

  const removePermission =  async (permission: any) => {
    console.log('removePermission', permission);
    await permissionModel.remove(permission.id, supabaseBrowser);
  }

  useEffect(() => {
    setResourcesData(resourcesContext.resourcesResourceExtended);
  }, [resourcesContext.resourcesResourceExtended]);


  return (
    <div className="w-full">
      <BasicModal
        open={modalOpen} 
        setOpen={setModalOpen} 
        // eslint-disable-next-line react/no-children-prop
        children={<Permissions resources={resourcesData} currentResource={resource} permission={p} submit={submitCreateOrEdit} setOpen={setModalOpen}/>} 
      />
      <div className="flex w-full justify-end">
        <button 
          className="flex justify-end rounded-md bg-indigo-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-white hover:underline dark:text-white dark:hover:text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Nova Permissão
        </button>
      </div>
      {/*First Line*/}
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {/*Card 1*/}
        <div className="w-full h-full sm:overflow-auto px-6 !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none">
          <header className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              {resource.tableInfo?.name}
            </div>
            <button 
              className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                Editar
            </button>
          </header>
          <div className="w-full py-4 text-navy-700 text-small text-justify border-b border-gray-200">
            {resource.tableInfo?.description}
          </div>
        </div>

        {/*Card 2*/}
        <div className="w-full h-full sm:overflow-auto px-6 !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none">
          <header className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              Pessoas
            </div>
            <button 
              onClick={()=> modalOpenButton(null)}
              className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                Adicionar
            </button>
          </header>
          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table className="w-full">
              <thead>
                <tr className="!border-px !border-gray-400 border-b border-gray-200 flex justify-between">
                  <th className="cursor-pointer pb-2 pr-4 pt-4 text-start dark:border-white/30">
                    <div className="items-center justify-between text-xs text-gray-200">
                        Nome 
                    </div>
                  </th>
                  <th className="cursor-pointer pb-2 pr-4 pt-4 text-start dark:border-white/30">
                    <div className="items-center justify-between text-xs text-gray-200">
                      Cargo 
                    </div>
                  </th>
                  <th className="cursor-pointer pb-2 pr-4 pt-4 text-start dark:border-white/30">
                    <div className="items-center justify-between text-xs text-gray-200">
                      Ação 
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  resource && resource?.permissions && resource?.permissions?.length > 0 &&
                  resource.permissions.map((permission: PermissionExtended) => {
                    return (
                      <tr key={permission.id} className="flex justify-between">
                        <td className="border-white/0 py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <Image
                                width="2"
                                height="20"
                                src={`https://picsum.photos/seed/${permission.user?.first_name}/200/300`}
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              {permission.user?.first_name}
                            </p>
                          </div>
                        </td>
                        <td className="border-white/0 py-3 pr-4">
                          <p className="text-md font-medium text-gray-600 dark:text-white">
                            {Roles[permission.role]}
                          </p>
                        </td>
                        <td className="flex justify-between divide-x mt-2">
                          <button 
                            onClick={() => modalOpenButton(permission)}
                            className="text-lg pr-2 font-medium text-gray-600 dark:text-white">
                            <FaRegPenToSquare />
                          </button>
                          <button 
                            onClick={() => removePermission(permission)}
                            className="text-lg pl-2 font-medium text-gray-600 dark:text-white">
                            <FaRegTrashCan />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*Second Line*/}
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
      </div>
    </div>
  );
};