import { getParts } from "../../data/pcParts";
import { useState, useEffect } from "react";
import Item from "../Item/Item";

const ItemList = () => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    getParts()
      .then((response) => {
        setParts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   setTimeout(() => { a }
  //   , 2000) Ver por qué mierda no anda

  return (
    <div className="grid grid-cols-3 gap-2 p-1 font-sans">
      {parts.map((part) => (
        <Item key={part.id} part={part}/>
      ))}
    </div>
  );
};

export default ItemList;
