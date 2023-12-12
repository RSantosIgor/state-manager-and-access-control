import { ResourceExtended } from "@/types/resource";
import { useForm } from "react-hook-form";
import { PermissionExtended, Role } from "@/types/permission";
import { Roles } from "@/enum/roles";
import { ChangeEvent, useEffect, useState } from "react";
import { indentationText } from "@/util";

interface PermissionForm {
    resource_id?: number,
    email: string,
    role: string | Role
}

const resourceTypes  = ['Empresa', 'Unidade', 'Departamento'];

export default function Permissions ({resources, currentResource = null, permission = null, submit, setOpen} : {resources: ResourceExtended[], currentResource: ResourceExtended | null, permission: PermissionExtended | null, submit: any, setOpen: any}) {
    const { register, setValue, formState: { errors }, handleSubmit } = useForm<PermissionForm>();
    const [resource, setResource] = useState<ResourceExtended | null>(currentResource);
    const [level, setLevel] = useState<number>()


    useEffect(() => {
        if (permission) {
            setValue('email', permission.user?.email || '');
            setValue('role', permission.role);
        }
    
        if(currentResource) {
            setValue('resource_id', Number(currentResource.id));
        }
    }, [])

    const nestedSelectOptionsPermissions = (resourcesTree: ResourceExtended[]) => {
        return resourcesTree.map((r: ResourceExtended) => {
            let childrenElement: any = <></>;

            if ((level) && r.level > level) {return}

            if(r && r.children && r.children.length > 0) {
                childrenElement = nestedSelectOptionsPermissions(r.children)
            }
            return (<>
                <option disabled={r.level !== level} value={r.id} key={r.id}>{indentationText(r.level) +  r.tableInfo?.name}</option>
                {
                    childrenElement
                }
            </>)
        });
    }

    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center leading-9 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
                    Atribuir  Permissão
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold leading-6 text-navy-700 dark:text-white dark:hover:text-white">
                            Tipo/Nível
                        </label>          
                        <select 
                            className=" block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            disabled={!!resource}
                            defaultValue={resource ? resource.level: -1}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                if(event.currentTarget.value){
                                    setLevel(Number(event.currentTarget.value));
                                }}}
                        >
                            <option disabled value={-1} hidden key={'-1'}>Selecione o nível do recurso</option>
                            {
                                resourceTypes.map((r, index)=> {
                                    return (<>
                                        <option value={index} key={index}>{r}</option>
                                    </>)
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="resource_id" className="block text-sm font-bold leading-6 text-navy-700 dark:text-white dark:hover:text-white">
                            Recurso
                        </label>          
                        <select 
                            {...register("resource_id", { required: "Você deve selecionar uma entidade acima", maxLength: 20 })} aria-invalid={errors.resource_id ? "true" : "false"}
                            name="resource_id"
                            id="resource_id" 
                            className=" block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            disabled={!!resource}
                        >
                            <option disabled value={-1} hidden key={'-1'}>Selecione recurso</option>
                            {nestedSelectOptionsPermissions(resources)}
                            
                        </select>
                    </div>
                    <label htmlFor="email" className="block text-sm font-bold leading-6 text-navy-700 dark:text-white dark:hover:text-white">
                        Email
                    </label>
                    <input
                        {...register("email", { required: "Email do usuário" })} aria-invalid={errors.email ? "true" : "false"} 
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        disabled={!!permission}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="flex items-center justify-between">
                        <label htmlFor="role" className="block font-bold leading-6 text-sm text-navy-700 dark:text-white dark:hover:text-white">
                            Cargo
                        </label>
                    </div>
                    <select 
                            className=" block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register("role", { required: "Selecione um cargo"})} aria-invalid={errors.role ? "true" : "false"}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                if(event.currentTarget.value){
                                    setLevel(Number(event.currentTarget.value));
                                }}}
                        >
                            <option disabled value={'-1'} hidden key={'-1'}>Selecione o cargo</option>
                            {
                                Object.keys(Roles).map((roleKey: any, index)=> {
                                    const value = Object.values(Roles)[index]
                                    return (<>
                                        <option value={roleKey} key={index}>{value}</option>
                                    </>)
                                })
                            }
                        </select>
                </form>
                <div className="flex flex-cols gap-5 mt-3">
                    <button 
                        onClick={() => setOpen(false)}
                        className="flex w-full justify-center rounded-md bg-transparent border border-2 border-inding-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-indigo-600 dark:text-white dark:hover:text-white leading-6 shadow-sm hover:ring-inding-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSubmit(submit)}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-white dark:text-white dark:hover:text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
