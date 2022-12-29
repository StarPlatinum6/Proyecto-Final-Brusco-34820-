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

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderId("");
  };

  return (
    <form>
      <div className="flex items-center justify-center bg-slate-100 md:text-2xl -mt-10 pb-4 px-2">
        <input
          type="text"
          placeholder="Ingrese Order ID para ver estado"
          value={orderId}
          className="text-slate-600 p-2 rounded-lg border-2 border-indigo-500 bg-indigo-100 w-80 text-sm sm:text-xl"
          onChange={(e) => setOrderId(e.target.value)}
        ></input>
        {ordersId.some((item) => item.id === orderId) ? (
          <button
            className="font-sans font-light text-sm sm:text-lg text-slate-50 bg-green-500 py-3 sm:p-3 rounded-md m-3 hover:bg-green-700 transition-all w-32 sm:w-48 shadow-md"
            type="submit"
            onClick={handleSubmit}
          >
            <Link to={`/order/${orderId}`}>Verificar Orden</Link>
          </button>
        ) : (
          <Btn
            className="font-sans font-light text-sm sm:text-lg text-slate-50 bg-red-500 py-3 sm:p-3 rounded-md m-3 hover:bg-red-700 transition-all w-48 shadow-md disabled:"
            type="button"
          >
            Order ID Inválido
          </Btn>
        )}
      </div>
    </form>
  );
};

export default OrderCheck;
