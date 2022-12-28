import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Btn from "../Btn/Btn";
import Loading from "../Loading/Loading";

const Cart = () => {
  const { cart, clearList, isCartEmpty, total, removeItem } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-12 pb-6">
        <Loading />
      </div>
    );
  }

  if (isCartEmpty) {
    return (
      <div className="m-16">
        <h1 className="mt-8 pb-8 text-4xl md:text-5xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Carrito vacío
        </h1>
        <Link to={`/`}>
          <Btn className="font-sans font-light text-lg text-slate-50 bg-indigo-500 p-3 rounded-md m-3 hover:bg-indigo-700 transition-all w-48 shadow-md">
            Volver a la tienda
          </Btn>
        </Link>
      </div>
    );
  }

  return (
    <>
      <>
        <h1 className="my-10 text-2xl md:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Carrito de Compra
        </h1>
        <h2 className="-mt-4 text-base md:text-lg font-thin tracking-wider text-slate-500 font-serif uppercase">
          Comprando como: {user.email}
        </h2>
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
              className="rounded-xl max-h-28 w-28 shadow-lg mr-2 shadow-slate-100/80 ring-2 ring-slate-700/50"
            />
            <p className="text-sm lg:text-lg w-60 md:w-96 text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
              {item.category} {item.title}
            </p>
            <div className="flex flex-col items-center sm:flex-row">
              <p className="sm:text-base md:text-lg w-max-content text-slate-500 font-medium tracking-wide h-12 w-40 flex justify-center items-center">
                $ {item.price} / {item.quantity} Un.
              </p>
              <p className="w-max-content md:text-xl lg:text-2xl text-slate-700 font-medium tracking-wide h-12 flex justify-center items-center w-24 lg:w-32">
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
          <Link to={`/checkout`}>
            <Btn className="m-3 p-3 border text-green-700 bg-green-400/20 hover:bg-green-400/60 transition-all rounded-lg font-serif">
              Finalizar Compra
            </Btn>
          </Link>
        </div>
        <p className="mt-8 pb-8 text-2xl md:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Total de la compra: $ {total}
        </p>
      </div>
    </>
  );
};

export default Cart;
