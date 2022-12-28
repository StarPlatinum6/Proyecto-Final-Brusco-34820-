import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

import Loading from "../Loading/Loading";
import Btn from "../Btn/Btn";
import CartForm from "../CartForm/CartForm";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  writeBatch,
  query,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { cart, clearList, total, isCartEmpty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const goTo = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleBuy = async () => {
    try {
      const data = await showCartForm();
      sendOrder(data);
    } catch (er) {
      console.error(er);
      MySwal.fire({
        title: "Oops...",
        text: `Ha ocurrido un error, por favor, recarga la página y vuelve a intentarlo.`,
        icon: "error",
        showConfirmButton: false,
      });
    } finally {
      MySwal.fire({
        title: "Generando orden...",
        icon: "info",
        footer: "¡No te vayas!",
        showConfirmButton: false,
      });
    }
  };

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

  const sendOrder = async (data) => {
    data.email = user.email;
    try {
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

      const batch = writeBatch(db);

      const cartProductsIds = cart.map((prod) => prod.id);
      const productsRef = query(
        collection(db, "pcParts"),
        where(documentId(), "in", cartProductsIds)
      );
      const cartProductsDB = await getDocs(productsRef);
      const { docs } = cartProductsDB;

      const outOfStock = [];

      docs.forEach((prodDb) => {
        const productData = prodDb.data();
        const stockDb = productData.stock;

        const producInCart = cart.find((prodCart) => prodCart.id === prodDb.id);
        const prodQty = producInCart?.quantity;

        if (stockDb >= prodQty) {
          batch.update(prodDb.ref, { stock: stockDb - prodQty });
        } else {
          outOfStock.push({ id: prodDb.id, ...productData });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();
        const ordersCollectionRef = doc(collection(db, "orders"));
        await setDoc(ordersCollectionRef, order);
        clearList();
        if (ordersCollectionRef.id) afterBuy(ordersCollectionRef.id);
      } else {
        MySwal.fire({
          title: "¡Auch!",
          text: `Nos quedamos sin la cantidad deseada mientras finalizabas la compra!`,
          icon: "error",
          footer: "Por favor, actualizá la página para ver el stock actual.",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: "Oops...",
        text: `Ha ocurrido un error, por favor, recarga la página y vuelve a intentarlo.`,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const afterBuy = (orderId) => {
    MySwal.fire({
      title: "¡Compra exitosa!",
      text: `Número de órden: ${orderId}`,
      icon: "success",
      footer: "A continuación serás dirigido al detalle de la orden.",
      showConfirmButton: false,
    });

    setTimeout(() => {
      Swal.close();
      goTo(`/order/${orderId}`);
    }, 5000);
  };

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
        <h1 className="mt-8 pb-8 text-3xl md:text-4xl lg:text-5xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          No hay una orden cargada
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
      <div className="flex justify-center relative">
        <h1 className="my-10 text-2xl md:text-4xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Resumen de la orden
        </h1>
      </div>
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
            className="rounded-xl max-h-20 w-20 lg:max-h-28 lg:w-28 shadow-lg ml-8 lg:ml-0 shadow-slate-100/80 ring-2 ring-slate-700/50"
          />
          <p className="lg:text-lg w-60 md:w-96 text-slate-500 font-medium tracking-wide h-12 flex justify-center items-center">
            {item.title}
          </p>
          <div className="flex flex-col items-center sm:flex-row">
            <p className="sm:text-base md:text-lg lg:text-xl w-max-content text-slate-500 font-medium tracking-wide h-12 w-40 flex justify-center items-center">
              $ {item.price} / {item.quantity} Un.
            </p>
            <p className="w-max-content md:text-xl lg:text-3xl text-slate-700 font-medium tracking-wide h-12 flex justify-center items-center w-24 lg:w-32">
              $ {item.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
      <div className="flex justify-around p-6">
        <p className="p-3 text-xl md:text-2xl lg:text-3xl font-thin tracking-wider text-slate-500 font-serif uppercase">
          Total de la compra: $ {total}
        </p>
        <Btn
          className="p-3 text-xl md:text-2xl lg:text-3xl font-thin tracking-tighter text-slate-600 font-serif bg-green-400/80 hover:bg-green-500/80 transition-all rounded-lg px-4"
          fn={handleBuy}
        >
          Confirmar Orden
        </Btn>
      </div>
    </>
  );
};

export default Checkout;
