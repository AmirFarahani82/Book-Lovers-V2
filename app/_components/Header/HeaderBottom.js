"use client";

import { usePathname } from "next/navigation";
import SearchBookForm from "../SearchBookForm";
import SearchResult from "../SearchResult";

function HeaderBottom() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <section className="relative h-[90vh] w-[100%] bg-black/40 bg-[url(/header-img.jpg)] bg-cover bg-left bg-no-repeat bg-blend-overlay md:bg-center">
      <div className="">
        <SearchBookForm />
      </div>
      <h1 className="absolute top-1/2 right-1/2 z-1 w-full translate-x-1/2 -translate-y-1/2 text-center text-lg text-white sm:text-2xl md:text-3xl">
        به دنیای کتاب خوش اومدی، جایی برای
        <span className="text-red-500"> عاشقان </span> مطالعه
      </h1>
    </section>
  );
}

export default HeaderBottom;
