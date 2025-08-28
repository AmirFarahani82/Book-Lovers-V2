"use client";

import toast from "react-hot-toast";
import { addToCart, decrease } from "../_lib/actions";
import { useCart } from "./CartContext";
import { useState } from "react";

function CartOperations({ plusRef, minusRef, bookId, bookName }) {
  const [isLoading, setIsLoading] = useState(false);

  const btnStyles =
    "flex items-center justify-center rounded-full cursor-pointer bg-purple-500 size-6 text-white transition-all duration-400  hover:scale-110 hover:bg-purple-600 active:translate-y-0 active:scale-97";

  const { cart, addItem, decreaseItem } = useCart();

  const handleAddItem = async () => {
    const toastId = toast.loading("در حال افزودن به سبد خرید...");
    setIsLoading(true);
    try {
      const result = await addToCart(bookId);
      if (result && result.success) {
        addItem(bookId);
        toast.success(`کتاب ${bookName} به سبد خرید اضافه شد`, { id: toastId });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleremoveItem = async () => {
    const toastId = toast.loading("درحال حذف کردن از سبد خرید...");
    setIsLoading(true);
    try {
      const result = await decrease(bookId);
      if (result && result.success) {
        decreaseItem(bookId);
        toast.success(`کتاب ${bookName} از سبد خرید حذف شد`, { id: toastId });
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <button
        disabled={isLoading}
        ref={plusRef}
        className={btnStyles}
        onClick={handleAddItem}
      >
        +
      </button>
      {cart
        .filter((c) => c.bookId === bookId)
        .map((c) => (
          <span key={c.bookId}>{c.quantity.toLocaleString("fa-ir")}</span>
        ))}
      <button
        disabled={isLoading}
        ref={minusRef}
        className={btnStyles}
        onClick={handleremoveItem}
      >
        &minus;
      </button>
    </div>
  );
}

export default CartOperations;
