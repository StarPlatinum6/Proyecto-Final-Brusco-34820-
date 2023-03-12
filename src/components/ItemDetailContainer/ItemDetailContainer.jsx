import ItemDetail from "../ItemDetail/ItemDetail";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { BookmarksContext } from "../../context/BookmarksContext";

import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { IconButton } from "@material-tailwind/react";
import { BookmarkIcon } from "../Bookmarks/BookmarkIcons";
import { BookmarkFillIcon } from "../Bookmarks/BookmarkIcons";

import ItemCount from "../ItemCount/ItemCount";
import Btn from "../Btn/Btn";
import Loading from "../Loading/Loading";
import ErrorState from "../ErrorState/ErrorState";

const ItemDetailContainer = () => {
  const [part, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [partsId, setPartsId] = useState([]);
  const [errorState, setErrorState] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addBookmark, isInBookmarks, deleteBookmark } =
    useContext(BookmarksContext);

  const isAdded = isInBookmarks(part.id);

  let { productId } = useParams();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const collectionPc = doc(db, "pcParts", productId);
    const collectionsPc = collection(db, "pcParts");

    getDocs(collectionsPc)
      .then((response) => {
        const partsId = response.docs.map((doc) => {
          return { id: doc.id };
        });
        setPartsId(partsId);
      })
      .catch(() => {
        setErrorState(true)
      });

    getDoc(collectionPc)
      .then((response) => {
        const data = response.data();
        const partsAdapted = { id: response.id, ...data };
        setParts(partsAdapted);
      })
      .catch(() => {
        setErrorState(true)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  const handleOnAdd = (quantity, stockProd, setStock) => {
    deleteBookmark(part.id);
    const unit = quantity <= 1 && quantity !== 0 ? "unidad" : "unidades";
    const unit2 =
      stockProd - quantity <= 1 && stockProd - quantity !== 0
        ? "unidad"
        : "unidades";
    const unit3 = stockProd <= 1 && stockProd !== 0 ? "unidad" : "unidades";
    if (quantity <= stockProd) {
      setStock((stockProd) => (stockProd -= quantity));
      if (quantity === 0) {
        MySwal.fire({
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg",
          },
          background: "#F1F5F9",
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
            confirmButton:
              "bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg",
          },
          background: "#F1F5F9",
          icon: "success",
          title: "¡Productos agregados con éxito!",
          text: `Agregaste ${quantity} ${unit} al carrito. Stock restante: ${
            stockProd - quantity
          } ${unit2}.`,
          confirmButtonText: "¡Entendido!",
        });
        setCartEmpty(false);
        addToCart(part, quantity);
      }
    } else {
      MySwal.fire({
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md shadow-indigo-700 text-slate-50 text-lg",
        },
        background: "#F1F5F9",
        icon: "error",
        title: "Tuvimos un problema...",
        text: `Intentaste agregar ${quantity} ${unit} al carrito. Pero nuestro stock restante es de ${stockProd} ${unit3}.`,
        footer: "¡Disculpa las molestias!",
        confirmButtonText: "Grrr...",
      });
    }
  };

  const userCheckForBuying = () => {
    if (user) {
      return (
        <>
          {cartEmpty ? (
            <ItemCount initial={1} stock={part.stock} onAdd={handleOnAdd} />
          ) : (
            <>
              <Link to={`/`}>
                <Btn className="font-sans font-light text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-36 md:w-36 lg:w-40 shadow-md">
                  Seguir comprando
                </Btn>
              </Link>
              <Link to={`/cart`}>
                <Btn className="font-sans font-light text-lg text-slate-50 bg-indigo-600 p-2 rounded-md m-3 py-2 hover:bg-indigo-700 transition-all w-36 md:w-36 lg:w-40 shadow-md">
                  Dirigirse al carrito
                </Btn>
              </Link>
            </>
          )}
        </>
      );
    } else {
      return (
        <h1 className="p-2 md:p-4 lg:p-8 font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-extralight leading-normal text-indigo-50 uppercase">
          Debes loguearte para comprar
        </h1>
      );
    }
  };

  const userCheckForBookmark = () => {
    if (user) {
      return (
        <>
          <span className="absolute -left-3 -top-2">
            <IconButton
              variant="outlined"
              size="sm"
              className="bg-indigo-400/90 shadow-sm shadow-slate-50 transition-all flex items-center justify-center"
              onClick={() => {
                isAdded ? deleteBookmark(part.id) : addBookmark(part);
              }}
            >
              {isAdded ? (
                <BookmarkFillIcon className="h-5 w-5 text-indigo-50" />
              ) : (
                <BookmarkIcon className="h-5 w-5 text-indigo-50" />
              )}
            </IconButton>
          </span>
        </>
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errorState) {
    return <ErrorState />;
  }

  return (
    <>
      <div className="tracking-widest bg-slate-50 p-16 mx-auto max-w-screen-lg flex justify-center">
        <ItemDetail
          userCheckForBookmark={userCheckForBookmark}
          userCheckForBuying={userCheckForBuying}
          partsId={partsId}
          part={part}
          productId={productId}
        />
      </div>
    </>
  );
};

export default ItemDetailContainer;
