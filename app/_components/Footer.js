"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiInstagramLine,
  RiTelegram2Line,
  RiTwitterLine,
} from "react-icons/ri";

function FooterHeading({ children }) {
  return <h4 className="text-xl text-purple-500">{children}</h4>;
}

function Footer() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  const listItems = [
    {
      title: "کتاب ها",
      href: "/#section-book",
    },
    {
      title: "درباره ما",
      href: "/#about-us",
    },
  ];
  const socialList = [
    {
      icon: <RiInstagramLine />,
      href: "https://instagram.com",
    },
    {
      icon: <RiTwitterLine />,
      href: "https://twitter.com",
    },
    {
      icon: <RiTelegram2Line />,
      href: "https://t.me",
    },
  ];

  return (
    <div
      className="relative bg-stone-700 p-7.5 text-white md:px-[70px] md:py-[50px]"
      id="footer"
    >
      <div>
        <h3 className="text-3xl text-purple-500 md:text-4xl">بوک‌لاورز</h3>
        <p className="my-6 max-w-[450px] text-sm wrap-break-word sm:my-7.5">
          ما اینجاییم تا بهترین کتاب‌ها رو با قیمت خوب و سریع‌ترین زمان ممکن
          برسونیم دست‌تون. چون می‌دونیم هیچی جای یه کتاب خوب رو نمی‌گیره.
        </p>
      </div>

      <div>
        <FooterHeading>لینک‌های مفید</FooterHeading>
        <ul className="my-4 sm:my-5">
          {listItems.map((li) => (
            <li key={li.title} className="my-1.5 block text-sm md:my-2">
              <Link href={li.href}>{li.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="not-first:space-y-3 not-first:text-sm">
        <FooterHeading>تماس با ما</FooterHeading>
        <p>ایمیل: support@booklovers.ir</p>
        <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
        <p>ساعات پاسخگویی: ۹ صبح تا ۹ شب</p>
      </div>

      <div>
        <FooterHeading>ما رو دنبال کن</FooterHeading>
        <div className="my-2 flex gap-1">
          {socialList.map((s) => (
            <Link
              target="_blank"
              key={s.href}
              href={s.href}
              className="text-xl"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-3.5 text-sm">© 2025 بوک‌لاورز. تمام حقوق محفوظ است.</p>
      <img
        src="/undraw_book-lover_m9n3.svg"
        alt="footer"
        className="absolute top-1/2 left-[6%] w-1/3 -translate-y-1/2"
      />
    </div>
  );
}

export default Footer;
