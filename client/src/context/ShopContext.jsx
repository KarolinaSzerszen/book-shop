import { createContext, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId, amount, coverId, bookTitle) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      } else {
        return [
          ...prev,
          { id: productId, quantity: amount, cover: coverId, title: bookTitle },
        ];
      }
    });
  }

  function removeFromCart(productId) {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  }

  const contextValue = { cartItems, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
