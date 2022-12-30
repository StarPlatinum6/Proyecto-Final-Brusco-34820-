import { useContext } from "react";
import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";

import { BookmarksContext } from "../../context/BookmarksContext";
import { AuthContext } from "../../context/AuthContext";

import { IconButton } from "@material-tailwind/react";
import { BookmarkIcon } from "../Bookmarks/BookmarkIcons";
import { BookmarkFillIcon } from "../Bookmarks/BookmarkIcons";

const Item = ({ part }) => {
  const { addBookmark, isInBookmarks, deleteBookmark } =
    useContext(BookmarksContext);

  const isAdded = isInBookmarks(part.id);

  const { user } = useContext(AuthContext);

  const userCheckForBookmark = () => {
    if (user) {
      return (
        <>
          <span className="absolute -left-3 -top-2">
            <IconButton
              variant="outlined"
              size="sm"
              className="bg-indigo-400/90 shadow-sm shadow-slate-50 transition-all flex items-center justify-center"
              onClick={() => {
                isAdded ? deleteBookmark(part.id) : addBookmark(part);
              }}
            >
              {isAdded ? (
                <BookmarkFillIcon className="h-5 w-5 text-indigo-50" />
              ) : (
                <BookmarkIcon className="h-5 w-5 text-indigo-50" />
              )}
            </IconButton>
          </span>
        </>
      );
    }
  };

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
      {userCheckForBookmark()}
      <div className="flex justify-center items-center h-20">
        <h1
          className={
            "p-2 w-max-content text-lg text-indigo-50 font-medium tracking-wide"
          }
        >
          {part.title}
        </h1>
      </div>

      <img
        src={part.pictureUrl}
        alt=""
        className={
          "rounded-xl mt-3 max-h-44 shadow-lg shadow-slate-100/80 ring-8 ring-indigo-500/50"
        }
      />
      <div className="p-4 border-t border-blue-gray-50 mt-4 flex items-center justify-between py-3">
        <p className="block antialiased font-sans font-light leading-normal text-indigo-50 mt-2 w-24">
          $ {part.price}
        </p>
        <Link to={`/product/${part.id}`}>
          <Btn
            className={
              "bg-indigo-600 p-2 rounded-md m-1 -mb-1 ml-8 font-light hover:bg-indigo-700 transition-all w-24 shadow-md text-slate-300"
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
