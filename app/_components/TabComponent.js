"use client";
import { useState } from "react";

function TabComponent() {
  const [isActive, setIsActive] = useState("tab-1");
  const btnStyle =
    "ease cursor-pointer py-2 text-[12px] px-3.5 rounded-4xl border-none text-white transition-all duration-400 outline-none sm:text-sm md:text-lg";
  const contentStyle =
    "relative bg-white mx-auto w-[80%] rounded-xl p-7.5 md:w-[60%]";
  const tabButton = [
    { label: "قیمت ارزان", id: "tab-1", color: "bg-red-600" },
    { label: "سریعترین زمان ارسال", id: "tab-2", color: "bg-green-600" },
    { label: "بهترین کیفیت", id: "tab-3", color: "bg-blue-700" },
  ];

  const tabContent = [
    {
      id: "tab-1",
      title: "قیمت ارزان !",
      description:
        "ما همیشه دنبال این هستیم که کتاب‌خوندن رو برای همه آسون کنیم؛ برایهمین، قیمت‌هامون منصفانه‌ست. نه خبری از واسطه‌ست، نه هزینه‌های پنهان. همون کتابی که دوست داری، با یه قیمت خوب دستت می‌رسه.",
    },
    {
      id: "tab-2",
      title: "سریعترین زمان ارسال !",
      description:
        "وقتی یه کتاب می‌خری، دلت می‌خواد خیلی زود برسه دستت. پیش تیم تیم درستی اومدی! سفارش‌ها همون روز یا نهایتاً فردا راهی می‌شن. کتابت از ما تا دمدر، با سرعت نور!",
    },
    {
      id: "tab-3",
      title: "بهترین کیفیت !",
      description:
        "کتاب فقط یه محصول نیست، یه تجربه‌ست. ما وسواس داریم که جلد سالم باشه، چاپ تمیز باشه، بسته‌بندی هم امن باشه. قراره وقتی کتابو باز می‌کنی، فقط لبخند بزنی.",
    },
  ];

  return (
    <>
      <div className="my-7.5 flex w-full justify-center gap-7.5">
        {tabButton.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setIsActive((a) => tab.id)}
            className={`${btnStyle} ${tab.color} ${isActive === tab.id ? "-translate-y-1.5 shadow-[0px_15px_15px_-5px] shadow-stone-900/60" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabContent.map((tab) => (
        <div
          key={tab.id}
          className={`${contentStyle} ${isActive === tab.id ? "block" : "hidden"}`}
        >
          <h3 className="mb-2 text-xl font-semibold text-purple-500 md:text-2xl">
            {tab.title}
          </h3>
          <p className="text-sm/normal [word-spacing:3px] md:text-sm/relaxed">
            {tab.description}
          </p>
        </div>
      ))}
    </>
  );
}

export default TabComponent;
