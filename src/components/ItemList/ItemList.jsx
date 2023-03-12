import Item from "../Item/Item";
import Btn from "../Btn/Btn";
import { Link } from "react-router-dom";

const ItemList = ({ parts, categoryId }) => {
  return (
    <>
      {!(parts.length === 0) ? (
        <>
          <h1 className="-my-4 pb-8 text-5xl font-thin tracking-wider text-slate-500 font-serif">
            {categoryId}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl  gap-12 p-8 font-sans">
            {parts.map((part) => (
              <Item key={part.id} part={part} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex p-1 font-sans justify-center">
          <div
            className={
              "bg-indigo-900/90 rounded-lg p-5 py-16 md:py-8 flex flex-col items-center content-around shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-4 md:gap-1 max-w-sm md:max-w-3xl lg:max-w-4xl"
            }
          >
            <h1 className="p-2 md:p-4 lg:p-8 font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-extralight leading-normal text-indigo-50 uppercase">
              La categoría que buscas no existe
            </h1>
            <Link to={`/`}>
              <Btn className="font-sans font-light text-sm md:text-base lg:text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-36 md:w-36 lg:w-40 shadow-md">
                Volver al home
              </Btn>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemList;
