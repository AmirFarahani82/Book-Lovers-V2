"use client";
import { useState } from "react";
import Button from "./Button";

function CartCheckout({ price }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed top-1/5 hidden min-h-[140px] w-[250px] flex-col items-center gap-5 rounded-xl bg-neutral-200 px-2.5 shadow-md shadow-stone-600 sm:right-[60%] sm:flex md:w-[300px] lg:right-[70%] ${isExpanded ? "pb-3" : ""}`}
    >
      <p className="pt-3">جمع هزینه سبد خرید {price.toLocaleString("fa-ir")}</p>
      {isExpanded ? (
        <form className="flex flex-col">
          <label htmlFor="address">آدرس:</label>
          <textarea
            className="rounded-lg bg-neutral-50 px-2 py-1 text-sm ring-fuchsia-600 focus:ring-1 focus:outline-none"
            name="address"
            id=""
          ></textarea>

          <label htmlFor="phone">شماره تماس:</label>
          <input
            type="tel"
            name="phone"
            id=""
            className="rounded-lg bg-neutral-50 px-2 py-1 ring-fuchsia-600 focus:ring-1 focus:outline-none"
          />
        </form>
      ) : null}
      <Button onClick={() => setIsExpanded(true)}>تکمیل خرید</Button>
    </div>
  );
}

export default CartCheckout;
