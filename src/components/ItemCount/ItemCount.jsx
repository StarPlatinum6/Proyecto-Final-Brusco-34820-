import { useState } from "react";

import Btn from "../Btn/Btn";

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
      <div className="w-64 flex items-center justify-center">
        <span className="w-24 text-2xl h-20 flex items-center justify-center">
          {count}
        </span>
        <div className="flex flex-col">
          <Btn
            fn={() => increment()}
            className="px-2 py-1 font-light hover:bg-indigo-700 transition-all text-2xl rounded-xl"
          >
            +
          </Btn>

          <Btn
            fn={() => decrement()}
            className="px-2 py-1 font-light hover:bg-indigo-700 transition-all text-2xl rounded-xl"
          >
            -
          </Btn>
        </div>
      </div>
      <div className="w-64">
        <Btn
          fn={() => onAdd(count, stockProd, setStock)}
          className="bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40 shadow-md"
        >
          Agregar al carrito
        </Btn>
        <Btn
          fn={() => reset()}
          className="bg-indigo-600 p-2 rounded-md m-1 font-light hover:bg-indigo-700 transition-all w-40"
        >
          Resetear
        </Btn>
      </div>
    </div>
  );
};

export default ItemCount;
