import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

const Checkout = () => {
  const { orderId } = useParams();

  const [orderData, setOrderData] = useState([]);
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

  const { buyer, items, total } = orderData;

  if (isLoading) {
    return (
      <div className="tracking-widest bg-slate-50 p-16 mx-auto max-w-screen-lg flex justify-center">
        <div className="flex justify-center my-6 p-8 text-4xl text-slate-100 bg-slate-500 drop-shadow-xl rounded-lg animate-pulse items-center w-96 tracking-widest font-serif">
          <h1>CARGANDO...</h1>
          <img
          className="animate-spin ml-4 h-8 w-8 opacity-90 invert"
          alt=""
          src="https://www.svgrepo.com/show/315795/spinner.svg"
        />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="my-10 text-4xl font-thin tracking-wider text-slate-500 font-serif bg-indigo-300/50 hover:bg-indigo-400/50 transition-all max-w-3xl p-3 rounded-lg px-12">
          ORDEN {orderId}
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="bg-slate-200 flex w-full justify-around h-12 items-center">
          <h3 className="text-md text-xl text-slate-500 font-medium font-serif tracking-wide">
            Cliente: {buyer.firstName} {buyer.lastName}
          </h3>
          <h3 className="text-md text-xl text-slate-500 font-medium font-serif tracking-wide">
            Mail: {buyer.email}
          </h3>
          <h3 className="text-md text-xl text-slate-500 font-medium font-serif tracking-wide">
            Tel: {buyer.phone}
          </h3>
        </div>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className={
            "flex px-16 py-6 my-6 justify-between items-center bg-slate-100"
          }
        >
          <img
            src={item.pictureUrl}
            alt=""
            className="rounded-xl max-h-20 w-20 scale-125 shadow-lg shadow-slate-100/80 ring-2 ring-slate-700/50"
          />
          <p className="text-md w-96 text-xl text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
            {item.title}
          </p>
          <p className="text-md w-max-content text-lg text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
            $ {item.price} / {item.quantity} Un.
          </p>
          <p className="text-md w-max-content text-3xl text-slate-700 font-medium tracking-wide h-12 flex justify-center items-center">
            $ {item.price * item.quantity}
          </p>
        </div>
      ))}
      <div className="flex justify-center p-6">
        <p className="p-3 text-2xl lg:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase bg-green-300/50 hover:bg-green-400/50 transition-all max-w-3xl rounded-lg px-12">
          Total de la compra: $ {total}
        </p>
      </div>
    </>
  );
};

export default Checkout;
