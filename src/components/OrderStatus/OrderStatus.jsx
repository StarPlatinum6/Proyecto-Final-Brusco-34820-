import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

import Loading from "../Loading/Loading";
import Btn from "../Btn/Btn";

const OrderStatus = () => {
  const { orderId } = useParams();

  const [orderData, setOrderData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const order = doc(db, "orders", orderId);

    getDoc(order)
      .then((response) => {
        const data = response.data();
        setOrderData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-12 pb-6">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {orderData === undefined ? (
        <div className="flex py-12 font-sans justify-center">
          <div
            className={
              "bg-indigo-900/90 rounded-lg p-5 py-16 md:py-8 flex flex-col items-center content-around shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-4 md:gap-1 max-w-sm md:max-w-3xl lg:max-w-4xl"
            }
          >
            <h1 className="p-2 md:p-4 lg:p-8 font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-extralight leading-normal text-indigo-50 uppercase">
              La orden que buscas no existe
            </h1>
            <Link to={`/`}>
              <Btn className="font-sans font-light text-sm md:text-base lg:text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-36 md:w-36 lg:w-40 shadow-md">
                Volver al home
              </Btn>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center relative">
            <h1 className="my-10 text-2xl lg:text-4xl font-thin tracking-wider text-slate-500 font-serif bg-indigo-300/50 hover:bg-indigo-400/50 transition-all max-w-4xl p-3 rounded-lg px-12 pb-5">
              ORDEN {orderId}
            </h1>
            <h2 className="absolute bottom-6 text-sm lg:text-base font-thin tracking-wider text-slate-500 font-serif bg-yellow-200/70 hover:bg-yellow-300/70 transition-all p-1 px-2 rounded-lg">
              EN PREPARACIÓN
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="bg-slate-200 flex w-full justify-around h-12 items-center text-xs sm:text-sm md:text-base lg:text-xl text-slate-500 font-medium font-serif tracking-wide">
              <h3>
                Cliente: {orderData.buyer.firstName} {orderData.buyer.lastName}
              </h3>
              <h3>Mail: {orderData.buyer.email}</h3>
              <h3>Tel: {orderData.buyer.phone}</h3>
            </div>
          </div>
          {orderData.items.map((item) => (
            <div
              key={item.id}
              className={
                "flex px-4 md:px-8 lg:px-16 py-6 my-6 justify-between items-center bg-slate-100"
              }
            >
              <img
                src={item.pictureUrl}
                alt=""
                className="rounded-xl max-h-20 w-20 lg:max-h-28 lg:w-28 shadow-lg ml-8 lg:ml-0 shadow-slate-100/80 ring-2 ring-slate-700/50"
              />
              <p className="lg:text-lg w-60 md:w-96 text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
                {item.title}
              </p>
              <div className="flex flex-col items-center sm:flex-row">
                <p className="sm:text-base md:text-lg lg:text-xl w-max-content text-slate-500 font-medium tracking-wide h-12 w-40 flex justify-center items-center">
                  $ {item.price} / {item.quantity} Un.
                </p>
                <p className="w-max-content md:text-xl lg:text-2xl text-slate-700 font-medium tracking-wide h-12 flex justify-center items-center w-24 lg:w-32">
                  $ {item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-center p-6">
            <p className="p-3 text-2xl lg:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase bg-green-300/50 hover:bg-green-400/50 transition-all max-w-3xl rounded-lg px-12">
              Total de la compra: $ {orderData.total}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default OrderStatus;
