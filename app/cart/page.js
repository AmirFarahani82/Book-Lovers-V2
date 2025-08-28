import Link from "next/link";
import CartCheckout from "../_components/CartCheckout";
import CartItem from "../_components/CartItem";
import { getCart } from "../_lib/actions";
import { getBookById } from "../_lib/data-service";

export const metadata = {
  title: "سبد خرید",
};

async function page() {
  const cart = await getCart();
  const ids = cart.map((c) => c.bookId);
  let books = [];
  const cartQuantity = cart
    .map((c) => c.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  const cartTotalPrice = cart
    .map((c) => c.price)
    .reduce((acc, cur) => acc + cur, 0);

  for (const i in ids) {
    if (Object.prototype.hasOwnProperty.call(ids, i)) {
      const element = ids[i];
      const book = await getBookById(element);
      books.unshift(book);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="flex h-[90vh] flex-col items-center justify-center gap-5">
        <p>سبد خرید شما خالی است:(</p>
        <p>
          برای افزودن کتاب مورد علاقه خود به سبد خرید به{" "}
          <Link href="/" className="text-purple-500">
            صفحه فروشگاه
          </Link>{" "}
          مراجعه کنید
        </p>
      </div>
    );
  }
  return (
    <div className="relative flex px-5 pt-5 sm:px-10">
      <div className="space-y-3">
        <p>سبد خرید شما</p>
        <p className="pb-5">
          مجموع کالاها:{cartQuantity.toLocaleString("fa-ir")}
        </p>

        <ul className="divide-y divide-neutral-400">
          {books.map((book) => (
            <CartItem key={book.id} book={book} cart={cart} />
          ))}
        </ul>
      </div>
      <CartCheckout price={cartTotalPrice} />
    </div>
  );
}

export default page;
