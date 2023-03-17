import useAsyncFn from "../../hooks/useAsyncFn";
import { getProducts } from "../../services/firebase/firestore/products";

import { useParams } from "react-router-dom";

import Loading from "../Loading/Loading";
import ItemList from "../ItemList/ItemList";
import ErrorState from "../ErrorState/ErrorState";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const getProductsWithCategory = () => getProducts(categoryId);

  const { data: parts, loading: isLoading, error: errorState } = useAsyncFn(getProductsWithCategory, [categoryId]);

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
