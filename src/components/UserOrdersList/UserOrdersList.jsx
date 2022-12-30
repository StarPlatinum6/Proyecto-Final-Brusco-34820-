import { useEffect, useState, useContext } from "react";

import { db } from "../../services/firebase/firebaseconfig";
import { getDocs, collection } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";

import UserOrder from "../UserOrder/UserOrder";
import Loading from "../Loading/Loading";

const UserOrdersList = () => {
  const { user } = useContext(AuthContext);

  const [userOrdersFiltered, setUserOrdersFiltered] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "orders"))
      .then((response) => {
        const userOrders = response.docs.map((doc) => {
          const post = doc.data();
          return {
            id: doc.id,
            email: post.buyer.email,
            total: post.total,
            date: post.date.seconds,
          };
        });
        const userOrdersFiltered = userOrders.filter(
          (order) => order.email === user.email
        );
        const userOrdersFilteredByDate = userOrdersFiltered.sort((order1, order2) => order1.date - order2.date);
        setUserOrdersFiltered(userOrdersFilteredByDate);
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
