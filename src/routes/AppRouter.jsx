import { Routes, Route, Navigate } from "react-router-dom";

import { useContext } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import { AuthContext } from "../context/AuthContext";

import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";
import Cart from "../components/Cart/Cart";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Checkout from "../components/Checkout/Checkout";
import OrderStatus from "../components/OrderStatus/OrderStatus";
import UserOrdersList from "../components/UserOrdersList/UserOrdersList";
import Bookmarks from "../components/Bookmarks/Bookmarks";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<ItemListContainer greeting="PRODUCTOS" />} />
      <Route path="/category/:categoryId" element={<ItemListContainer />} />
      <Route path="/product/:productId" element={<ItemDetailContainer />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order/:orderId" element={<OrderStatus />} />

      <Route element={<PublicRoute user={user} redirectPath="/userorders" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/userorders" element={<UserOrdersList />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
