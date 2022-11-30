import React from "react";
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemCount from "./components/ItemCount/ItemCount";

function App() {
  // const [show, setShow] = useState(true);

  const handleOnAdd = (quantity, stockProd, setStock) => {
    if (quantity <= stockProd) {
      setStock((stockProd) => (stockProd -= quantity));
    } else {
      alert(
        "La cantidad que se pretende ingresar: " +
          quantity +
          " Es mayor al stock disponible: " +
          stockProd
      );
    }
  };

  // <button onClick={() => setShow(!show)}>Show/Hide</button>
  // { show ? <ItemListContainer/> : null }

  return (
    <div className="App">
      <NavBar />
      <ItemListContainer greeting="Lista de Productos" />
      <ItemCount initial={1} stock={10} onAdd={handleOnAdd} />
    </div>
  );
}

export default App;
