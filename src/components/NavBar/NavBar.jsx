import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

import Btn from "../Btn/Btn";
import CartWidget from "../CartWidget/CartWidget";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import LoginIcon from "./NavIcons/LoginIcon";
import DropdownUser from "../DropdownUser/DropdownUser";

const NavStyle =
  "hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md font-serif text-lg py-3 px-2 hover:shadow-lg transition-all duration-300 mx-1 tracking-widest";
const NavActiveStyle = "bg-slate-400 rounded-md shadow-lg shadow-slate-400";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    const collectionsPc = collection(db, "pcParts");
    getDocs(collectionsPc)
      .then((response) => {
        const allCategories = response.docs.map((doc) => {
          return doc.data().category;
        });
        let categories = [...new Set(allCategories)];
        setCategories(categories);
      })
      .catch(() => {
        setErrorState(true);
      });
  }, []);

  return (
    <nav className="flex flex-wrap justify-evenly items-center bg-slate-200 py-6 text-slate-600">
      <div className="z-50 flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
        <NavLink to="/">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-light font-serif hover:scale-110 rounded-md py-3 px-2 transition-all duration-300 border mx-4 truncate bg-gradient-to-r from-slate-600 via-indigo-400 to-slate-600 text-transparent bg-clip-text">
            EPHEMER GAMING
          </h1>
        </NavLink>
        <div className="flex items-center gap-4">
          <DropdownMenu categories={categories} />
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-400 rounded-md shadow-lg shadow-slate-400"
                : ""
            }
          >
            <CartWidget className="flex justify-center items-center hover:bg-slate-400 hover:border-slate-400 hover:shadow-slate-400 rounded-md hover:shadow-lg transition-all duration-300 mx-1 py-2 w-20 min-w-fit opacity-90" />
          </NavLink>
          <div className="px-1 py-1 flex flex-col sm:flex-row sm:gap-2 font-serif">
            {user ? (
              <DropdownUser />
            ) : (
              <>
                <NavLink to="/login">
                  <div className="text-slate-600 hover:text-slate-50 hover:bg-indigo-400/70 group flex flex-row w-full items-center rounded-md px-2 py-3 text-sm md:text-base">
                    <button className="flex">
                      <LoginIcon className={"ml-1 mr-2 text-indigo-600/90"} />
                      Login
                    </button>
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden xl:flex">
        {!errorState ? (
          categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/category/${cat}`}
              className={({ isActive }) => (isActive ? NavActiveStyle : "")}
            >
              <Btn className={NavStyle}>{cat}</Btn>
            </NavLink>
          ))
        ) : (
          <div className="text-xl font-light font-serif hover:scale-110 rounded-md py-3 px-2 transition-all duration-300 border mx-4 truncate bg-gradient-to-r from-slate-600 via-red-400 to-slate-600 text-transparent bg-clip-text">
            Error al obtener categorías
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
