import { useState, useEffect } from "react";
// import Item from "../Item/Item";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

import ItemList from "../ItemList/ItemList";
import ErrorState from "../ErrorState/ErrorState";

const ItemListContainer = ({ greeting }) => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

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
      .catch(() => {
        setErrorState(true)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading) {
    return <Loading />;
  }

  if (errorState) {
    return <ErrorState />;
  }


  return (
    <>
      <div className="tracking-widest p-5 flex justify-center flex-col items-center">
        <h1 className="p-4 text-4xl font-thin tracking-widest font-serif text-slate-500">
          {greeting}
        </h1>
        <ItemList parts={parts} categoryId={categoryId}/>
      </div>
    </>
  );
};

export default ItemListContainer;
