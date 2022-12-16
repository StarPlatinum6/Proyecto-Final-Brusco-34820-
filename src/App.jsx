import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

import { CartContextProvider } from "./context/CartContext";

function App() {

  return (
    <div className="App bg-slate-50 h-max">
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer greeting="LISTA DE PRODUCTOS" />}
            />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/product/:productId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/:orderId" element={<Checkout />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
