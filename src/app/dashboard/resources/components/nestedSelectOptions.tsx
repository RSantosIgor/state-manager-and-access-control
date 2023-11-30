'use client'
import { ResourceExtended } from "@/types/resource";

export function NestedSelectOption({resourcesTree, selectType}: {resourcesTree: ResourceExtended[], selectType: string}) {
    
    const isCompany = selectType == 'company';
    const className = " block w-full rounded-md border-0 py-1.5 px-1.5 mb-4 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-navy-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

    const companyOptions = () => {
       return  resourcesTree.map((r: ResourceExtended, index: number) => {
       return <option className={className} value={r.id} key={index}>{r.tableInfo?.name}</option>
        });
    }

    const unitOptions = () => {
       return resourcesTree.map((r: ResourceExtended, index: number) => {
            return (
            (r.children && r.children.length > 0) ? 
            (<>
                <optgroup className={className} label={r.tableInfo?.name} key={index}>
                    {
                        r.children?.map((rChildren: ResourceExtended, indexJ: number) => {
                            return (<option className={className} value={rChildren.id} key={String(index) + String(indexJ)}>{rChildren.tableInfo?.name}</option>)
                        })
                    }    
                </optgroup>
            </>): <></>)
        })
    }

    return (isCompany ? companyOptions(): unitOptions()); 
}