import React from "react";
import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";

const ErrorState = () => {
  return (
    <div className="m-8">
      <div className="flex p-1 font-sans justify-center">
        <div
          className={
            "bg-indigo-900/90 rounded-lg p-5 py-16 md:py-8 flex flex-col items-center content-around shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-4 md:gap-1 max-w-sm md:max-w-3xl lg:max-w-4xl"
          }
        >
          <h1 className="p-2 md:p-4 lg:p-8 font-serif text-md sm:text-lg font-extralight leading-normal text-indigo-50 uppercase w-64 sm:w-96">
            Lo sentimos, estamos teniendo problemas para visualizar la información.
          </h1>
          <Link to={`/`}>
            <Btn className="font-sans font-light text-sm md:text-base lg:text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-36 md:w-36 lg:w-40 shadow-md">
              Volver al home
            </Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
