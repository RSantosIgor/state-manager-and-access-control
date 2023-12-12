import { ResourceExtended } from "@/types/resource";
import { Peoples } from "./peoples";
import { calculateHowManyChildrenFromChildren } from "@/util/resourceTree";
import Link from "next/link";

export function ResourceList({ resourcesData }: { resourcesData: ResourceExtended[] }) {

    const setCompanyCards = () => {
        return resourcesData.map((company: ResourceExtended, index: number) => {
            return <>
                <div key={'C' + index} className=" sm:overflow-auto !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
                    <header className="relative flex items-center px-6 border border-t-0 border-b-0 border-r-0 border-l-5 border-l-indigo-500 rounded-t-[20px] justify-between pt-4">
                        <div className="text-xl font-bold text-navy-700 dark:text-white">
                            <p>
                                {company.tableInfo?.name || 'LOREM'}
                            </p>
                        </div>
                        <div className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                            <Link href={`resources/resource/${company.id}`}>
                                Ver mais
                            </Link>
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
                            Pessoas: {company.permissions?.length || 0}
                        </p>
                    </div>
                    <div className="mt-1 p-0.5 flex items-center justify-end">
                    <Peoples profiles={company.permissions?.map(p => p.user) || []}/>
                    </div>
                </div>
                {setUnitCards(company.children || [])}
            </>
        });
    }

    const setUnitCards = (units: ResourceExtended[]) => {
        return units.map((unit: ResourceExtended, index: number) => {
            return <>
                <div className="pl-[3%]" key={'U' + index}>
                    <div className=" w-full sm:overflow-auto !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
                        <header className="relative flex items-center px-6 border border-t-0 border-b-0 border-r-0 border-l-5 border-l-indigo-500 rounded-t-[20px] justify-between pt-4">
                            <div className="text-xl font-bold text-navy-700 dark:text-white">
                                <p>
                                     {unit.tableInfo?.name || 'LOREM'}
                                </p>
                            </div>
                            <div className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                                <Link href={`resources/resource/${unit.id}`}>
                                    Ver mais
                                </Link>
                            </div>
                        </header>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 font-semibold p-3">
                                {unit.tableInfo?.description || 'LOREM'}
                            </p>
                        </div>
                        <div className="mt-3 border-t border-gray-600 p-0.5 flex items-center justify-between">
                            <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
                            <span>
                                Departamentos: {unit.children?.length || 0}
                            </span>
                            </p>
                            <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
                                Pessoas: {unit.permissions?.length || 0}
                            </p>
                        </div>
                        <div className="mt-1 p-0.5 flex items-center justify-end">
                            <Peoples profiles={unit.permissions?.map(p => p.user) || []}/>
                        </div>
                    </div>
                </div>
                {setDepartamentCards(unit.children || [])}
            </>
        });
    }

    const setDepartamentCards = (departaments: ResourceExtended[]) => {
        return departaments.map((departament: ResourceExtended, index: number) => {
            return <>
                <div className="pl-[6%]" key={'D' + index}>
                    <div className=" w-full sm:overflow-auto !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
                        <header className="relative flex items-center px-6 border border-t-0 border-b-0 border-r-0 border-l-5 border-l-indigo-500 rounded-t-[20px] justify-between pt-4">
                            <div className="text-xl font-bold text-navy-700 dark:text-white">
                                <p>
                                     {departament.tableInfo?.name || 'LOREM'}
                                </p>
                            </div>
                            <div className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                                <Link href={`resources/resource/${departament.id}`}>
                                    Ver mais
                                </Link>
                            </div>
                        </header>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 font-semibold p-3">
                                {departament.tableInfo?.description || 'LOREM'}
                            </p>
                        </div>
                        <div className="mt-3 border-t border-gray-600 p-0.5 flex items-center justify-end">
                            <p className="mt-2 text-sm text-gray-600 font-semibold p-3">
                                Pessoas: {departament.permissions?.length || 0}
                            </p>
                        </div>
                        <div className="mt-1 p-0.5 flex items-center justify-end">
                            <Peoples profiles={departament.permissions?.map(p => p.user) || []}/>
                        </div>
                    </div>
                </div>
            </>
        });
    }

    return (<>{setCompanyCards()}</>)
}