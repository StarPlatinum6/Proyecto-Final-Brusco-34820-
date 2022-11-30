import React from "react";
// import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  // const [show, setShow] = useState(true);

  // <button onClick={() => setShow(!show)}>Show/Hide</button>
  // { show ? <ItemListContainer/> : null }

  return (
    <div className="App">
      <NavBar />
      <ItemListContainer greeting="Lista de Productos" />
      <ItemDetailContainer/>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
