import { useState, useEffect } from "react";
import Item from "../Item/Item";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

const ItemList = () => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const collectionPc = categoryId
      ? query(
          collection(db, "pcParts"),
          where("category", "==", categoryId),
          orderBy("price", "asc")
        )
      : query(
          collection(db, "pcParts"),
          orderBy("category"),
          orderBy("price", "asc")
        );

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
    return <Loading />;
  }

  return (
    <>
      <h1 className="-my-4 pb-8 text-5xl font-thin tracking-wider text-slate-500 font-serif">
        {categoryId}
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 p-8 font-sans">
        {parts.map((part) => (
          <Item key={part.id} part={part} />
        ))}
      </div>
    </>
  );
};

export default ItemList;
