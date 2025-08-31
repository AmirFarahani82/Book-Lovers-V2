import Image from "next/image";
import CartOperations from "./CartOperations";

function CartItem({ book, cart }) {
  const itemQuantity = cart.find((item) => book.id === item.bookId).quantity;
  const itemPrice =
    cart.find((item) => book.id === item.bookId).quantity * book.price;

  return (
    <li className="grid h-58 w-[300px] grid-cols-[116px_1fr] items-center gap-x-4 pb-6 lg:w-xl">
      <div className="h-[160px] w-28 space-y-2.5">
        <Image
          className="h-[160px] rounded-lg object-cover"
          src={book.image}
          alt={book.name}
          width={112}
          height={112}
        />
        <CartOperations bookId={book.id} bookName={book.name} cart={cart} />
      </div>
      <div className="flex flex-col justify-center gap-3">
        <p>کتاب {book.name}</p>
        <p>تعداد: {itemQuantity.toLocaleString("fa-ir")}</p>
        <p>قیمت: {itemPrice.toLocaleString("fa-ir")}</p>
      </div>
    </li>
  );
}

export default CartItem;
