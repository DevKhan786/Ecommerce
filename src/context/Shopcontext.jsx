import React, { createContext, useState } from "react";
import { ProductList } from "../components/ProductList";

export const ShopContext = createContext();

const getDefaultCart = () => {
  const cart = {};
  ProductList.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  return (
    <ShopContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShopContext.Provider>
  );
};
