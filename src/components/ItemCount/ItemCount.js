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
    <div className="bg-slate-400 containerfont-sans">
      <h1 className="p-2 tracking-wider text-slate-800">Contador de Items</h1>
      <h3 className="text-slate-800">
        Productos en el carrito: {stock - stockProd}
      </h3>
      <div>
        <button
          onClick={() => increment()}
          className="bg-slate-300 px-2 py-1 rounded-md m-2 font-light hover:bg-slate-500 transition-all text-xs"
        >
          Sumar
        </button>
        <input
          value={count}
          className="text-center w-10 text-sm rounded-md bg-slate-400"
        ></input>
        <button
          onClick={() => decrement()}
          className="bg-slate-300 px-2 py-1 rounded-md m-2 font-light hover:bg-slate-500 transition-all text-xs"
        >
          Restar
        </button>
      </div>

      <button
        onClick={() => onAdd(count, stockProd, setStock)}
        className="bg-slate-300 px-2 py-1 rounded-md m-2 font-light hover:bg-slate-500 transition-all text-xs"
      >
        Agregar al carrito
      </button>
      <button
        onClick={() => reset()}
        className="bg-slate-300 px-2 py-1 rounded-md m-2 font-light hover:bg-slate-500 transition-all text-xs"
      >
        Resetear
      </button>
      <div className="flex justify-center">
        <h4 className="p-2 text-slate-800">Stock inicial: {stock}</h4>
        <h4 className="p-2 text-slate-800">Stock disponible: {stockProd}</h4>
      </div>
    </div>
  );
};

export default ItemCount;
