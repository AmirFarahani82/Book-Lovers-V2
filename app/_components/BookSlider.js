"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function BookSlider({ books }) {
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderButtonStyle =
    "absolute sm:flex justify-center items-center top-1/2 z-10 cursor-pointer rounded-full border-none bg-white  text-stone-600 border-none outline-none focus:ring focus:ring-black sm:size-[35px] sm:text-2xl md:size-[55px] md:text-4xl";

  const sliderBook = [
    {
      id: 0,
      title: books.at(5).name,
      image: books.at(5).image,
      author: books.at(5).author,
      color: "bg-[#6c3483]",
      content: "دو شاهدخت، یک تاج، جادویی بی‌پایان",
    },
    {
      id: 1,
      title: books.at(10).name,
      image: books.at(10).image,
      author: books.at(10).author,
      color: "bg-[#15022f]",
      content: "سفر به دنای معصومیت و عشق",
    },
    {
      id: 2,
      title: books.at(11).name,
      image: books.at(11).image,
      author: books.at(11).author,
      color: "bg-[#c3a353]",
      content: "عشق، درد، و صدای یک شاعر",
    },
    {
      id: 3,
      title: books.at(0).name,
      image: books.at(0).image,
      author: books.at(0).author,
      color: "bg-[#c00]",
      content: "جهان تحت نظر، آزادی در خطر",
    },
    {
      id: 4,
      title: books.at(9).name,
      image: books.at(9).image,
      author: books.at(9).author,
      color: "bg-[#3d5654]",
      content: "سرگذشت شاه حقیقی ایران زمین",
    },
  ];
  const maxSlide = sliderBook.length - 1;

  const handleNextSlide = useCallback(() => {
    setSlide((s) => (s === maxSlide ? 0 : s + 1));
  }, [maxSlide]);
  function handlePrevSlide() {
    setSlide((s) => (s === 0 ? maxSlide : s - 1));
  }

  // useEffect(() => {
  //   const autoSlide = setInterval(() => {
  //     handleNextSlide();
  //   }, 4000);
  //   return () => clearInterval(autoSlide);
  // }, [handleNextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX; // Reset end position
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > minSwipeDistance) {
      handleNextSlide();
    } else if (swipeDistance < -minSwipeDistance) {
      handlePrevSlide();
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {sliderBook.map((s) => (
        <div
          key={s.id}
          className={`absolute h-full w-full transition-all duration-1200 ${s.color} `}
          style={{ transform: `translateX(${100 * (s.id - slide)}%)` }}
        >
          <div className="absolute top-1/2 left-[45px] h-[150px] w-[100px] -translate-y-1/2 sm:h-[200px] sm:w-[133px] md:left-[75px] md:h-[260px] md:w-[180px] lg:h-[430px] lg:w-[286px]">
            <Image src={s.image} alt={s.title} fill />
          </div>
          <div
            className={`absolute top-1/2 text-white transition-all delay-75 duration-1500 ${slide === s.id ? "-translate-x-[50px] -translate-y-1/2 sm:-translate-x-[120px]" : "translate-x-full -translate-y-1/2"}`}
          >
            <h3 className="w-[170px] text-sm font-semibold wrap-break-word sm:w-max sm:text-[clamp(15px,2.3vw,35px)] sm:wrap-normal">
              کتاب {s.title} نوشته {s.author}
            </h3>
            <p className="mt-4.5 text-start text-[10px] sm:text-center sm:text-sm lg:text-2xl">
              {s.content}
            </p>
          </div>
        </div>
      ))}

      <button
        className={`${sliderButtonStyle} right-[1%] hidden sm:block`}
        onClick={handleNextSlide}
      >
        <HiChevronRight />
      </button>
      <button
        className={`${sliderButtonStyle} left-[1%] hidden sm:block`}
        onClick={handlePrevSlide}
      >
        <HiChevronLeft />
      </button>
    </div>
  );
}

export default BookSlider;
