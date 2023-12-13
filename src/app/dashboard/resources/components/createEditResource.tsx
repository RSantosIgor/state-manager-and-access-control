import { useForm } from "react-hook-form";
import companyModel from "@/models/company";
import unitModel from "@/models/unit";
import departamentModel from "@/models/departament";
import { Resource, ResourceExtended } from "@/types/resource";
import { NestedSelectOption } from "./nestedSelectOptions";
import resourceModel from "@/models/resource";
import { useEffect } from "react";

const resourceLabel: any = {
    company: 'Empresa',
    unit: 'Unidade',
    departament: 'Departamento'
}

interface ResourceForm {
    fatherResourceId?: number,
    name: string,
    description: string
}

export function CreateEditResource({resourcesData, currentResource = null, resourceType, setOpen}: {resourcesData: ResourceExtended[], currentResource: ResourceExtended | null, resourceType: string, setOpen: any}) {
    const labelTitle = resourceLabel[resourceType];
    const { register, setValue, formState: { errors }, handleSubmit } = useForm<ResourceForm>();

    useEffect(() => {
        if (currentResource && currentResource.tableInfo) {
            if (currentResource.level > 0) {
                const father = currentResource.hierarchy.reverse()[0]
                setValue('fatherResourceId', father.resource_id);
            }
            setValue('name', currentResource.tableInfo?.name);
            setValue('description', currentResource.tableInfo?.description);
        }
    }, []);

    const saveResource = async (resource: ResourceForm) => {

        if (resourceType === 'company') {
            const {error} = await newCompany(resource);
            if(error) {
                console.log('Create new Resource error: ', error);
            }
            setOpen(false);
        }
        if (resourceType === 'unit') {
            const {error} = await newUnit(resource);
            if(error) {
                console.log('Create new Resource error: ', error);
            }
            setOpen(false);
        }
        if (resourceType === 'departament') {
            const {error} = await newDepartament(resource);
            if(error) {
                console.log('Create new Resource error: ', error);
            }
            setOpen(false);
        }
    }

    const newCompany = (data: any) => {
        if(!currentResource) {
            const companyData = companyModel.factory(data);
            console.log('New Company: ', companyData);
            return companyModel.create(companyData); 
        } else {
            return companyModel.update(Number(currentResource.resource_table_id), {name: data.name, description: data.description})
        }
    }

    const newUnit = (data: any) => {
        if(!currentResource) {
            const fatherResource: ResourceExtended = resourcesData.filter(r => Number(r.id) === Number(data.fatherResourceId))[0];
            const unitData = unitModel.factory(data);
            return unitModel.create(unitData, fatherResource); 
        } else {
           return unitModel.update(Number(currentResource.resource_table_id), {name: data.name, description: data.description});
        }
    }

    const newDepartament = (data: any) => {
        if (!currentResource) {
            const fatherResource: any = resourcesData.flatMap(r => r.children).filter(r => Number(r?.id) === Number(data.fatherResourceId))[0];
            const departamentData = departamentModel.factory(data);
            return departamentModel.create(departamentData, fatherResource);
        } else {
            return departamentModel.update(Number(currentResource.resource_table_id), {name: data.name, description: data.description});
        }
    }
      
    
    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center leading-9 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
                    {currentResource ? 'Editar': 'Novo'} Recurso ({labelTitle})
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3">
                    {(resourceType != 'company') && 
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold leading-6 text-navy-700 dark:text-white dark:hover:text-white">
                                Recurso Pai ({resourceType == 'unit'? 'Empresa': 'Unidade'})
                            </label>          
                            <select 
                                {...register("fatherResourceId", { required: "Você deve selecionar uma entidade acima", maxLength: 20 })} aria-invalid={errors.fatherResourceId ? "true" : "false"}
                                name="fatherResourceId"
                                id="fatherResourceId" 
                                className=" block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            >
                                <option disabled value={''} hidden key={'-1'}>Selecione a {resourceType == 'unit'? 'empresa': 'unidade'}</option>
                                <NestedSelectOption resourcesTree={resourcesData} selectType={resourceType == 'unit'? 'company': 'unit'}/>
                            </select>
                        </div>
                    }
                    <label htmlFor="name" className="block text-sm font-bold leading-6 text-navy-700 dark:text-white dark:hover:text-white">
                        Nome
                    </label>
                    <input
                        {...register("name", { required: "Coloque o nome do recurso" })} aria-invalid={errors.name ? "true" : "false"} 
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="flex items-center justify-between">
                        <label htmlFor="description" className="block font-bold leading-6 text-sm text-navy-700 dark:text-white dark:hover:text-white">
                            Descrição
                        </label>
                    </div>
                        <textarea
                        {...register("description", { required: "Preencha o campo com no minímo 200 caracteres", minLength: 200})} aria-invalid={errors.description ? "true" : "false"}
                        id="description"
                        name="description"
                        autoComplete="description"
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </form>
                <div className="flex flex-cols gap-5 mt-3">
                    <button 
                        onClick={() => setOpen(false)}
                        className="flex w-full justify-center rounded-md bg-transparent border border-2 border-inding-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-indigo-600 dark:text-white dark:hover:text-white leading-6 shadow-sm hover:ring-inding-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSubmit(saveResource)}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-white dark:text-white dark:hover:text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}