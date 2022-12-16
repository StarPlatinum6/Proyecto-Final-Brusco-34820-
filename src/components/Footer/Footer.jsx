import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [orderId, setOrderId] = useState([]);

  return (
    <>
      <div className=" h-40 flex items-center justify-center bg-slate-100 text-2xl">
        <span className="animate-pulse text-slate-600 pr-1">
          Diseñado en React.JS
        </span>
        <img
          src="/images/react.svg"
          className="animate-pulse w-12"
          alt=""
        ></img>
        <span className="animate-pulse text-slate-600 pl-1">
          por Nicolás Brusco para la comisión 34820
        </span>
      </div>
      <div className="flex items-center justify-center bg-slate-100 text-2xl -mt-10 pb-4">
        <input type="text" className="text-slate-600 p-2 rounded-lg border-4 border-indigo-500 bg-indigo-100" onChange={e => setOrderId(e.target.value)}></input>
        <button className="font-sans font-light text-lg text-slate-50 bg-indigo-500 p-3 rounded-md m-3 hover:bg-indigo-700 transition-all w-48 shadow-md">
          <Link to={`/checkout/${orderId}`}>Verificar Orden</Link>
        </button>
      </div>
    </>
  );
};

export default Footer;
