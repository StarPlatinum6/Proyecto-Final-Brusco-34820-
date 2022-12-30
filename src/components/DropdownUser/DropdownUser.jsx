import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

import UserIcon from "./UserIcon";
import UserImg from "./UserImg";
import OrderIcon from "./OrderIcon";
import LogoutIcon from "../NavBar/NavIcons/LogoutIcon";
import { BookmarkIcon } from "../Bookmarks/BookmarkIcons";

export default function DropdownUser() {
  const { logOut, user } = useContext(AuthContext);

  return (
    <div className="w-24 text-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center w-full justify-center rounded-md hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 hover:shadow-lg transition-all px-3 py-2 text-sm md:text-base font-serif text-slate-500 hover:text-slate-200">
            {user.photoURL ? <UserImg src={user.photoURL} /> : <UserIcon />}
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y font-serif divide-slate-300 rounded-md bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <h1 className="text-slate-600 group flex flex-row justify-center w-full items-center rounded-md px-2 py-2 text-sm md:text-base">
              {user.displayName}
            </h1>
            <div className="px-1 py-1 ">
              <Menu.Item>
                <NavLink to="/userorders">
                  <div className="text-slate-600 hover:text-slate-50 hover:bg-indigo-400/70 group flex flex-row w-full items-center rounded-md px-2 py-2 text-sm">
                    <button className="flex">
                      <OrderIcon className={"ml-1 mr-2 text-indigo-600/90"} />
                      Mis órdenes
                    </button>
                  </div>
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/bookmarks">
                  <div className="text-slate-600 hover:text-slate-50 hover:bg-indigo-400/70 group flex flex-row w-full items-center rounded-md px-2 py-2 text-sm">
                    <button className="flex">
                      <BookmarkIcon
                        className={"ml-1 mr-2 text-indigo-600/90"}
                        height="1.3em"
                        width="1.3em"
                      />
                      Mis favoritos
                    </button>
                  </div>
                </NavLink>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <div
                  className="text-slate-600 hover:text-slate-50 hover:bg-indigo-400/70 group flex flex-row w-full items-center rounded-md px-2 py-2 text-sm"
                  onClick={logOut}
                >
                  <button className="flex">
                    <LogoutIcon className={"ml-1 mr-2 text-indigo-600/90"} />
                    Logout
                  </button>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
