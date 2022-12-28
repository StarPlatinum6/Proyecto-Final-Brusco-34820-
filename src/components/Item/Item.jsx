import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";

const Item = ({ part }) => {
  return (
    <div
      key={part.id}
      className={
        "bg-indigo-900/90 rounded-lg p-5 flex flex-col items-center shadow-xl shadow-indigo-900/70 hover:shadow-indigo-200/70 transition-all border-2 border-opacity-80 border-white justify-between hover:scale-105 origin-top gap-4 relative"
      }
    >
      {part.stock === 0 ? (
        <span className="absolute -right-3 -top-2 font-sans font-light text-xs text-slate-50 bg-red-600/90 p-2 rounded-md shadow-md cursor-default">
          Agotado
        </span>
      ) : (
        <span className="absolute -right-3 -top-2 font-sans font-light text-xs text-slate-50 bg-green-600/90 p-2 rounded-md shadow-md cursor-default">
          Disponible
        </span>
      )}
      <h1
        className={
          "p-2 mb-5 w-max-content text-lg text-indigo-50 font-medium tracking-wide h-8"
        }
      >
        {part.title}
      </h1>
      <img
        src={part.pictureUrl}
        alt=""
        className={
          "rounded-xl mt-3 max-h-44 shadow-lg shadow-slate-100/80 ring-8 ring-indigo-500/50"
        }
      />
      <div className="p-4 border-t border-blue-gray-50 mt-4 flex items-center justify-between py-3">
        <p className="block antialiased font-sans text-lg font-light leading-normal text-indigo-50 mr-3 mt-2">
          $ {part.price}
        </p>
        <Link to={`/product/${part.id}`}>
          <Btn
            className={
              "bg-indigo-600 p-2 rounded-md m-1 -mb-1 ml-8 font-light hover:bg-indigo-700 transition-all w-28 shadow-md text-slate-300 text-lg"
            }
          >
            Detalles
          </Btn>
        </Link>
      </div>
    </div>
  );
};

export default Item;
