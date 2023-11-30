import { ResourceExtended } from "@/types/resource";
import { Peoples } from "./peoples";
import { calculateHowManyChildrenFromChildren } from "@/util/resourceTree";

export function ResourceList({ resourcesData }: { resourcesData: ResourceExtended[] }) {

    const setCompanyCards = () => {
        return resourcesData.map((company: ResourceExtended, index: number ) =>
            {return <>
                <div key={index} className=" sm:overflow-auto !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
                    <header className="relative flex items-center px-6 border border-t-0 border-b-0 border-r-0 border-l-5 border-l-indigo-500 rounded-t-[20px] justify-between pt-4">
                        <div className="text-xl font-bold text-navy-700 dark:text-white">
                            <p>
                                {company.tableInfo?.name || 'LOREM'}
                            </p>
                        </div>
                        <div className="text-sm font-bold text-indigo-600">
                            Ver mais
                        </div>
                    </header>
                    <div className="w-100p flex">
                        <p className="text-sm font-semibold text-gray-600 font-semibold p-3">
                            {company.tableInfo?.description.slice(0, 100) + '...' || 'LOREM'}
                        </p>
                    </div>
                    <div className="mt-3 border-t border-gray-600 p-0.5 flex items-center justify-between">
                        <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
                            <span>
                                Unidades: {company.children?.length || 0}
                            </span> 
                        </p>
                        <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
                            <span>
                                Departamentos: {' ' + calculateHowManyChildrenFromChildren(company)}
                            </span> 
                        </p>
                        <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
                            Pessoas: 0
                        </p>
                    </div>
                    <div className="mt-1 p-0.5 flex items-center justify-end">
                        <Peoples />
                    </div>
                </div>
            </>});
    }

    return (<>{setCompanyCards()}</>)
}