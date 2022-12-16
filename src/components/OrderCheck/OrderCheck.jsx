import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

import Btn from "../Btn/Btn";

const OrderCheck = () => {
  const [orderId, setOrderId] = useState([]);
  const [ordersId, setOrdersId] = useState([]);

  useEffect(() => {
    const collectionOrders = collection(db, "orders");

    getDocs(collectionOrders).then((response) => {
      const ordersId = response.docs.map((doc) => {
        return { id: doc.id };
      });
      setOrdersId(ordersId);
    });
  }, []);

  return (
    <div className="flex items-center justify-center bg-slate-100 text-2xl -mt-10 pb-4">
      <input
        type="text"
        placeholder="Ingrese un Order ID Válido"
        className="text-slate-600 p-2 rounded-lg border-4 border-indigo-500 bg-indigo-100 w-80"
        onChange={(e) => setOrderId(e.target.value)}
      ></input>
      {ordersId.some((item) => item.id === orderId) ? (
        <Link to={`/checkout/${orderId}`}>
          <Btn className="font-sans font-light text-lg text-slate-50 bg-green-500 p-3 rounded-md m-3 hover:bg-green-700 transition-all w-48 shadow-md">
            Verificar Orden
          </Btn>
        </Link>
      ) : (
        <Btn className="font-sans font-light text-lg text-slate-50 bg-red-500 p-3 rounded-md m-3 hover:bg-red-700 transition-all w-48 shadow-md disabled:">
          Order ID Inválido
        </Btn>
      )}
    </div>
  );
};

export default OrderCheck;

// aca con ternario con orderID y un SOME
