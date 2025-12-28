"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function FilterButton({ title, active, value }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function changeParam() {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      params.set("filter", value);
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <button
      className={`cursor-pointer rounded-xl border-none bg-purple-500 px-2 py-2 text-white shadow-stone-500 transition-all duration-300 hover:shadow-[0px_5px_3px] ${
        active ? "-translate-y-1.5 scale-108 bg-purple-700" : ""
      }`}
      onClick={changeParam}
    >
      {isPending ? <SpinnerMini /> : title}
    </button>
  );
}

export default FilterButton;
