import { useContext } from "react";
import { BookmarksContext } from "../../context/BookmarksContext";

import { Link } from "react-router-dom";

import Btn from "../Btn/Btn";

const Bookmarks = () => {
  const { bookmarks, isBookmarksEmpty } = useContext(BookmarksContext);

  if (isBookmarksEmpty) {
    return (
      <div className="m-16">
        <h1 className="mt-8 pb-8 text-4xl md:text-5xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          No hay favoritos
        </h1>
        <Link to={`/`}>
          <Btn className="font-sans font-light text-lg text-slate-50 bg-indigo-500 p-3 rounded-md m-3 hover:bg-indigo-700 transition-all w-48 shadow-md">
            Volver a la tienda
          </Btn>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="m-8 text-4xl font-thin tracking-wider text-slate-500 font-serif">
        Mis favoritos
      </h1>
      {bookmarks.map((bookmark) => {
        return (
          <div
            key={bookmark.id}
            className={
              "flex px-4 md:px-8 lg:px-16 py-6 my-6 justify-between items-center bg-slate-100"
            }
          >
            <img
              src={bookmark.pictureUrl}
              alt=""
              className="rounded-xl max-h-12 w-12 lg:max-h-20 lg:w-20 shadow-lg ml-8 lg:ml-0 shadow-slate-100/80 ring-2 ring-slate-700/50"
            />
            <p className="lg:text-lg w-60 md:w-96 text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
              {bookmark.title}
            </p>
            <div className="flex flex-col items-center sm:flex-row">
              <p className="sm:text-base md:text-lg lg:text-xl w-max-content text-slate-500 font-medium tracking-wide h-12 w-40 flex justify-center items-center">
                $ {bookmark.price} C/u
              </p>
              <Link to={`/product/${bookmark.id}`}>
                <Btn
                  className={
                    "bg-green-600 p-1 sm:p-2 rounded-md hover:bg-green-700 transition-all w-24 shadow-md text-slate-300"
                  }
                >
                  Comprar
                </Btn>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bookmarks;
