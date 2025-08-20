import AddToCartButton from "@/app/_components/AddToCartButton";
import CartOperations from "@/app/_components/CartOperations";
import TextExpander from "@/app/_components/TextExpander";
import { getCart, getUser } from "@/app/_lib/actions";
import { getBookById } from "@/app/_lib/data-service";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { bookId } = await params;
  const book = await getBookById(bookId);
  if (!book) return { title: "کتاب پیدا نشد" };

  return {
    title: `\u200E${book.name}`,
  };
}

async function page({ params }) {
  const { bookId } = await params;
  const book = await getBookById(bookId);
  const user = await getUser();
  const cart = await getCart();

  const isInCart = cart.some((item) => book.id === item.bookId);

  if (!book) {
    return <p>loading...</p>;
  }
  return (
    <div className="mt-6 grid grid-cols-1 px-6 lg:grid-cols-[500px_1fr]">
      <div className="flex h-[200px] gap-5 border-purple-400 sm:h-[250px] lg:border-l">
        <div className="relative h-[170px] w-[113px] overflow-hidden rounded-lg shadow-[0px_24px_22px_-15px] shadow-stone-900/60 sm:h-[250px] sm:w-[166px]">
          <Image src={book.image} alt={book.name} fill />
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-2xl text-purple-500">کتاب {book.name}</h1>
          <p className="text-sm text-stone-500">نویسنده: {book.author}</p>
          <p className="text-sm text-stone-500">امتیاز: {book.rate}</p>
          <p>قیمت: {book.price.toLocaleString("fa-IR")} تومان</p>
          <div className="mt-0 lg:mt-auto">
            {!isInCart ? (
              <AddToCartButton
                user={user}
                bookId={book.id}
                bookName={book.name}
              >
                افزودن به سبد خرید
              </AddToCartButton>
            ) : (
              <CartOperations bookId={book.id} bookName={book.name} />
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-4 text-xl/normal text-stone-600">
        <TextExpander>{book.story}</TextExpander>
      </div>
    </div>
  );
}

export default page;
