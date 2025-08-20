"use client";

import toast from "react-hot-toast";
import { addToCart } from "../_lib/actions";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { useCart } from "./CartContext";

function AddToCartButton({ children, buttonRef, bookId, bookName, user }) {
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();
  const handleAddToCart = async () => {
    if (!user) return toast.error("ابتدا وارد حساب کاربری خود شوید");

    const toastId = toast.loading("در حال افزودن به سبد خرید...");
    setLoading(true);

    try {
      const result = await addToCart(bookId);
      if (result && result.success) {
        addItem(bookId);
        toast.success(`کتاب ${bookName} به سبد خرید اضافه شد`, { id: toastId });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleAddToCart}
      disabled={loading}
      className="rounded-md bg-purple-500 px-2 py-1.5 text-[10px] text-white transition-all duration-400 hover:-translate-y-1 hover:scale-105 hover:bg-purple-600 active:translate-y-0 active:scale-97 md:rounded-xl md:px-4 md:py-2.5 md:text-lg"
    >
      {loading ? <SpinnerMini /> : children}
    </button>
  );
}

export default AddToCartButton;
