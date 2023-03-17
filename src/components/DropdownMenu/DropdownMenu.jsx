import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import HomeIcon from "../Icons/NavIcons/HomeIcon";

import { NavLink } from "react-router-dom";

import { IconsMenu } from "./IconsMenu";

export default function DropdownMenu({ categories }) {
  return (
    <div className="xl:hidden w-36 text-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 hover:shadow-lg transition-all px-4 py-3 text-sm md:text-base font-serif text-slate-500 hover:text-slate-200">
            Categorías
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-indigo-500 hover:text-indigo-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute lg:right-0 mt-2 w-56 origin-top-right divide-y font-serif divide-slate-300 rounded-md bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <NavLink to={`/`}>
                <div className="px-1 py-1 ">
                  <div className="text-slate-600 hover:text-slate-50 hover:bg-indigo-400/70 group flex flex-row w-full items-center rounded-md px-2 py-2 text-sm">
                    <button className="flex uppercase">
                      <HomeIcon className={"ml-1 mr-2 text-indigo-600"} />
                      Todas
                    </button>
                  </div>
                </div>
              </NavLink>
            </Menu.Item>
            <div className="px-1 py-1 ">
              {categories.map((cat, index) => {
                return (
                  <Menu.Item key={index}>
                    <NavLink to={`/category/${cat}`}>
                      <div className="text-slate-600 hover:text-slate-50 hover:bg-indigo-400/70 group flex flex-row w-full items-center rounded-md px-2 py-2 text-sm">
                        <button className="flex">
                          {<IconsMenu icon={cat} />}
                          {cat}
                        </button>
                      </div>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </div>
            <div className="px-1 py-1"></div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
