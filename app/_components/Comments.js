"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Comments() {
  const [slide, setSlide] = useState(0);
  const startX = useRef(null);

  const commentsContent = [
    {
      id: 0,
      title: "بهترین جایی که ازش خرید کردم",
      comment:
        "اولین بار بود از این سایت سفارش می‌دادم و راستش خیلی انتظار نداشتم انقدر سریع و تمیز برسه. ولی هم بسته‌بندی عالی بود، هم کتاب دقیقاً همونی بود که    می‌خواستم. الان دیگه همیشه اینجا سر میزنم.",
      authorName: "علی فرهادی",
      authorImage: "/user-1.jpg",
    },
    {
      id: 1,
      title: "قیمت هاشون واقعا منصفانه‌ست",
      comment:
        "قبلاً کلی دنبال یه نسخه از یه رمان خاص گشتم، ولی همه‌جا گرون می‌دادن. اینجا همون کتابو با نصف قیمت پیدا کردم. تازه ارسال هم رایگان بود، چی بهتر از این؟",
      authorName: "مریم رضایی",
      authorImage: "/user-2.jpg",
    },
    {
      id: 2,
      title: "تیمشون قابل اعتماد هست",
      comment:
        "ظاهر سایت قشنگه، کار باهاش راحته، و مهم‌تر از همه اینکه حس اعتماد می‌ده. من یه آدم سخت‌گیرم ولی اینجا حس کردم با یه تیم حرفه‌ای طرفم. مرسی از تیم فوق‌العاده‌تون.",
      authorName: "مهدی مجیدی",
      authorImage: "/user-3.jpg",
    },
  ];
  const maxSlide = commentsContent.length - 1;

  function handleNextSlide() {
    setSlide((s) => (s === maxSlide ? 0 : s + 1));
  }
  function handlePrevSlide() {
    setSlide((s) => (s === 0 ? maxSlide : s - 1));
  }
  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    startX.current = null;
  }

  const sliderButtonStyle =
    "flex items-center justify-center absolute top-1/2 z-10 size-[40px] text-xl sm:size-[55px] cursor-pointer rounded-full border-none bg-white md:text-4xl text-stone-600 outline-none focus:ring focus:ring-black";

  return (
    <div className="relative mx-auto flex h-[310px] w-full justify-center sm:h-[350px]">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={startX}
        className="relative h-full w-[80%] overflow-x-hidden"
      >
        {commentsContent.map((c) => (
          <div
            key={c.id}
            className={`absolute top-0 h-full w-full px-[30px] transition-all duration-1000 md:px-[150px]`}
            style={{ transform: `translateX(${100 * (c.id - slide)}%)` }}
          >
            <h3 className="sub-heading mt-15 text-lg font-semibold text-purple-500 md:text-2xl">
              {c.title}
            </h3>
            <p className="my-5 text-sm [word-spacing:3px] md:text-lg">
              {c.comment}
            </p>
            <div className="flex items-center gap-3.5">
              <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[50%]">
                <Image fill src={c.authorImage} alt={`عکس ${c.authorName}`} />
              </div>
              <p className="text-sm md:text-2xl">{c.authorName}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`${sliderButtonStyle} right-0`}
        onClick={handleNextSlide}
      >
        <HiChevronRight />
      </button>
      <button
        className={`${sliderButtonStyle} left-0`}
        onClick={handlePrevSlide}
      >
        <HiChevronLeft />
      </button>
    </div>
  );
}

export default Comments;
