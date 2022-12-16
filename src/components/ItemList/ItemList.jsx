import { useState, useEffect } from "react";
import Item from "../Item/Item";
import { useParams } from "react-router-dom";

import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

const ItemList = () => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const collectionPc = categoryId
      ? query(collection(db, "pcParts"), where("category", "==", categoryId))
      : collection(db, "pcParts");

    getDocs(collectionPc)
      .then((response) => {
        const partsAdapted = response.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setParts(partsAdapted);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

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
    <>
      <h1 className="-my-4 pb-8 text-5xl font-thin tracking-wider text-slate-500 font-serif">
        {categoryId}
      </h1>
      <div className="grid grid-cols-3 gap-12 p-8 font-sans">
        {parts.map((part) => (
          <Item key={part.id} part={part} />
        ))}
      </div>
    </>
  );
};

export default ItemList;
