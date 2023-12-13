/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './Links';
import { IRoute } from '@/types/navigation';

function SideBar(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`w-20vw sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[20px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[20px] font-bold uppercase text-navy-700 dark:text-white">
          <p>Trabalho</p> 
          <p>
            de conclusão
            <span className="font-tangerine text-[10px]"> By Igor</span>
          </p>
        </div>
      </div>
      <div className="mb-7 mt-[85px] h-px bg-gray-300 dark:bg-white/30" />

      {/* Navigation Abas */}
      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
    </div>
  );
}

export default SideBar;
