import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import { getUserOrders } from "../../services/firestore/orders";

import UserOrder from "../UserOrder/UserOrder";
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
      <div className="flex flex-col max-w-xl m-auto gap-12 p-8 font-sans justify-center mb-8">
        {userOrdersFiltered.map((part) => (
          <UserOrder part={part} key={part.id} />
        ))}
      </div>
    </>
  );
};

export default UserOrdersList;
