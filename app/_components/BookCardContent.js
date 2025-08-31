"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import Button from "./Button";
import AddToCartButton from "./AddToCartButton";
import { useCart } from "./CartContext";
import CartOperations from "./CartOperations";

function BookCardContent({ book, currentUser, cart }) {
  const [flip, setFlip] = useState(false);
  const frontButtonRef = useRef(null);
  const backButtonRef = useRef(null);
  const plusRef = useRef(null);
  const minusRef = useRef(null);

  // const { cart } = useCart();

  const isInCart = cart.some((item) => book.id === item.bookId);

  function handleFlip(e) {
    if (
      e.target === frontButtonRef.current ||
      e.target === backButtonRef.current ||
      e.target === plusRef.current ||
      e.target === minusRef.current
    )
      return;
    setFlip((f) => !f);
  }
  let timer;
  function autoFlip() {
    timer = setTimeout(() => {
      setFlip(false);
    }, 5000);
  }

  return (
    <div
      key={book.id}
      onMouseLeave={autoFlip}
      onMouseEnter={() => clearTimeout(timer)}
      onClick={handleFlip}
      className={
        "ease relative flex h-[300px] w-[160px] cursor-pointer flex-col items-center rounded-xl bg-white px-2 py-3 shadow-[0px_5px_6px] shadow-stone-400 transition-all duration-700 transform-3d hover:-translate-y-2 hover:scale-102 hover:shadow-[0px_8px_16px] sm:w-[180px] md:h-[450px] md:w-[240px] lg:w-[280px] lg:py-4 " +
        (flip ? "rotate-y-180" : "")
      }
    >
      <div className="absolute z-2 flex h-full w-full flex-col items-center backface-hidden">
        <div className="flex h-[160px] w-[120px] items-center justify-center overflow-hidden rounded-md md:h-[250px] md:w-[170px]">
          <div className="relative h-full w-full">
            <Image fill src={book.image} alt={book.name} />
          </div>
        </div>
        <div className="">
          <h3 className="mt-1 text-center text-sm font-semibold text-purple-500 sm:text-[16px] md:text-xl">
            {book.name}
          </h3>
          <p className="text-center text-sm text-stone-500 md:text-[16px]">
            {book.author}
          </p>
        </div>
        <div className="my-2 h-[2px] w-full bg-purple-300"></div>
        <div className="flex flex-col items-center justify-center gap-1.5">
          <p className="text-sm md:text-lg">
            {book.price.toLocaleString("fa-IR")} تومان
          </p>
          {!isInCart && (
            <AddToCartButton
              user={currentUser}
              bookId={book.id}
              bookName={book.name}
              buttonRef={frontButtonRef}
            >
              افزودن به سبد خرید
            </AddToCartButton>
          )}
          {isInCart && (
            <CartOperations
              user={currentUser}
              plusRef={plusRef}
              minusRef={minusRef}
              bookId={book.id}
              bookName={book.name}
              cart={cart}
            />
          )}
        </div>
      </div>

      {/* Back Side */}

      <div className="absolute top-1/2 flex h-full w-full -translate-y-1/2 rotate-y-180 flex-col items-center justify-center gap-2.5 text-center backface-hidden">
        <h3 className="mt-1.5 text-center text-sm font-semibold text-purple-500 sm:text-lg md:text-xl">
          {book.name}
        </h3>
        <p className="text-center text-sm text-stone-500">{book.author}</p>
        <p className="text-[10px]/4 text-neutral-600 md:text-sm/6">
          {book.summary}
        </p>
        <div className="flex w-full items-center justify-center gap-1 pb-6">
          <p className="text-sm/6 text-neutral-600">امتیاز: {book.rate}</p>
          <HiOutlineStar className="size-6" fill="#FACC15" stroke="#FACC15" />
        </div>
        <Button type="link" path={`/book/${book.id}`} buttonRef={backButtonRef}>
          مشاهده جزئیات بیشتر
        </Button>
      </div>
    </div>
  );
}

export default BookCardContent;
