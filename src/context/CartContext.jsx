import { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

const localCart = JSON.parse(localStorage.getItem('cart') || '[]')

export const CartContextProvider = ({ children }) => {
    
  const [cart, setCart] = useState(localCart);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length > 0) {
      setIsCartEmpty(false)
    }
  }, [cart]);

  const addToCart = (itemToAdd, quantity) => {

    itemToAdd.quantity = quantity;
    itemToAdd.total = quantity * itemToAdd.price;

    if (!isInCart(itemToAdd.id)) {
      setCart([...cart, itemToAdd]);
      setIsCartEmpty(false)
    } else {
      const itemToUpdate = cart.findIndex((obj => obj.id === itemToAdd.id));
      cart[itemToUpdate].quantity = itemToAdd.quantity;
      cart[itemToUpdate].total = itemToAdd.total;
      setTotal(cart.reduce((acc, currentValue) => acc + currentValue.total, 0))
    }
  };

  const totalCart = cart.reduce((acc, currentValue) => acc + currentValue.total, 0);
  const totalQty = cart.reduce((acc, currentValue) => acc + currentValue.quantity, 0);

  useEffect(() => {
    setCart(cart);
  }, [cart]);

  useEffect(() => {
    setTotal(totalCart)
  }, [totalCart]);

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      setIsCartEmpty(true)
    }
  };

  const clearList = () => {
    setCart([]);
    setIsCartEmpty(true)
    setTotal([]);
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeItem, clearList, isCartEmpty, total, totalQty}}>
        {children}
    </CartContext.Provider>
  )
};
