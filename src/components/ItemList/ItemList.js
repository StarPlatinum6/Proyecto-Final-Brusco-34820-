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
      setIsLoading(true);
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
      setIsLoading(true);
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
    return (
      <div className="flex justify-center my-6 p-8 text-4xl text-slate-100 bg-slate-500 drop-shadow-xl rounded-lg animate-pulse items-center w-96 tracking-widest font-serif">
        <h1>CARGANDO...</h1>
        <img className="animate-spin ml-4 h-8 w-8 opacity-90" alt="" src="/images/spinner.svg"/>
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
