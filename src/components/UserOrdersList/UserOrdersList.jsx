import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import { getUserOrders } from "../../services/firebase/firestore/orders";

import UserOrder from "../UserOrder/UserOrder";
import Btn from "../Btn/Btn";
import Loading from "../Loading/Loading";
import ErrorState from "../ErrorState/ErrorState";

const UserOrdersList = () => {
  const { user } = useContext(AuthContext);

  const [userOrdersFiltered, setUserOrdersFiltered] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    getUserOrders(user)
      .then((userOrders) => {
        setUserOrdersFiltered(userOrders);
      })
      .catch(() => {
        setErrorState(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-12 pb-6">
        <Loading />
      </div>
    );
  }

  if (errorState) {
    return <ErrorState />;
  }

  return (
    <>
      <h1 className="mt-8 text-4xl font-thin tracking-wider text-slate-500 font-serif">
        Mis órdenes
      </h1>
      {userOrdersFiltered.length !== 0 ? (
        <div className="flex flex-col max-w-xl m-auto gap-12 p-8 font-sans justify-center mb-8">
          {userOrdersFiltered.map((part) => (
            <UserOrder part={part} key={part.id} />
          ))}
        </div>
      ) : (
        <div className="flex p-1 m-6 mb-10 font-sans justify-center">
          <div
            className={
              "bg-indigo-900/90 rounded-lg p-5 py-16 md:py-8 flex flex-col items-center content-around shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-4 md:gap-1 max-w-sm md:max-w-3xl lg:max-w-4xl"
            }
          >
            <h1 className="p-2 md:p-4 lg:p-8 font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-extralight leading-normal text-indigo-50 uppercase">
              Aun no tienes órdenes
            </h1>
            <Link to={`/`}>
              <Btn className="font-sans font-light text-sm md:text-base lg:text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-36 md:w-40 lg:w-44 shadow-md">
                ¡Vamos a comprar!
              </Btn>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrdersList;
