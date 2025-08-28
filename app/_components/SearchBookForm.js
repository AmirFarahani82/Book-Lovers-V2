"use client";

import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import SpinnerMini from "./SpinnerMini";

function SearchBookForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResult([]);
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResult(data);
      } finally {
        setIsLoading(false);
      }
    };
    const delay = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);
  return (
    <>
      <div className="relative flex w-full items-center justify-center pt-[55px]">
        <input
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (query.length <= 3 && !result.length) setQuery("");
          }}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[220px] rounded-4xl border-none bg-white py-2.5 pr-3.5 pl-11 text-purple-500 outline-none placeholder:text-purple-500"
          type="text"
          placeholder="نام کتاب را جستجو کنید..."
        />
      </div>
      <div
        className={`absolute top-[110px] left-1/2 z-10 flex max-h-[270px] w-[300px] -translate-x-1/2 justify-center overflow-y-auto rounded-lg bg-white px-5 py-3.5 text-lg sm:w-[400px] ${!isFocused && !result.length ? "hidden" : ""}`}
      >
        {query.length < 3 && (
          <p className="text-center text-base">
            برای مشاهده نتایج حداقل ۳ کلمه بنویسید
          </p>
        )}
        {!isLoading && !result.length && query.length >= 3 && (
          <p className="text-center text-base">کتابی پیدا نشد:(</p>
        )}
        {isLoading ? <SpinnerMini /> : <SearchResult book={result} />}
      </div>
    </>
  );
}

export default SearchBookForm;
