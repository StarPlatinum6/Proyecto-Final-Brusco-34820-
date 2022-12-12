import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);
  const [stockProd, setStock] = useState(stock);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(initial);
    setStock(stock);
  };

  return (
    <div className="font-sans flex text-slate-50">
      {/* <h3 className="text-slate-800">
        Productos en el carrito: {stock - stockProd}
      </h3> */}
      <div className="w-64 flex items-center justify-center">
        <span className="w-24 text-2xl h-20 flex items-center justify-center">{count}</span>

        <div className="flex flex-col">
          <button
            onClick={() => increment()}
            className="px-2 py-1 font-light hover:bg-indigo-700 transition-all text-2xl rounded-xl"
          >
            +
          </button>

          <button
            onClick={() => decrement()}
            className="px-2 py-1 font-light hover:bg-indigo-700 transition-all text-2xl rounded-xl"
          >
            -
          </button>
        </div>
      </div>
      <div className="w-64">
          <button
            onClick={() => onAdd(count, stockProd, setStock)}
            className="bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md"
          >
            Agregar al carrito
          </button>
          <button
            onClick={() => reset()}
            className="bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40"
          >
            Resetear
          </button>
        </div>
    </div>
  );
};

export default ItemCount;
