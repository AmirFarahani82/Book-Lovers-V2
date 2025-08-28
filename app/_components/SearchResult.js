import Image from "next/image";
import Link from "next/link";
import SpinnerMini from "./SpinnerMini";

function SearchResult({ book }) {
  return (
    <div className="flex justify-center">
      <ul className="divide-y divide-stone-400">
        {book.map((book) => (
          <li key={book.id}>
            <Link
              href={`/book/${book.id}`}
              className="flex h-full w-full items-center gap-5 py-4"
            >
              <div className="relative h-[60px] w-[40px] object-cover sm:h-[90px] sm:w-[60px]">
                {" "}
                <Image fill src={book.image} alt={book.name} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base">{book.name}</h3>
              </div>
              <div className="mr-auto text-sm sm:text-base">
                {book.price.toLocaleString()} تومان
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
