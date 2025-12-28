"use client";
import FilterButton from "./FilterButton";
import { useSearchParams } from "next/navigation";

const filter = [
  { label: "همه کتاب ها", value: "all" },
  { label: "پر فروش ترین ها", value: "bestsellers" },
];
function BooksWrapper({ children }) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  return (
    <section className="mx-auto mt-12 w-[1100px] max-w-[90%]">
      <h2 className="text-3xl font-semibold text-purple-500 md:text-4xl">
        کتاب ها
      </h2>
      <div>
        <div className="mt-2.5 flex gap-3.5">
          {filter.map((f) => (
            <FilterButton
              key={f.value}
              title={f.label}
              active={currentFilter === f.value}
              value={f.value}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-8 flex flex-col items-center justify-evenly gap-y-5 perspective-[8000px]">
        {children}
      </div>
    </section>
  );
}

export default BooksWrapper;
