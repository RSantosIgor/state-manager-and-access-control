import { Metadata } from "next";
import ButtonDropdown from "./components/buttonDropdown";
import { Peoples } from "./components/peoples";

export const metadata: Metadata = {
  title: "Resources"
}

export default function Resources() {

  return (
  <div className="w-100p h-full mt-3 flex flex-col gap-5">
    <div className="flex w-full justify-end">
        <ButtonDropdown/>
    </div>
    <div className=" w-full sm:overflow-auto px-6 !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-whit">
          <p>
            Empresa 1
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
          Unidades: 0
        </p>
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

    <div className=" w-full sm:overflow-auto px-6 !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Company 2
        </div>
      </header>
    </div>

    <div className=" w-full sm:overflow-auto px-6 !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:!bg-navy-800 dark:text-white">
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Company 3
        </div>
      </header>
    </div>
  </div>
  );
}