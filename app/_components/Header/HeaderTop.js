"use client";
import Link from "next/link";

import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import LogoutButton from "../LogoutButton";
import { useInView } from "react-intersection-observer";

function HeaderTop({ currentUser }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "30%",
  });

  const listItems = [
    {
      lable: currentUser ? "" : <HiOutlineUser />,
      href: currentUser ? "" : "/signup",
      title: currentUser ? "خروج از حساب" : "ورود به حساب کاربری",
    },
    {
      lable: <HiOutlineShoppingCart />,
      href: "/cart",
      title: "سبد خرید",
    },
    {
      lable: "کتاب ها",
      href: "/#section-book",
    },
    {
      lable: "درباره ما",
      href: "/#about-us",
    },
    {
      lable: "تماس با ما",
      href: "/#footer",
    },
  ];

  return (
    <>
      <div ref={ref}></div>
      <section
        className={`mx-auto flex h-[8vh] flex-row-reverse sm:h-[10vh] ${!inView ? "fixed top-2.5 right-1/2 z-10 w-[90%] translate-x-1/2 justify-between rounded-xl bg-white px-2 shadow-[0px_12px_16px_-6px] shadow-black/40 sm:w-[75%] lg:w-[700px]" : "w-[90%] justify-between"}`}
      >
        <div className="flex h-full w-[50px] items-center justify-center sm:w-[70px]">
          <Link
            href="/#"
            className="relative block h-10/12 w-[50px] sm:h-full sm:w-[70px]"
          >
            <img src="/Logo.png" alt="header image" className="h-full w-full" />
          </Link>
        </div>
        <div className="relative h-full">
          <ul className="flex h-full items-center gap-1.5">
            {listItems.map((li, i) => (
              <li
                key={i}
                title={li.title}
                className={`text-[16px] text-purple-500 hover:text-purple-800 sm:text-xl md:text-2xl ${
                  i === 1 ? "border-l-2 border-purple-500 pl-2" : "pl-2"
                } `}
              >
                {currentUser && i === 0 ? (
                  <div className="flex h-full items-center">
                    <LogoutButton />
                  </div>
                ) : (
                  <Link href={li.href}>{li.lable}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default HeaderTop;
