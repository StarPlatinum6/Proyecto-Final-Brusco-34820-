import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     console.log("Funcion dentro del effect");
  //     setTimeout(() => {
  //       console.log("Traigo productos");
  //     }, 2000);
  //     return () => console.log("el componente se va a desmontar");
  //   }, []);

  //   useEffect(() => {
  //     console.log("cambio count");
  //     return () => console.log("antes de cambiar el count");
  //   }, [count]);

  return (
    <>
      <div className="tracking-widest bg-zinc-300 p-2 mx-auto">
        <h1>{greeting}</h1>
        <ItemList/>
      </div>
    </>
  );
};

export default ItemListContainer;
