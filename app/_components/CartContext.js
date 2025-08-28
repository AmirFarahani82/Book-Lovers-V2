"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCart, getUser } from "@/app/_lib/actions";
import { createClient } from "@/utils/supabase/client";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadInitialData() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setUser(await getUser());
          const initialCart = await getCart();
          if (initialCart) {
            setCart([...initialCart]);
          } else {
            setCart([]);
          }
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    loadInitialData();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const newCart = await getCart();
          setCart(newCart || []);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setCart([]);
        }
      },
    );
    return () => authListener?.unsubscribe();
  }, [supabase]);

  function addItem(bookId) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((i) => i.bookId === bookId);

      if (existingItem) {
        return currentCart.map((cart) =>
          cart.bookId === bookId
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart,
        );
      }

      return [...currentCart, { bookId, quantity: 1 }];
    });
  }
  function decreaseItem(bookId) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((i) => i.bookId === bookId);

      if (existingItem.quantity > 1) {
        return currentCart.map((cart) =>
          cart.bookId === bookId
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart,
        );
      }

      if (existingItem.quantity === 1) {
        return currentCart.filter((cart) => cart.bookId !== bookId);
      }
    });
  }

  function removeItem(bookId) {
    setCart((currentCart) => currentCart.filter((i) => i.bookId !== bookId));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        decreaseItem,
        removeItem,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
