import { useState, useEffect } from "react";
import { getProductById } from "../services/firestore/products";

const useGetProductById = (productId) => {
  const [part, setParts] = useState([]);
  const [partsId, setPartsId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProductById(productId)
      .then(({ partsId, partsAdapted }) => {
        setPartsId(partsId);
        setParts(partsAdapted);
      })
      .catch(() => {
        setErrorState(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return { part, partsId, isLoading, errorState };
};

export default useGetProductById;
