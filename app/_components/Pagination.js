"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import SpinnerMini from "./SpinnerMini";

function Pagination({ count }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPendingNext, startNextTransition] = useTransition();
  const [isPendingPrev, startPrevTransition] = useTransition();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const perPage = 10;
  const pageCount = Math.ceil(count / perPage);

  function nextPage() {
    startNextTransition(() => {
      const params = new URLSearchParams(searchParams);
      const next = currentPage === pageCount ? currentPage : currentPage + 1;
      params.set("page", next);
      router.push(`${pathname}?${params.toString()}#section-book`);
    });
  }
  function prevPage() {
    startPrevTransition(() => {
      const params = new URLSearchParams(searchParams);
      const prev = currentPage === 1 ? currentPage : currentPage - 1;
      params.set("page", prev);
      router.push(`${pathname}?${params.toString()}#section-book`);
    });
  }
  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <button
        className="flex items-center justify-center rounded-md bg-purple-500 p-1 text-white md:p-2"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        {isPendingPrev ? (
          <SpinnerMini />
        ) : (
          <>
            <HiChevronRight />
            <span>قبلی</span>
          </>
        )}
      </button>
      <button
        className="flex items-center justify-center rounded-md bg-purple-500 p-1 text-white md:p-2"
        onClick={nextPage}
        disabled={currentPage === pageCount}
      >
        {isPendingNext ? (
          <SpinnerMini />
        ) : (
          <>
            <span>بعدی</span>
            <HiChevronLeft />
          </>
        )}
      </button>
    </div>
  );
}

export default Pagination;
