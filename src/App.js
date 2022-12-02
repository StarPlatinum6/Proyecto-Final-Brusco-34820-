import React from "react";
// import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const [show, setShow] = useState(true);

  // <button onClick={() => setShow(!show)}>Show/Hide</button>
  // { show ? <ItemListContainer/> : null }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Lista de Productos" />}
          />
          <Route 
            path="/category/:categoryId"
            element={<ItemListContainer />}
          />
          <Route
            path="/product/:productId"
            element={<ItemDetailContainer />}
          />
        </Routes>
      </BrowserRouter>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
