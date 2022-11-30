import { getPartByld } from "../../data/pcParts";
import { useEffect, useState } from "react";
import Item from "../Item/Item";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = () => {
  const [part, setParts] = useState([]);

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
    getPartByld(3)
      .then((response) => {
        setParts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex p-1 font-sans">
      <Item key={part.id} part={part} />
      <ItemCount initial={1} stock={10} onAdd={handleOnAdd} />
    </div>
  );
};

export default ItemDetail;
