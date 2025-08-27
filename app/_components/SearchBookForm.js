"use client";

import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

function SearchBookForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResult([]);
      return;
    }
    const fetchData = async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResult(data);
    };
    const delay = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);
  // console.log(result);
  return (
    <>
      <div className="relative flex w-full items-center justify-center pt-[55px]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[220px] rounded-4xl border-none bg-white py-2.5 pr-3.5 pl-11 text-purple-500 outline-none placeholder:text-purple-500"
          type="text"
          placeholder="نام کتاب را جستجو کنید..."
        />
      </div>
      <SearchResult book={result} />
    </>
  );
}

export default SearchBookForm;
