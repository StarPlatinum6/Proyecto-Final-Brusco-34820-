import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";

const UserOrdersList = ({ part }) => {
  return (
    <>
      <div
        className={
          "bg-indigo-900/90 rounded-lg p-5 flex flex-col items-center shadow-xl shadow-indigo-900/70 hover:shadow-indigo-600/70 transition-all border-2 border-opacity-80 border-white justify-between hover:scale-105 origin-top gap-4 relative"
        }
      >
        <h1
          className={
            "p-2 w-max-content text-lg text-indigo-50 font-medium tracking-wide h-8"
          }
        >
          Order ID: {part.id}
        </h1>
        <div className="p-4 border-t border-blue-gray-50 mt-4 flex items-center justify-between py-3">
          <p className="block antialiased font-sans text-lg font-light leading-normal text-indigo-50 mr-3 mt-2">
            $ {part.total}
          </p>
          <Link to={`/order/${part.id}`}>
            <Btn
              className={
                "bg-indigo-600 p-2 rounded-md m-1 -mb-1 ml-8 font-light hover:bg-indigo-700 transition-all w-28 shadow-md text-slate-300 text-lg"
              }
            >
              Detalle
            </Btn>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserOrdersList;
