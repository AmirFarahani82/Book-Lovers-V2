import Image from "next/image";
import Link from "next/link";

function SearchResult({ book }) {
  console.log(book);
  return (
    <div
      className={`absolute top-[110px] left-1/2 z-10 h-auto w-[400px] -translate-x-1/2 rounded-lg bg-white px-5 py-3.5 text-lg ${!book.length ? "hidden" : ""}`}
    >
      <ul>
        {book.map((book) => (
          <li key={book.id}>
            <Link
              href={`book/${book.id}`}
              className="suggestion__item mt-2.5 flex h-full w-full items-center gap-5 py-4"
            >
              <div className="item__img relative h-[90px] w-[60px] object-cover">
                {" "}
                <Image fill src={book.image} alt={book.name} />
              </div>
              <div className="item__content">
                <h3 className="item__content_name text-base">{book.name}</h3>
              </div>
              <div className="item__price mr-auto">
                {book.price.toLocaleString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
