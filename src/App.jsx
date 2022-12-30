import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import Checkout from "./components/Checkout/Checkout";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import UserOrdersList from "./components/UserOrdersList/UserOrdersList";
import Bookmarks from "./components/Bookmarks/Bookmarks"

import { BookmarksProvider } from "./context/BookmarksContext";
import { CartContextProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App bg-slate-50 h-max">
      <BrowserRouter>
        <CartContextProvider>
          <AuthProvider>
            <BookmarksProvider>
              <NavBar />
              <Routes>
                <Route
                  path="/"
                  element={<ItemListContainer greeting="LISTA DE PRODUCTOS" />}
                />
                <Route
                  path="/category/:categoryId"
                  element={<ItemListContainer />}
                />
                <Route
                  path="/product/:productId"
                  element={<ItemDetailContainer />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:orderId" element={<OrderStatus />} />
                <Route path="/userorders" element={<UserOrdersList />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
              </Routes>
              <Footer />
            </BookmarksProvider>
          </AuthProvider>
        </CartContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
