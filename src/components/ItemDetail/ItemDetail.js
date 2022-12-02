import { getPartById } from "../../data/pcParts";
import { useEffect, useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const [part, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let {productId} = useParams();
  const prodId = parseInt(productId);

  const handleOnAdd = (quantity, stockProd, setStock) => {
    if (quantity <= stockProd) {
      setStock((stockProd) => (stockProd -= quantity));
    } else {
      alert(
        "La cantidad que se pretende ingresar: " +
          quantity +
          " Es mayor al stock disponible: " +
          stockProd
      );
    }
  };

  useEffect(() => {
    getPartById(prodId)
      .then((response) => {
        setParts(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [prodId]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="flex p-1 font-sans">
      <div
        key={part.id}
        className={
          "bg-indigo-300 rounded-md p-2 flex flex-col items-center xl:flex-row"
        }
      >
        <h1
          className={"text-sm bg-indigo-100 p-2 rounded-md mb-5 w-max-content"}
        >
          {part.title}
        </h1>
        <h3 className={"text-xs text-justify bg-indigo-200 p-2 rounded-md"}>
          {part.description}
        </h3>
        <img
          src={part.pictureUrl}
          alt=""
          className={"rounded-xl w-36 mt-3 flex"}
        />
        <h2 className={"text-sm bg-indigo-200 p-2 rounded-md w-max m-auto"}>
          $ {part.price}
        </h2>
        <ItemCount initial={1} stock={10} onAdd={handleOnAdd} />
      </div>
    </div>
  );
};

export default ItemDetail;
