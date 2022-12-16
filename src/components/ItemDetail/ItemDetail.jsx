import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import ItemCount from "../ItemCount/ItemCount";
import Btn from "../Btn/Btn";

import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

import { getDoc, doc} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

const ItemDetail = () => {
  const [part, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartEmpty, setCartEmpty] = useState(true);

  const { addToCart } = useContext(CartContext)

  let { productId } = useParams();


  useEffect(() => {
    const collectionPc = doc(db, "pcParts", productId);

    getDoc(collectionPc)
      .then((response) => {
        const data = response.data();
        const partsAdapted = { id: response.id, ...data };
        setParts(partsAdapted);
      })
      .finally(() => {
        setIsLoading(false);
      })
}, [productId]);


  const MySwal = withReactContent(Swal);

  const handleOnAdd = (quantity, stockProd, setStock) => {
    const unit = (((quantity) <= 1) && ((quantity) !== 0))
      ? 'unidad'
      : 'unidades';
    const unit2 = (((stockProd - quantity) <= 1) && ((stockProd - quantity) !== 0))
      ? 'unidad'
      : 'unidades';
    const unit3 = ((stockProd <= 1) && (stockProd !== 0))
      ? 'unidad'
      : 'unidades';
    if (quantity <= stockProd) {
      setStock((stockProd) => (stockProd -= quantity));
      if (quantity === 0) {
        MySwal.fire({
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg',
          },
          background: '#F1F5F9',
          icon: "error",
          title: "Oops...",
          text: `Intentaste agregar ${quantity} ${unit} al carrito.`,
          footer: "¡No quieras romper mi programa!",
          confirmButtonText: "Grrr...",
        });
      } else {
        MySwal.fire({
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg',
          },
          background: '#F1F5F9',
          icon: "success",
          title: "¡Productos agregados con éxito!",
          text: `Agregaste ${quantity} ${unit} al carrito. Stock restante: ${stockProd - quantity} ${unit2}.`,
          confirmButtonText: "¡Entendido!",
        });
        setCartEmpty(false);
        addToCart(part, quantity);
      }
    } else {
      MySwal.fire({
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg',
        },
        background: '#F1F5F9',
        icon: "error",
        title: "Tuvimos un problema...",
        text: `Intentaste agregar ${quantity} ${unit} al carrito. Pero nuestro stock restante es de ${stockProd} ${unit3}.`,
        footer: "¡Disculpa las molestias!",
        confirmButtonText: "Grrr...",
      });
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center my-6 p-8 text-4xl text-slate-100 bg-slate-500 drop-shadow-xl rounded-lg animate-pulse items-center w-96 tracking-widest font-serif">
        <h1>CARGANDO...</h1>
        <img
          className="animate-spin ml-4 h-8 w-8 opacity-90 invert"
          alt=""
          src="https://www.svgrepo.com/show/315795/spinner.svg"
        />
      </div>
    );
  }
  

  return (
    <div className="flex p-1 font-sans justify-center">
      <div
        key={part.id}
        className={"bg-indigo-900/90 rounded-lg p-5 flex flex-row items-center shadow-xl shadow-indigo-900/70 transition-all border-2 border-opacity-80 border-white justify-between gap-16"}
      >
        <div className="flex flex-col p-8 w-80 items-center">
          <img
            src={part.pictureUrl}
            alt=""
            className={"rounded-xl mt-3 max-h-80 w-80 mb-6 -mr-10 scale-125 shadow-lg shadow-slate-100/80 ring-8 ring-indigo-500/50"}
          />
        </div>
        <div className="w-96">
          <h1
            className={"text-md p-2 pb-2 w-max-content text-lg text-indigo-50 font-medium tracking-wide h-12 flex justify-center items-center"}
          >
            {part.title}
          </h1>
          <div className="p-4 border-y border-blue-gray-50 my-4 flex flex-col items-center justify-between py-3">
            <p
              className={"antialiased font-sans text-md text-justify font-light leading-normal text-slate-300 flex gap-1 py-1 px-3 rounded-m mt-2"}
            >
              {part.description}
            </p>
            <p className="block antialiased font-sans text-3xl font-extralight leading-normal text-indigo-50 mr-3 mt-2">
              $ {part.price}
            </p>
          </div>
          { cartEmpty 
          ? <ItemCount initial={1} stock={part.stock} onAdd={handleOnAdd} /> 
          : <>
              <Link to={`/`}>
                <Btn className="font-sans font-light text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-40 shadow-md">Seguir comprando</Btn>
              </Link>
              <Link to={`/cart`}>
                <Btn className="font-sans font-light text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-40 shadow-md">Finalizar la compra</Btn>
              </Link>
            </>
           }
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
