// src/context/CartContext.js

import { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext(null);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (character) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === character.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === character.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...character, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addOneToCart = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCart([]); // Vaciar el carrito
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, addOneToCart, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
};
