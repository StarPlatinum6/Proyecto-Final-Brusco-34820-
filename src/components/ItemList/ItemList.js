import { getParts, getPartsByCategory } from "../../data/pcParts";
import { useState, useEffect } from "react";
import Item from "../Item/Item";
import { useParams } from "react-router-dom";

const ItemList = () => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    if (!categoryId) {
      getParts()
        .then((response) => {
          setParts(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getPartsByCategory(categoryId)
        .then((response) => {
          setParts(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [categoryId]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-1 font-sans">
      {parts.map((part) => (
        <Item key={part.id} part={part} />
      ))}
    </div>
  );
};

export default ItemList;
