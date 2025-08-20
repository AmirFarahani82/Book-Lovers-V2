"use client";

import { usePathname } from "next/navigation";

function HeaderBottom() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <section className="relative h-[90vh] w-[100%] bg-black/40 bg-[url(/header-img.jpg)] bg-cover bg-left bg-no-repeat bg-blend-overlay md:bg-center">
      <div className="search-wrapper">
        <form action="" className="header__search-form">
          <input
            className="header__search-input"
            type="search"
            placeholder="نام کتاب را جستجو کنید..."
          />
          <button className="header__search_btn">
            <i className="fa fa-search"></i>
          </button>
        </form>
        {/* <div className="search-suggestions hidden">
          <ul className="suggestions-list">
            <li className="suggestion-item">
              <div className="suggestion__item">
                <div className="item__img">
                  <img src="book-pics/1.webp" alt="" />
                </div>
                <div className="item__content">
                  <h3 className="item__content_name">تاج دو قلوها</h3>
                  <p className="item_content_author">کاترین دویل</p>
                </div>
                <div className="item__price">361.000 تومان</div>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
      <h1 className="absolute top-1/2 right-1/2 z-1 w-full translate-x-1/2 -translate-y-1/2 text-center text-lg text-white sm:text-2xl md:text-3xl">
        به دنیای کتاب خوش اومدی، جایی برای
        <span className="text-red-500"> عاشقان </span> مطالعه
      </h1>
    </section>
  );
}

export default HeaderBottom;
