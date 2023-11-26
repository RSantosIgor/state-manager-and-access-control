'use client'
import React from "react";
import Dropdown from "./dropdown";
import { AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { TiLightbulb } from "react-icons/ti";
import { RiArrowDownSLine } from "react-icons/ri";

function ButtonDropdown() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center rounded-md bg-indigo-600 px-3 py-1.5 mt-10 font-semibold text-sm font-normal text-white dark:text-white dark:hover:text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-200`}
        >
            Novo Recurso
            <RiArrowDownSLine className="h-6 w-6 text-white font-semibold text-sm"/>
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames="top-10 right-0 w-full"
      // eslint-disable-next-line react/no-children-prop
      children={
        <div className="z-50 w-full rounded-xl py-3 px-3 text-sm shadow-xl shadow-shadow-500 bg-indigo-600">
          <p className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-sm text-white rounded-md font-normal flex cursor-pointer items-center">
            Empresa
          </p>
          <p className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-sm text-white rounded-md font-normal flex cursor-pointer items-center">
            Unidade
          </p>
          <p className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-sm text-white rounded-md font-normal flex cursor-pointer items-center">
            Departamento
          </p>
        </div>
      }
    />
  );
}

export default ButtonDropdown;
