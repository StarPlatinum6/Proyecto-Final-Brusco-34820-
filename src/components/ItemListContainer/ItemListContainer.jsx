import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/firestore/products";

import Loading from "../Loading/Loading";
import ItemList from "../ItemList/ItemList";
import ErrorState from "../ErrorState/ErrorState";

const ItemListContainer = ({ greeting }) => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProducts(categoryId)
      .then((parts) => {
        setParts(parts);
      })
      .catch(() => {
        setErrorState(true);
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
        <ItemList parts={parts} categoryId={categoryId} />
      </div>
    </>
  );
};

export default ItemListContainer;
