import { getUser } from "../_lib/actions";
import { getbooks } from "../_lib/data-service";
import BookCardContent from "./BookCardContent";
import Pagination from "./Pagination";

async function BookCard({ searchParams }) {
  const params = await searchParams;

  const filter = params?.filter || "all";
  const page = !params?.page ? 1 : Number(searchParams.page);

  const { data: books, count } = await getbooks({ filter, page });
  const currentUser = await getUser();

  if (!books?.length) return <p>کتابی برای نمایش وجود ندارد.</p>;

  return (
    <>
      <div className="flex columns-2 flex-wrap items-center justify-evenly gap-y-4.5">
        {books.map((book) => (
          <BookCardContent
            key={book.id}
            book={book}
            {...(currentUser && { currentUser })}
          />
        ))}
      </div>
      <div>
        <Pagination count={count} />
      </div>
    </>
  );
}

export default BookCard;
