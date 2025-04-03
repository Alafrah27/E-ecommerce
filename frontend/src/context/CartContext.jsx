import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const localStorageCart = localStorage.getItem("products");
    let parsedProducts = [];
    try {
      parsedProducts = localStorageCart ? JSON.parse(localStorageCart) : [];
    } catch (e) {
      console.error("Failed to parse products from localStorage:", e);
    }
    return Array.isArray(parsedProducts) ? parsedProducts : []; // Ensure it's an array
  });

  const deleteItem = (id) => {
    const updatedCart = products.filter((item) => item.id !== id);
    setProducts(updatedCart);
  };

  const increaseItemQuantity = (id) => {
    const updatedCart = products.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          quantity: ++item.quantity,
          totalPrice: item.price * (item.quantity + 1),
        };
        return updatedItem;
      }
      return item;
    });
    setProducts(updatedCart);
  };

  const decreaseItemQuantity = (id) => {
    const updatedCart = products
      .map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            // Decrease quantity
            const updatedItem = {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.price * (item.quantity - 1),
            };
            return updatedItem;
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);
    setProducts(updatedCart);
  };

  const clearItems = () => setProducts([]);

  const currentQuantity = (id) => {
    const item = products.find((item) => item.id === id);
    return item ? item.quantity : 1;
  };

  const value = {
    products,
    setProducts,
    deleteItem,
    increaseItemQuantity,
    currentQuantity,
    decreaseItemQuantity,
    clearItems,
  };

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const UseCartApi = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartApi must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, UseCartApi };
