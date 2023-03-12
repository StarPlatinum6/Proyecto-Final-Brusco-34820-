import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";

const ItemDetail = ({userCheckForBookmark, userCheckForBuying, partsId, part, productId}) => {
  return (
    <>
      {partsId.some((item) => item.id === productId) ? (
        <div className="flex p-1 font-sans justify-center">
          <div
            key={part.id}
            className={
              "bg-indigo-900/90 rounded-lg p-5 flex flex-col md:flex-row items-center shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-4 md:gap-16 max-w-sm md:max-w-3xl lg:max-w-4xl relative"
            }
          >
            {userCheckForBookmark()}
            <div className="flex flex-col p-8 w-80 items-center">
              <img
                src={part.pictureUrl}
                alt=""
                className={
                  "rounded-xl mt-3 max-h-80 w-80 md:mb-6 md:-mr-10 md:scale-125 shadow-lg shadow-slate-100/80 ring-8 ring-indigo-500/50"
                }
              />
            </div>
            <div className="w-96">
              <h1
                className={
                  "text-md p-2 pb-2 w-max-content text-lg text-indigo-50 font-medium tracking-wide h-12 flex justify-center items-center"
                }
              >
                {part.title}
              </h1>
              <div className="p-4 border-y border-blue-gray-50 my-4 flex flex-col items-center justify-between py-3">
                <p
                  className={
                    "antialiased font-sans text-md text-justify font-light leading-normal text-slate-300 flex gap-1 py-1 px-3 rounded-m mt-2"
                  }
                >
                  {part.description}
                </p>
                <p className="block antialiased font-sans text-3xl font-extralight leading-normal text-indigo-50 mr-3 mt-2">
                  $ {part.price}
                </p>
              </div>
              {userCheckForBuying()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-1 font-sans justify-center">
          <div
            key={part.id}
            className={
              "bg-indigo-900/90 rounded-lg p-5 py-16 md:py-8 flex flex-col items-center content-around shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-4 md:gap-1 max-w-sm md:max-w-3xl lg:max-w-4xl"
            }
          >
            <h1 className="p-2 md:p-4 lg:p-8 font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-extralight leading-normal text-indigo-50 uppercase">
              El producto que buscas no existe
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

export default ItemDetail;
