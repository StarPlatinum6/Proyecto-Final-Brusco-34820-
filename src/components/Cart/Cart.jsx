import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import CartForm from "../CartForm/CartForm";
import Btn from "../Btn/Btn";

import {
  doc,
  setDoc,
  updateDoc,
  increment,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

const Cart = () => {
  const { cart, clearList, isCartEmpty, total, removeItem } =
    useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState("");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const showCartForm = () => {
    return new Promise((resolve) => {
      MySwal.fire({
        title: "Datos para la compra",
        icon: "question",
        html: (
          <CartForm
            onSubmit={(data) => {
              resolve(data);
            }}
            onClose={() => Swal.close()}
          />
        ),
        showConfirmButton: false,
      });
    });
  };

  const handleBuy = () => {
    showCartForm()
      .then((data) => {
        sendOrder(data);
      })
      .catch((er) => console.log(er));
  };

  const sendOrder = async (data) => {
    const itemsDb = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      pictureUrl: item.pictureUrl,
    }));

    const order = {
      buyer: data,
      items: itemsDb,
      total: total,
      date: serverTimestamp(),
    };

    const ordersCollectionRef = doc(collection(db, "orders"));
    setOrderId(ordersCollectionRef.id);

    await setDoc(ordersCollectionRef, order);

    clearList();

    itemsDb.map(async (item) => {
      const itemRef = doc(db, "pcParts", item.id);
      await updateDoc(itemRef, {
        stock: increment(-item.quantity),
      });
    });

    if (ordersCollectionRef.id) afterBuy(ordersCollectionRef.id);
  };

  const afterBuy = (orderId) => {
    MySwal.fire({
      title: "Compra exitosa!",
      text: `Número de órden: ${orderId}`,
      icon: "success",
      footer: "A continuación podrá dirigirse al detalle de su orden.",
      showConfirmButton: false,
    });
  };

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

  if (isCartEmpty) {
    return (
      <div className="m-16">
        <h1 className="mt-8 pb-8 text-5xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Carrito vacío
        </h1>
        <Link to={`/`}>
          <Btn className="font-sans font-light text-xl text-slate-50 bg-indigo-500 p-3 rounded-md m-3 hover:bg-indigo-700 transition-all w-48 shadow-md">
            Volver a la tienda
          </Btn>
        </Link>
        {orderId ? (
          <Link to={`/checkout/${orderId}`}>
            <Btn className="font-sans font-light text-xl text-slate-50 bg-indigo-500 p-3 rounded-md m-3 hover:bg-indigo-700 transition-all w-48 shadow-md">
              Ir a información de la orden
            </Btn>
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <>
        <h1 className="my-10 text-2xl md:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Carrito de Compra
        </h1>
        {cart.map((item) => (
          <div
            key={item.id}
            className={
              "flex px-4 md:px-8 lg:px-16 py-6 my-6 justify-between items-center bg-slate-100"
            }
          >
            <img
              src={item.pictureUrl}
              alt=""
              className="rounded-xl max-h-20 w-28 shadow-lg mr-2 shadow-slate-100/80 ring-2 ring-slate-700/50"
            />
            <p className="text-sm lg:text-lg w-60 md:w-96 text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
              {item.category} {item.title}
            </p>
            <div className="flex flex-col items-center sm:flex-row">
              <p className="sm:text-base md:text-lg lg:text-xl w-max-content text-slate-500 font-medium tracking-wide h-12 w-40 flex justify-center items-center">
                $ {item.price} / {item.quantity} Un.
              </p>
              <p className="w-max-content md:text-xl lg:text-3xl text-slate-700 font-medium tracking-wide h-12 flex justify-center items-center w-24 lg:w-32">
                $ {item.price * item.quantity}
              </p>
            </div>
            <Btn
              className="text-md w-max-content lg:text-3xl text-red-700 bg-red-400/20 hover:bg-red-400/60 transition-all rounded-md px-2 py-1 lg:p-3 font-medium tracking-wide lg:h-12 flex justify-center items-center"
              fn={() => removeItem(item.id)}
            >
              X
            </Btn>
          </div>
        ))}
      </>
      <div className="sm:text-xl md:text-2xl lg:text-3xl p-6">
        <div className="flex justify-around">
          <Btn
            className="m-3 p-3 border text-red-700 bg-red-400/20 hover:bg-red-400/60 transition-all rounded-lg font-serif"
            fn={clearList}
          >
            Vaciar Carrito
          </Btn>
          <Link to={`/`}>
            <Btn className="m-3 p-3 border text-indigo-700 bg-indigo-400/20 hover:bg-indigo-400/60 transition-all rounded-lg font-serif">
              Volver a la Tienda
            </Btn>
          </Link>
          <Btn
            className="m-3 p-3 border text-green-700 bg-green-400/20 hover:bg-green-400/60 transition-all rounded-lg font-serif"
            fn={handleBuy}
          >
            Finalizar Compra
          </Btn>
        </div>
        <p className="mt-8 pb-8 text-2xl md:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Total de la compra: $ {total}
        </p>
      </div>
    </>
  );
};

export default Cart;
