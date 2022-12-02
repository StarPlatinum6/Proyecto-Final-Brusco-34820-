import Btn from "../Btn/Btn";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";

const NavBar = () => {

//   const clickAction = () => {
//     alert("El botón funciona");
//   };

  return (
    <nav className="flex justify-evenly items-center bg-slate-300">
      <NavLink to='/'>
      <h1 className="text-lg font-light font-sans bg-slate-300 hover:bg-slate-500">
        Ephemer Gaming
      </h1>
      </NavLink>
      <NavLink
        to="/category/Motherboard"
        className="bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs"
      >
        <Btn>Motherboards</Btn>
      </NavLink>
      <NavLink
        to="/category/CPU"
        className="bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs"
      >
        <Btn>Procesadores</Btn>
      </NavLink>
      <NavLink
        to="/category/RAM"
        className="bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs"
      >
        <Btn>Memoria RAM</Btn>
      </NavLink>
      <NavLink
        to="/category/PSU"
        className="bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs"
      >
        <Btn>Fuentes de Alimentación</Btn>
      </NavLink>
      <NavLink
        to="/category/GPU"
        className="bg-slate-300 hover:bg-slate-500 px-2 font-sans text-xs"
      >
        <Btn>Placas de Video</Btn>
      </NavLink>
      <CartWidget className="flex justify-center items-center w-8 bg-slate-300 hover:bg-slate-500 px-1"/>
    </nav>
  );
};

export default NavBar;
