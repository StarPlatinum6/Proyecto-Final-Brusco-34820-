import Btn from "../Btn/Btn";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  
  return (
    <nav className="flex flex-wrap justify-evenly items-center bg-slate-200 py-6 text-slate-600">
      <NavLink to="/">
        <h1 className="sm:text-4xl xl:text-5xl font-light font-serif hover:scale-110 rounded-md py-3 px-2 transition-all duration-300 border mx-4 truncate bg-gradient-to-r from-slate-600 via-indigo-400 to-slate-600 text-transparent bg-clip-text">
          EPHEMER GAMING
        </h1>
      </NavLink>
      <NavLink
        to="/category/MOTHERBOARD"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 rounded-md shadow-lg shadow-slate-400" : ""
        }
        >
        <Btn className="hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md font-serif text-lg py-3 px-2 hover:shadow-lg transition-all duration-300 mx-1 tracking-widest">
          MOTHERBOARDS
        </Btn>
      </NavLink>
      <NavLink
        to="/category/CPU"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 rounded-md shadow-lg shadow-slate-400" : ""
        }
      >
        <Btn className="hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md font-serif text-lg py-3 px-2 hover:shadow-lg transition-all duration-300 mx-1 tracking-widest">
          PROCESADORES
        </Btn>
      </NavLink>
      <NavLink
        to="/category/RAM"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 rounded-md shadow-lg shadow-slate-400" : ""
        }
      >
        <Btn className="hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md font-serif text-lg py-3 px-2 hover:shadow-lg transition-all duration-300 mx-1 tracking-widest">
          MEMORIAS RAM
        </Btn>
      </NavLink>
      <NavLink
        to="/category/PSU"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 rounded-md shadow-lg shadow-slate-400" : ""
        }
      >
        <Btn className="hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md font-serif text-lg py-3 px-2 hover:shadow-lg transition-all duration-300 mx-1 tracking-widest">
          FUENTES
        </Btn>
      </NavLink>
      <NavLink
        to="/category/GPU"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 rounded-md shadow-lg shadow-slate-400" : ""
        }
      >
        <Btn className="hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md font-serif text-lg py-3 px-2 hover:shadow-lg transition-all duration-300 mx-1 tracking-widest">
          PLACAS DE VIDEO
        </Btn>
      </NavLink>
      <CartWidget className="flex flex-col justify-center items-center hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md hover:shadow-lg transition-all duration-300 mx-1 py-2 w-20 min-w-fit" />
    </nav>
  );
};

export default NavBar;
